import * as React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { format } from 'date-fns'
import * as FlightActions from 'actions/flights'
import * as Types from '../../types'
import * as R from 'ramda'
import './style.scss'
import 'react-table/react-table.css'

export const mapStateToProps = ({ flights }: Types.AppState) => ({
  flights: flights.flightData,
  searchString: flights.searchString,
  checkboxValue: flights.checkboxValue
})

const StatePropsWitness = (false as true) && mapStateToProps({} as any)
type StateProps = typeof StatePropsWitness

export const mapDispatchToProps = (dispatch: Types.Dispatch) => ({
  fetchFlights: () => dispatch(FlightActions.fetchFlightsRequest())
})

const DispatchPropsWitness = (false as true) && mapDispatchToProps({} as any)
type DispatchProps = typeof DispatchPropsWitness

type Props = {}

type Type = Props & StateProps & DispatchProps

const enhance = connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)

export const filterFlights = (
  flights: Types.Flight[],
  searchString: string,
  checkboxValue: boolean
) => {
  const search = searchString.toUpperCase()
  return R.filter(
    (flight: Types.Flight) =>
      !checkboxValue || flight.PLAN_DEPARTURE_STATION == 'HEL'
  )(
    R.filter(
      (flight: Types.Flight) =>
        flight.PLAN_ARRIVAL_STATION.toUpperCase().indexOf(search) > -1 ||
        flight.PLAN_DEPARTURE_STATION.toUpperCase().indexOf(search) > -1 ||
        flight.PLAN_FLIGHT_NUMBER.toUpperCase().indexOf(search) > -1
    )(flights)
  )
}

const RiskCell = (row: { value: number }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#dadada',
      borderRadius: '2px'
    }}
  >
    <div
      style={{
        width: `${row.value * 33}%`,
        height: '100%',
        backgroundColor:
          row.value < 2 ? '#85cc00' : row.value < 1 ? '#ffbf00' : '#ff2e00',
        borderRadius: '2px',
        transition: 'all .2s ease-out'
      }}
    />
  </div>
)

export type ThreatSource = {
  hasTwitter: boolean
  hasWeather: boolean
  hasScheduleRisk: boolean
  twitterData: string[]
}

const ThreatSourceCell = (row: any) => (
  <span className="risk-icon-cell">
    {row.value.twitter >= 2 && (
      <i className="fa fa-twitter" aria-hidden="true" />
    )}
    {row.value.weather >= 2 && <i className="fa fa-sun-o" aria-hidden="true" />}
  </span>
)

/*const timeFormat = 'DD.MM.YY HH:mm'

const formatTime = (field: string) => (obj: any) =>
  format(obj[field], timeFormat)*/

const columns = [
  {
    Header: 'Flight number',
    id: 'flightNumber',
    accessor: obj => `${obj.PLAN_CARRIER_CODE} ${obj.PLAN_FLIGHT_NUMBER}`
  },
  {
    Header: 'Departure Port',
    accessor: 'PLAN_DEPARTURE_STATION'
  },
  {
    Header: 'Arrival Port',
    accessor: 'PLAN_ARRIVAL_STATION'
  },
  {
    Header: 'Departure Time',
    id: 'departureTime',
    accessor: 'PLAN_DEPARTURE_DATETIME_UTC'
  },
  {
    Header: 'Arrival Time',
    id: 'arrivalTime',
    accessor: 'PLAN_ARRIVAL_DATETIME_UTC'
  },
  {
    Header: 'Risk Level',
    accessor: 'overall_risk',
    Cell: RiskCell
  },
  {
    Header: 'Risk Source',
    id: 'riskSource',
    accessor: (obj: Types.Flight) => ({
      twitter: Math.max(0, obj.twitter_risk_departure),
      weather: Math.max(obj.weather_risk_arrival, obj.weather_risk_departure)
    }),
    Cell: ThreatSourceCell
  }
]

const tableProps = {
  defaultSorted: [
    {
      id: 'overall_risk',
      desc: true
    }
  ],
  defaultPageSize: 15
}

export const FlightTable: React.ComponentClass<{}> = enhance(
  class FlightTableComponent extends React.Component<Type, {}> {
    componentWillMount() {
      this.props.fetchFlights()
    }
    render() {
      const { flights, searchString, checkboxValue } = this.props
      return (
        <div className="notification-list">
          {flights.status === 'FETCHED' && (
            <ReactTable
              data={filterFlights(flights.data, searchString, checkboxValue)}
              columns={columns}
              {...tableProps}
            />
          )}
        </div>
      )
    }
  }
)
