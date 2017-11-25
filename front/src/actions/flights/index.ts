import * as ActionTypes from 'actionTypes/flights'
import * as Types from 'types'

export function fetchFlightsRequest(): ActionTypes.FetchFlightsRequest {
  return {
    type: ActionTypes.FETCH_FLIGHTS_REQUEST
  }
}

export function fetchFlightsSuccess(
  payload: Types.Flight[]
): ActionTypes.FetchFlightsSuccess {
  return {
    type: ActionTypes.FETCH_FLIGHTS_SUCCESS,
    payload
  }
}

export function fetchFlightsFailure(
  error: string
): ActionTypes.FetchFlightsFailure {
  return {
    type: ActionTypes.FETCH_FLIGHTS_FAILURE,
    error
  }
}

export function setSearchString(
  searchString: string
): ActionTypes.SetSearchString {
  return {
    type: ActionTypes.SET_SEARCH_STRING,
    searchString
  }
}
