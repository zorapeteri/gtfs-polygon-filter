import { openDb, closeDb, importGtfs } from 'gtfs'
import fs from 'fs'
import gtfsPolygonFilter from 'gtfs-polygon-filter'
import innerCityPolygon from './innercity.js'

// Szombathely, smaller city in Hungary, a few bus lines so it doesn't take forever to import
const gtfsUrl =
  'https://szombathely.utas.hu/api/static/v1/gtfs-google/gtfs-google.zip'

const config = {
  agencies: [{ url: gtfsUrl, exclude: ['shapes'] }],
  ignoreDuplicates: true,
}

await importGtfs(config)

const db = openDb(config)

const routesThatGoInTheInnerCity = await gtfsPolygonFilter({
  polygon: innerCityPolygon,
})

fs.writeFileSync(
  'routes.json',
  JSON.stringify(routesThatGoInTheInnerCity, null, 2),
  'utf8'
)

closeDb(db)
