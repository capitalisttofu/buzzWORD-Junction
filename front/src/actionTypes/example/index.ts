import * as t from 'io-ts'

export const FETCH_EXAMPLE_REQUEST = '@example/FETCH_EXAMPLE_REQUEST'
export const FETCH_EXAMPLE_SUCCESS = '@example/FETCH_EXAMPLE_SUCCESS'
export const FETCH_EXAMPLE_FAILURE = '@example/FETCH_EXAMPLE_FAILURE'

export type FetchExampleRequest = {
  type: typeof FETCH_EXAMPLE_REQUEST
  payload: string
}

export const iFetchExampleSuccessData = t.interface({
  name: t.string,
  id: t.number
})

export type FetchExampleSuccessData = t.TypeOf<typeof iFetchExampleSuccessData>

export type FetchExampleSuccess = {
  type: typeof FETCH_EXAMPLE_SUCCESS
  payload: FetchExampleSuccessData
}

export type FetchExampleFailure = {
  type: typeof FETCH_EXAMPLE_FAILURE
  error: string
}

export type Action =
  | FetchExampleRequest
  | FetchExampleSuccess
  | FetchExampleFailure
