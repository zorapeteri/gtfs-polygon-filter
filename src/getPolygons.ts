import { Feature, MultiPolygon, Polygon } from 'geojson'
import { polygon as makePolygon } from '@turf/helpers'
import { GtfsPolygonFilterProps } from './index.js'

function polygonToFeature(polygon: Polygon): Feature<Polygon> {
  return makePolygon(polygon.coordinates)
}

function getPolygonsForGeometry(
  geometry: Polygon | MultiPolygon
): Feature<Polygon>[] {
  if (geometry.type === 'Polygon') {
    return [polygonToFeature(geometry)]
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.map((polygonCoordinates) =>
      makePolygon(polygonCoordinates)
    )
  }
}

function getPolygonsForFeature(
  feature: Feature<Polygon | MultiPolygon>
): Feature<Polygon>[] {
  return getPolygonsForGeometry(feature.geometry)
}

export function getPolygons(
  polygons: GtfsPolygonFilterProps['polygon']
): Feature<Polygon>[] {
  if (Array.isArray(polygons)) {
    return polygons.map(getPolygons).flat()
  }

  if (polygons.type === 'Feature') {
    return getPolygonsForFeature(polygons)
  }

  if (polygons.type === 'FeatureCollection') {
    return polygons.features.map(getPolygonsForFeature).flat()
  }

  if (polygons.type === 'GeometryCollection') {
    return polygons.geometries.map(getPolygonsForGeometry).flat()
  }

  return getPolygonsForGeometry(polygons)
}
