import { Feature, Polygon } from 'geojson';
import { GtfsPolygonFilterProps } from './index.js';
export declare function getPolygons(polygons: GtfsPolygonFilterProps['polygon']): Feature<Polygon>[];
