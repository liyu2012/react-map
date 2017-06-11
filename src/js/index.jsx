import React from 'react'
import ReactDOM from 'react-dom'
import {render} from 'react-dom'
import App from '../containers/App'
import Perf from 'react-addons-perf'
if(__DEV__){
  window.Perf=Perf
}
render(<App/>,document.getElementById('example'))
