## gtfs-polygon-filter

Filters routes in a GTFS feed based on whether they overlap with a GeoJSON Polygon (or MultiPolygon).

It includes a route in the returned array, if `overlapRatio` (0.5 by default) of the stops on the route are within the bounds of any of the provided polygons.

Works with [`node-gtfs`](https://github.com/blinktaginc/node-gtfs), requires an already open database connection to work.

### install

`npm i gtfs-polygon-filter`

### use

```js
import gtfsPolygonFilter from 'gtfs-polygon-filter'
import { openDb } from 'gtfs'
import totallyAwesomePolygyon from './somewhere'

openDb(config) // see how to do this in node-gtfs readme

const routesThatAreAtLeastTwoThirdsInsideMyPolygon = await gtfsPolygonFilter({
  polygon: totallyAwesomePolygon,
  routesFilter: {
    agency_id: '123', // gets passed into gtfs/getRoutes, to avoid looping through all routes in GTFS feed
  },
  overlapRatio: 0.67,
})

// [
//   {
//     route_id: 'cool_route',
//     agency_id: '123',
//     route_short_name: 'Cool Route',
//     ...
//   },
// ]
```

More detailed example [here](https://github.com/zorapeteri/gtfs-polygon-filter/tree/main/example)
