import { LOCATION_CHANGE } from 'react-router-redux'
import { AjaxCreationMethod } from 'rxjs/observable/dom/AjaxObservable'
import * as ActionTypes from 'actionTypes'
import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'
import * as Redux from 'redux'
import * as flightsReducer from 'reducers/flights'
import * as mapdataReducer from 'reducers/mapdata'
import * as t from 'io-ts'

export type AppState = {
  flights: flightsReducer.State
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

export const iFlight = t.intersection([
  t.interface({
    PLAN_CARRIER_CODE: t.string,
    PLAN_FLIGHT_NUMBER: t.string,
    PLAN_DEPARTURE_DATETIME_UTC: t.string,
    PLAN_ARRIVAL_DATETIME_UTC: t.string,
    PLAN_DEPARTURE_STATION: t.string,
    PLAN_ARRIVAL_STATION: t.string,
    _id: t.string,
    flightID: t.string
  }),
  t.partial({
    connector_flights_1h: t.array(t.string),
    connector_flights_2h: t.array(t.string),
    connector_flights_5h: t.array(t.string),
    connector_flights_10h: t.array(t.string),
    weather_risk_arrival: t.string,
    weather_risk_departure: t.string,
    twitter_risk_departure: t.number,
    schedule_risk: t.number,
    overall_risk: t.number,
    twitterTrends: t.array(t.string)
  })
])

export type Flight = t.TypeOf<typeof iFlight>
