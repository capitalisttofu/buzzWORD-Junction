import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as FlightsReducer from 'reducers/flights'
import * as MapDataReducer from 'reducers/mapdata'

export default combineReducers({
  flights: FlightsReducer.example,
  router: routerReducer,
  mapdata: MapDataReducer.mapdata
})
