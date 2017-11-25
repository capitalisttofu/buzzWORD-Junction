import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../../types'

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

const enhance = connect<StateProps, {}, Props>(mapStateToProps)

const Notification = ({ description, id }: Types.DataPoint) => (
  <div>
    <p>{description}</p>
  </div>
)

export const NotificationList: React.ComponentClass<{}> = enhance(
  class NotificationListComponent extends React.Component<{}, {}> {
    render() {
      const { datapoints } = this.props
      return (
        <div>
          {datapoints.map(point => <Notification key={point.id} {...point} />)}
        </div>
      )
    }
  }
)
