import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import * as fp from 'fp-ts'
import * as Either from 'fp-ts/lib/Either'
import * as R from 'ramda'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject, AjaxRequest } from 'rxjs'
import { PartialObserver } from 'rxjs/Observer'
import 'rxjs'
import * as Types from 'types'
import { ActionsObservable } from 'redux-observable'
import * as ActionTypes from 'actionTypes/flights'
import * as Actions from 'actions/flights'
import * as Reducer from 'reducers/flights'
import * as Option from 'fp-ts/lib/Option'

type AjaxResult = {
  response: { [key: string]: any }
}

export function getAllFlights(
  action$: ActionsObservable<ActionTypes.Action>,
  store: Types.Store,
  { ajax, baseUrl }: Types.FetchOptions
): Observable<ActionTypes.Action> {
  return (action$.ofType(ActionTypes.FETCH_FLIGHTS_REQUEST) as Observable<
    ActionTypes.FetchFlightsRequest
  >)
    .debounceTime(500)
    .mergeMap(() =>
      ajax({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
        url: `${baseUrl}api/flights/`
      }).flatMap(({ response }: AjaxResult) => {
        return Either.fold(
          err => Observable.of(Actions.fetchFlightsFailure('Validation error')),
          R.compose(Observable.of, Actions.fetchFlightsSuccess),
          t.validate(response, t.array(Types.iFlight))
        )
      })
    )
    .catch(error => Observable.of(Actions.fetchFlightsFailure(error)))
}
