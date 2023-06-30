import { polygon as makePolygon } from '@turf/helpers';
function polygonToFeature(polygon) {
    return makePolygon(polygon.coordinates);
}
function getPolygonsForGeometry(geometry) {
    if (geometry.type === 'Polygon') {
        return [polygonToFeature(geometry)];
    }
    if (geometry.type === 'MultiPolygon') {
        return geometry.coordinates.map(function (polygonCoordinates) {
            return makePolygon(polygonCoordinates);
        });
    }
}
function getPolygonsForFeature(feature) {
    return getPolygonsForGeometry(feature.geometry);
}
export function getPolygons(polygons) {
    if (Array.isArray(polygons)) {
        return polygons.map(getPolygons).flat();
    }
    if (polygons.type === 'Feature') {
        return getPolygonsForFeature(polygons);
    }
    if (polygons.type === 'FeatureCollection') {
        return polygons.features.map(getPolygonsForFeature).flat();
    }
    if (polygons.type === 'GeometryCollection') {
        return polygons.geometries.map(getPolygonsForGeometry).flat();
    }
    return getPolygonsForGeometry(polygons);
}
