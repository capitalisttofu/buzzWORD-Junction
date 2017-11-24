import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import '../assets/sass/index.scss'

import { RootApp } from './routers'
import { configureStore } from './store'

const store = configureStore()

const renderApp = (Root: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Root />
      </Provider>
    </AppContainer>,
    document.getElementById('project-mount')
  )
}

renderApp(RootApp)

if ((module as any).hot) {
  ;(module as any).hot.accept('./routers', () =>
    renderApp(require('./routers').RootApp)
  )
}
