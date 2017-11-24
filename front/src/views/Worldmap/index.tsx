import * as React from 'react'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps'

const mapUrl =
  'https://d3-geomap.github.io/d3-geomap/topojson/world/countries.json'

export default class Worldmap extends React.Component<null, null> {
  render() {
    return (
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geographyUrl={mapUrl}>
            {(geographies: any, projection: any) =>
              geographies.map((geography: any, i: number) => (
                <Geography
                  key={`geography-${i}`}
                  geography={geography}
                  projection={projection}
                />
              ))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    )
  }
}
