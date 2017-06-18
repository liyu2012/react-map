import React from 'react'
import ReactDOM from 'react-dom'
import {render} from 'react-dom'
import App from '../containers/App'
import {Provider} from 'react-redux'
import Perf from 'react-addons-perf'
import configStore from '../store/configstore'
if(__DEV__){
  window.Perf=Perf
}
const store=configStore({})
render(<Provider store={store}><App/></Provider>,
document.getElementById('example'))
