import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/mapTo'
import { ActionsObservable } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { AppAction, Store, CombineEpics } from '../types'
import * as ExampleEpics from './example'

export const epic = (action$: Observable<AppAction>, store: Store) =>
  (combineEpics as CombineEpics)(
    ExampleEpics.exampleGet
  )(action$ as ActionsObservable<AppAction>, store, {
    ajax,
    baseUrl: __APIBASEURL__
  })

export default epic
