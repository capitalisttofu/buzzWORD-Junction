import * as R from 'ramda'
import { Lens } from 'monocle-ts'
import * as ActionTypes from 'actionTypes/example'
import * as Types from 'types'

export const STANDBY = 'STANDBY'
export const FETCHING = 'FETCHING'
export const FETCHED = 'FETCHED'
export const ERROR = 'ERROR'

export type ExampleData =
  | {
      status: typeof STANDBY
    }
  | {
      status: typeof FETCHING
    }
  | {
      status: typeof FETCHED
      data: ActionTypes.FetchExampleSuccessData
    }
  | {
      status: typeof ERROR
      error: string
    }

export type State = {
  exampleData: ExampleData
}

export const initialState: State = {
  exampleData: {
    status: STANDBY
  }
}

const exampleData = Lens.fromProp<State, 'exampleData'>('exampleData')

export const example = (
  state: State = initialState,
  action: ActionTypes.Action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_EXAMPLE_REQUEST:
      return exampleData.set({
        status: FETCHING
      })(state)
    case ActionTypes.FETCH_EXAMPLE_FAILURE:
      return exampleData.set({
        status: ERROR,
        error: action.error
      })(state)
    case ActionTypes.FETCH_EXAMPLE_SUCCESS:
      return exampleData.set({
        status: FETCHED,
        data: action.payload
      })(state)
    default:
      return state
  }
}
