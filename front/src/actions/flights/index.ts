import * as ActionTypes from 'actionTypes/flights'
import * as Types from 'types'

export function fetchFlightsRequest(
  payload: string
): ActionTypes.FetchFlightsRequest {
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
