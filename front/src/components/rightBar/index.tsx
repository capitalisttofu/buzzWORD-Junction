import * as React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import * as RR from 'react-router'
import * as Types from 'types'
import './style.scss'

import { NotificationList } from '../NotificationList'

export const mapStateToProps = ({  }: Types.AppState) => ({})

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

export const RightBar: React.ComponentClass<Props> = enhance(
  class RightBarComponent extends React.PureComponent<Type, {}> {
    render() {
      return (
        <div className="right-bar-component">
          <div>Hommaa muija</div>
        </div>
      )
    }
  }
)

export default RightBar
