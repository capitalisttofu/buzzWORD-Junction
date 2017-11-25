import * as React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import * as FlightActions from 'actions/flights'
import * as Types from '../../types'
import './style.scss'
import 'react-table/react-table.css'

export const mapStateToProps = ({ flights }: Types.AppState) => ({
  flights: flights.flightData
})

const StatePropsWitness = (false as true) && mapStateToProps({} as any)
type StateProps = typeof StatePropsWitness

export const mapDispatchToProps = (dispatch: Types.Dispatch) => ({
  fetchFlights: () => dispatch(FlightActions.fetchFlightsRequest())
})

const DispatchPropsWitness = (false as true) && mapDispatchToProps({} as any)
type DispatchProps = typeof DispatchPropsWitness

type Type = StateProps & DispatchProps

const enhance = connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)

const Cell = row => (
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

const columns = [
  {
    Header: 'Flight number',
    accessor: 'flightno'
  },
  {
    Header: 'Departure',
    accessor: 'departure'
  },
  {
    Header: 'Destination',
    accessor: 'destination'
  },
  {
    Header: 'Risk level',
    accessor: 'risk',
    Cell: Cell
  }
]

const data = [
  {
    flightno: 'AY 90',
    departure: 'HEL',
    destination: 'AMS',
    risk: 3
  },
  {
    flightno: 'AY 123',
    departure: 'CDG',
    destination: 'HEL',
    risk: 1
  }
]

const tableProps = {
  defaultSorted: [
    {
      id: 'risk',
      desc: true
    }
  ],
  defaultPageSize: 15
}

export const NotificationList: React.ComponentClass<{}> = enhance(
  class NotificationListComponent extends React.Component<Type, {}> {
    componentWillMount() {
      this.props.fetchFlights()
    }
    render() {
      const { flights } = this.props
      return (
        <div className="notification-list">
          {flights.status === 'FETCHED' && (
            <ReactTable data={flights.data} columns={columns} {...tableProps} />
          )}
        </div>
      )
    }
  }
)
