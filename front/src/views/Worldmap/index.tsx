import * as React from 'react'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps'

const mapUrl =
  'https://d3-geomap.github.io/d3-geomap/topojson/world/countries.json'

export default class Worldmap extends React.Component<any, any> {
  constructor(props: null) {
    super(props)
    this.state = {
      markers: [[10, 10], [100, 31]]
    }
  }

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
          <Markers>
            {this.state.markers.map(xy => (
              <Marker marker={{ coordinates: xy }}>
                <circle cx={0} cy={0} r={10} fill="#ffffff" />
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    )
  }
}
