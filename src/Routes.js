import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import Map from './Map'

function Main (props) {
  return <div>
    {props.children}
  </div>
}

Main.propTypes = {
  children: PropTypes.node
}

const routes = (
  <Route path='/' component={Main}>
    <IndexRoute component={App}/>
    <Route path='map' component={Map} />
  </Route>
)


export default function Routes () {
  return <Router history={browserHistory} routes={routes} />
}
