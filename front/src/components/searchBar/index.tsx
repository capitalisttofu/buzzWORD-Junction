import * as React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import * as RR from 'react-router'
import * as Types from 'types'
import * as FlightsReducer from 'reducers/flights'
import * as FlightsActions from 'actions/flights'
import './style.scss'

export const mapStateToProps = ({ flights }: Types.AppState) => ({
  searchString: flights.searchString,
  checkboxValue: flights.checkboxValue
})

export const mapDispatchToProps = (dispatch: Types.Dispatch) => ({
  onSearchStringChange: (searchString: string) =>
    dispatch(FlightsActions.setSearchString(searchString)),
  onCheckboxChange: (val: boolean) =>
    dispatch(FlightsActions.setCheckboxValue(!val))
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

export const SearchBar: React.ComponentClass<Props> = enhance(
  class SearchBarComponent extends React.PureComponent<Type, {}> {
    render() {
      return (
        <div className="search-bar-component">
          <div className="search-bar-box">
            <i className="fa fa-plane" aria-hidden="true" />
            <input
              value={this.props.searchString}
              onChange={e => this.props.onSearchStringChange(e.target.value)}
              placeholder="Search by airport or flight code"
            />
          </div>
          <div className="checkbox-container">
            <label htmlFor="checkbox">
              Display only long haul flights from <b>HEL</b>
            </label>
            <input
              type="checkbox"
              id="checkbox"
              checked={this.props.checkboxValue}
              onClick={() =>
                this.props.onCheckboxChange(this.props.checkboxValue)}
            />
          </div>
        </div>
      )
    }
  }
)

export default SearchBar
