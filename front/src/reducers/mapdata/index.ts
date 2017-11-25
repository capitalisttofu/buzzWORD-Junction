import * as ActionTypes from 'actionTypes/example'
import * as Types from 'types'

import data from '../../mockData'

export type State = Types.DataPoint[]

const initialState: State = data

export const mapdata = (
  state: State = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'ADD_INITIAL_DATA':
      return action.payload
    default:
      return state
  }
}
