import { LOCATION_CHANGE } from 'react-router-redux'
import { AjaxCreationMethod } from 'rxjs/observable/dom/AjaxObservable'
import * as ActionTypes from 'actionTypes'
import { Observable } from 'rxjs/Observable'
import { ActionsObservable } from 'redux-observable'
import * as Redux from 'redux'
import * as exampleReducer from 'reducers/example'

export type AppState = {
  example: exampleReducer.State
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
