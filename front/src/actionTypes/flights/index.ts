import * as t from 'io-ts'
import * as Types from 'types'

export const FETCH_FLIGHTS_REQUEST = '@Flights/FETCH_FLIGHTS_REQUEST'
export const FETCH_FLIGHTS_SUCCESS = '@Flights/FETCH_FLIGHTS_SUCCESS'
export const FETCH_FLIGHTS_FAILURE = '@Flights/FETCH_FLIGHTS_FAILURE'

export const SET_SEARCH_STRING = '@Flights/SET_SEARCH_STRING'
export const SET_CHECKBOX_VALUE = '@Flights/SET_CHECKBOX_VALUE'

export type SetSearchString = {
  type: typeof SET_SEARCH_STRING
  searchString: string
}

export type SetCheckboxValue = {
  type: typeof SET_CHECKBOX_VALUE
  payload: boolean
}

export type FetchFlightsRequest = {
  type: typeof FETCH_FLIGHTS_REQUEST
}

export type FetchFlightsSuccess = {
  type: typeof FETCH_FLIGHTS_SUCCESS
  payload: Types.Flight[]
}

export type FetchFlightsFailure = {
  type: typeof FETCH_FLIGHTS_FAILURE
  error: string
}

export type Action =
  | FetchFlightsRequest
  | FetchFlightsSuccess
  | FetchFlightsFailure
  | SetSearchString
  | SetCheckboxValue
