import type { Feature, FeatureCollection, GeometryCollection, MultiPolygon, Polygon } from 'geojson';
export type Route = {
    agency_id: string;
    route_id: string;
    route_short_name: string;
    route_long_name?: string;
    route_type: number | string;
    route_desc?: string;
    route_url?: string;
    route_color?: string;
    route_text_color?: string;
    route_sort_order?: number;
    continuous_pickup?: any;
    continuous_drop_off?: any;
    network_id?: string;
};
export type GtfsPolygonFilterProps = {
    polygon: Polygon | MultiPolygon | Polygon[] | MultiPolygon[] | Feature<Polygon> | Feature<MultiPolygon> | Feature<Polygon>[] | Feature<MultiPolygon>[] | FeatureCollection<Polygon | MultiPolygon> | GeometryCollection<Polygon | MultiPolygon>;
    routesFilter?: Partial<Route>;
    overlapRatio?: number;
};
export default function gtfsPolygonFilter({ polygon, routesFilter, overlapRatio, }: GtfsPolygonFilterProps): Promise<Route[]>;
