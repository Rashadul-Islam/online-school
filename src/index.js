import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
  <Suspense fallback={(<div>Loading...</div>)}>
  <Provider store={store}>
    <App />
  </Provider>
  </Suspense>,
  document.getElementById('root')
)
