import { LOCATION_CHANGE } from 'react-router-redux'
import { AjaxCreationMethod } from 'rxjs/observable/dom/AjaxObservable'
import * as ActionTypes from 'actionTypes'
import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'
import * as Redux from 'redux'
import * as exampleReducer from 'reducers/example'
import * as mapdataReducer from 'reducers/mapdata'

export type AppState = {
  example: exampleReducer.State
  mapdata: mapdataReducer.State
  routing: any
  router: any
}

export type LocationChange = {
  type: typeof LOCATION_CHANGE
  payload: {
    pathname: string
    state: any
    search: string
    hash: string
    key: string
  }
}

export type AjaxOptions =
  | {
      headers: any
      url: string
    } & {
      method: 'GET'
    }
  | {
      method: 'POST'
      body: any
    }
  | {
      method: 'PUT'
    }
  | {
      method: 'DELETE'
    } & {
      url: string
    }

export type FetchOptions = {
  storage?: any
  ajax: (ajaxOptions: AjaxOptions) => Observable<Object>
  baseUrl?: string
}

export type Dispatch = (action: AppAction) => void

export type AppAction = ActionTypes.Actions | LocationChange

export type Options = {
  ajax: AjaxCreationMethod
  baseUrl: string
}

export type StoreType<State, Action> = {
  getState: () => State
  dispatch: (action: Action) => Action
}

export type Store = StoreType<AppState, AppAction>

export type EpicType<AppAction extends Redux.Action, Store, Options> = (
  action$: ActionsObservable<AppAction>,
  store: Store,
  options: Options
) => Observable<AppAction>

export type Epic = EpicType<AppAction, Store, Options>

export type CombineEpicsType<Epic> = (...epics: Epic[]) => Epic

export type CombineEpics = CombineEpicsType<Epic>

export type onChangeEvent<value = string> = { target: { value: value } }

export type Coordinate = [number, number]

export interface DataPoint {
  id: number
  coordinates: Coordinate
  severity: number
  radius: number
  description: string
}

export type FlightIdAlias = string

export type Flight = {
  PLAN_CARRIER_CODE: string
  PLAN_FLIGHT_NUMBER: string
  PLAN_DEPARTURE_DATETIME_UTC: string
  PLAN_ARRIVAL_DATETIME_UTC: string
  PLAN_DEPARTURE_STATION: string
  PLAN_ARRIVAL_STATION: string
  _id: string
  FlightId: FlightIdAlias
  weather_risk?: number
  twitter_risk?: number
  schedule_risk?: number
  overall_risk?: number
  connector_flights_1h: FlightIdAlias[]
  connector_flights_2h: FlightIdAlias[]
  connector_flights_5h: FlightIdAlias[]
  connector_flights_10h: FlightIdAlias[]
}
