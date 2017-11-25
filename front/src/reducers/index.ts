import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as ExampleReducer from 'reducers/example'
import * as MapDataReducer from 'reducers/mapdata'

export default combineReducers({
  example: ExampleReducer.example,
  router: routerReducer,
  mapdata: MapDataReducer.mapdata
})
