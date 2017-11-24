import * as ActionTypes from 'actionTypes/example'
import * as Types from 'types'

export function fetchExampleRequest(
  payload: string
): ActionTypes.FetchExampleRequest {
  return {
    type: ActionTypes.FETCH_EXAMPLE_REQUEST,
    payload
  }
}

export function fetchExampleSuccess(
  payload: ActionTypes.FetchExampleSuccessData
): ActionTypes.FetchExampleSuccess {
  return {
    type: ActionTypes.FETCH_EXAMPLE_SUCCESS,
    payload
  }
}

export function fetchExampleFailure(
  error: string
): ActionTypes.FetchExampleFailure {
  return {
    type: ActionTypes.FETCH_EXAMPLE_FAILURE,
    error
  }
}
