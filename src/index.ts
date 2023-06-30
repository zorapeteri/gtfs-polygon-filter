// @ts-ignore
import { getRoutes, getStops, getStoptimes, getTrips } from 'gtfs'
import booleanContains from '@turf/boolean-contains'
import { point as turfPoint } from '@turf/helpers'
import { getPolygons } from './getPolygons.js'
import type { Stop, Stoptime } from 'not-gtfs'
import type {
  Feature,
  FeatureCollection,
  GeometryCollection,
  MultiPolygon,
  Polygon,
} from 'geojson'

export type Route = {
  agency_id: string
  route_id: string
  route_short_name: string
  route_long_name?: string
  route_type: number | string
  route_desc?: string
  route_url?: string
  route_color?: string
  route_text_color?: string
  route_sort_order?: number
  continuous_pickup?: any
  continuous_drop_off?: any
  network_id?: string
}

export type GtfsPolygonFilterProps = {
  polygon:
    | Polygon
    | MultiPolygon
    | Polygon[]
    | MultiPolygon[]
    | Feature<Polygon>
    | Feature<MultiPolygon>
    | Feature<Polygon>[]
    | Feature<MultiPolygon>[]
    | FeatureCollection<Polygon | MultiPolygon>
    | GeometryCollection<Polygon | MultiPolygon>
  routesFilter?: Partial<Route>
  overlapRatio?: number
}

export default async function gtfsPolygonFilter({
  polygon,
  routesFilter = {},
  overlapRatio = 0.5,
}: GtfsPolygonFilterProps) {
  const polygons = getPolygons(polygon)
  const overlappingRoutes: Route[] = []
  // @ts-ignore
  const routes: Route[] = await getRoutes(routesFilter)

  for (const route of routes) {
    const trips = await getTrips({ route_id: route.route_id })
    trips_loop: for (const trip of trips) {
      const stopTimesOnTrip = await getStoptimes(
        { trip_id: trip.trip_id },
        [],
        [['stop_sequence', 'ASC']]
      )

      const stopsOnTrip = await Promise.all(
        stopTimesOnTrip.map(async (stopTime: Stoptime) => {
          const stop = (await getStops({ stop_id: stopTime.stop_id }))[0]
          return stop
        })
      )

      const stopsWithinRelation = stopsOnTrip.filter((stop: Stop) => {
        const point = turfPoint([stop.stop_lon, stop.stop_lat])
        for (const polygon of polygons) {
          if (booleanContains(polygon, point)) return true
        }
      })

      if (stopsWithinRelation.length / stopsOnTrip.length >= overlapRatio) {
        overlappingRoutes.push(route)
        break trips_loop
      }
    }
  }

  return overlappingRoutes
}
