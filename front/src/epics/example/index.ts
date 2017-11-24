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
import * as ActionTypes from 'actionTypes/example'
import * as Actions from 'actions/example'
import * as Reducer from 'reducers/example'
import * as Option from 'fp-ts/lib/Option'

type AjaxResult = {
  response: { [key: string]: any }
}

export function exampleGet(
  action$: ActionsObservable<ActionTypes.Action>,
  store: Types.Store,
  { ajax, baseUrl }: Types.FetchOptions
): Observable<ActionTypes.Action> {
  return (action$.ofType(ActionTypes.FETCH_EXAMPLE_REQUEST) as Observable<
    ActionTypes.FetchExampleRequest
  >)
    .debounceTime(500)
    .mergeMap(({ payload }) =>
      ajax({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
        url: `${baseUrl}api/example/`
      }).flatMap(({ response }: AjaxResult) => {
        return Either.fold(
          err => Observable.of(Actions.fetchExampleFailure('Validation error')),
          R.compose(Observable.of, Actions.fetchExampleSuccess),
          t.validate(response, ActionTypes.iFetchExampleSuccessData)
        )
      })
    )
    .catch(error => Observable.of(Actions.fetchExampleFailure(error)))
}
