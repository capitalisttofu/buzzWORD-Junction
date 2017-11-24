import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as ExampleReducer from 'reducers/example'

export default combineReducers({
  example: ExampleReducer.example,
  router: routerReducer
})
