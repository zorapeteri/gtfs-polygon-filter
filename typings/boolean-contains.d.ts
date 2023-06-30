declare module '@turf/boolean-contains' {
  import * as turf from '@turf/boolean-contains'
  import type { Feature } from 'geojson'

  const booleanContains: (a: Feature, b: Feature) => boolean

  export default booleanContains
}
