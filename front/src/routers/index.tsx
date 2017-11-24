import 'rxjs'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

import * as RRR from 'react-router-redux'
const { ConnectedRouter } = RRR as any
import { history } from '../store'

import HomeView from '../views/Home'

export const RootApp = () => {
  return (
    <ConnectedRouter history={history}>
      <Route exact path="/" component={HomeView} />
    </ConnectedRouter>
  )
}
