import * as React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import * as RR from 'react-router'
import * as Types from 'types'
import * as ExampleActions from 'actions/example'
import Worldmap from '../Worldmap'
import './style.scss'

export const mapStateToProps = ({ example }: Types.AppState) => ({
  exampleData: example.exampleData
})

export const mapDispatchToProps = (dispatch: Types.Dispatch) => ({
  fetchExample: (payload: string) =>
    dispatch(ExampleActions.fetchExampleRequest(payload))
})

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

const important = require('images/important.png')

export const HomeView: React.ComponentClass<Props> = enhance(
  class HomeViewComponent extends React.PureComponent<Type, {}> {
    render() {
      return (
        <div className="home-view-component">
          <div>Hello World</div>
          <div>Current status of fetch is {this.props.exampleData.status}</div>
          <div onClick={() => this.props.fetchExample('cat')}>
            Click me to fetch
          </div>
          <img src={important} />
          <Worldmap />
        </div>
      )
    }
  }
)

export default HomeView
