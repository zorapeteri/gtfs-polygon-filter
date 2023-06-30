declare module '@turf/helpers' {
  import * as turf from '@turf/helpers'
  import type { Feature, Point, Polygon, Position } from 'geojson'

  export const point: (lonLat: Position) => Feature<Point>
  export const polygon: (coords: Position[][]) => Feature<Polygon>
}
