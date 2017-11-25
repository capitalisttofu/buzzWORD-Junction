import * as React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import * as RR from 'react-router'
import * as Types from 'types'
import * as FlightActions from 'actions/flights'
import { Worldmap } from '../../components/Worldmap'
import data from '../../mockData'
import { NotificationList } from '../../components/NotificationList'
import './style.scss'

export const mapStateToProps = ({ flights }: Types.AppState) => ({
  flightData: flights.flightData
})

export const mapDispatchToProps = (dispatch: Types.Dispatch) => ({})

const StatePropsWitness = (false as true) && mapStateToProps({} as any)
type StateProps = typeof StatePropsWitness

const DispatchPropsWitness = (false as true) && mapDispatchToProps({} as any)
type DispatchProps = typeof DispatchPropsWitness

export type Props = {}

type Type = Props & StateProps & DispatchProps

const enhance = connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)

export const HomeView: React.ComponentClass<Props> = enhance(
  class HomeViewComponent extends React.PureComponent<Type, {}> {
    render() {
      return (
        <div className="home-view-component">
          <NotificationList />
          {/*<Worldmap />*/}
        </div>
      )
    }
  }
)

export default HomeView
