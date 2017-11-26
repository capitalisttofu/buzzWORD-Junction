import * as React from 'react'
import { connect } from 'react-redux'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps'
import { Motion, spring } from 'react-motion'
import * as Types from '../../types'

const motionDefaults = {
  zoom: 1,
  x: 0,
  y: 20
}

const mapUrl =
  'https://d3-geomap.github.io/d3-geomap/topojson/world/countries.json'

export const mapStateToProps = ({ mapdata }: Types.AppState) => ({
  datapoints: mapdata
})

const StatePropsWitness = (false as true) && mapStateToProps({} as any)
type StateProps = typeof StatePropsWitness

type Props = StateProps

type State = {
  center: Types.Coordinate
  zoom: number
}

const airportToCoords = {
  HEL: [60.317199707031, 24.963300704956],
  ARN: [59.651901245117, 17.918600082397],
  BCN: [41.297100067139, 2.0784599781036],
  BRU: [50.901401519800004, 4.48443984985],
  BUD: [47.436901092499994, 19.255599975599996],
  CDG: [49.0127983093, 2.54999995232],
  CPH: [55.617900848389, 12.656000137329],
  DUS: [51.28950119018555, 6.766779899597168],
  EDJ: [47.988800048799995, 10.2395000458],
  EDI: [55.95000076293945, -3.372499942779541],
  FCO: [41.8002778, 12.2388889],
  FRA: [50.0333333, 8.5705556],
  GOT: [57.662799835205, 12.279800415039],
  ICN: [37.46910095214844, 126.45099639892578],
  IVL: [68.607299804688, 27.405300140381],
  KBV: [8.09912014008, 98.9861984253],
  KIX: [34.42729949951172, 135.24400329589844],
  KTT: [67.700996398926, 24.846799850464],
  LHR: [51.4706, -0.461941],
  LPA: [27.931900024414062, -15.38659954071045],
  MAD: [40.471926, -3.56264],
  MAN: [53.35369873046875, -2.2749500274658203],
  MUC: [48.353801727295, 11.786100387573],
  MXP: [45.6306, 8.72811],
  NGO: [34.8583984375, 136.80499267578125],
  NRT: [35.7647018433, 140.386001587],
  OSL: [60.193901062012, 11.100399971008],
  OUL: [64.930099487305, 25.354600906372],
  PRG: [50.1008, 14.26],
  PVG: [31.143400192260742, 121.80500030517578],
  RVN: [66.564796447754, 25.830400466919],
  SGN: [10.8187999725, 106.652000427],
  TFS: [28.044500351, -16.5725002289],
  VAA: [63.050701141357, 21.762199401855],
  VIE: [48.110298156738, 16.569700241089],
  ZRH: [47.464698791504, 8.5491695404053]
}

const enhance = connect<StateProps, {}, Props>(mapStateToProps)

export const Worldmap: React.ComponentClass<{}> = enhance(
  class WorldmapComponent extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props)
      this.state = {
        center: [60, 40],
        zoom: 2.2
      }
      //this.toggleZoomToDataPoint = this.toggleZoomToDataPoint.bind(this)
    }

    // toggleZoomToDataPoint({ coordinates }: Types.DataPoint) {
    //   this.setState(state => ({
    //     ...state,
    //     center:
    //       state.zoom === motionDefaults.zoom
    //         ? coordinates
    //         : [motionDefaults.x, motionDefaults.y],
    //     zoom: state.zoom === motionDefaults.zoom ? 2 : motionDefaults.zoom
    //   }))
    // }

    render() {
      const { datapoints } = this.props
      return (
        <Motion
          defaultStyle={motionDefaults}
          style={{
            zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
            x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
            y: spring(this.state.center[1], { stiffness: 210, damping: 20 })
          }}
        >
          {({ zoom, x, y }: { zoom: number; x: number; y: number }) => (
            <ComposableMap
              style={{
                width: '100%',
                height: 'auto'
              }}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies geographyUrl={mapUrl}>
                  {(geographies: any, projection: any) =>
                    geographies.map((geography: any, i: number) => (
                      <Geography
                        key={`geography-${i}`}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: '#ECEFF1',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          },
                          hover: {
                            fill: '#ECEFF1',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          },
                          pressed: {
                            fill: '#ECEFF1',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          }
                        }}
                      />
                    ))}
                </Geographies>
                <Markers>
                  {Object.keys(airportToCoords).map((key: string) => (
                    <Marker
                      marker={{
                        coordinates: [
                          airportToCoords[key][1],
                          airportToCoords[key][0]
                        ]
                      }}
                      key={key}
                      //onClick={this.toggleZoomToDataPoint}
                    >
                      <circle cx={0} cy={0} r={5} fill="rgba(150,50,0,0.5)" />
                    </Marker>
                  ))}
                </Markers>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
      )
    }
  }
)
