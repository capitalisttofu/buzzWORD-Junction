import * as R from 'ramda'
import { Lens } from 'monocle-ts'
import * as ActionTypes from 'actionTypes/flights'
import * as Types from 'types'

export const STANDBY = 'STANDBY'
export const FETCHING = 'FETCHING'
export const FETCHED = 'FETCHED'
export const ERROR = 'ERROR'

export type FlightData =
  | {
      status: typeof STANDBY
    }
  | {
      status: typeof FETCHING
    }
  | {
      status: typeof FETCHED
      data: Types.Flight[]
    }
  | {
      status: typeof ERROR
      error: string
    }

export type State = {
  flightData: FlightData
  searchString: string
  checkboxValue: boolean
}

export const initialState: State = {
  flightData: {
    status: STANDBY
  },
  searchString: '',
  checkboxValue: false
}

const flightData = Lens.fromProp<State, 'flightData'>('flightData')
const searchString = Lens.fromProp<State, 'searchString'>('searchString')
const checkboxValue = Lens.fromProp<State, 'checkboxValue'>('checkboxValue')

export const example = (
  state: State = initialState,
  action: ActionTypes.Action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_FLIGHTS_REQUEST:
      return flightData.set({
        status: FETCHING
      })(state)
    case ActionTypes.FETCH_FLIGHTS_FAILURE:
      return flightData.set({
        status: ERROR,
        error: action.error
      })(state)
    case ActionTypes.FETCH_FLIGHTS_SUCCESS:
      return flightData.set({
        status: FETCHED,
        data: action.payload
      })(state)
    case ActionTypes.SET_SEARCH_STRING:
      return searchString.set(action.searchString)(state)
    case ActionTypes.SET_CHECKBOX_VALUE:
      return checkboxValue.set(action.payload)(state)
    default:
      return state
  }
}
