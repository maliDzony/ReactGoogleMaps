import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import * as helpers from './helpers'

class Mapa extends Component {

  constructor (props) {
    super(props)
    this.state = {
      route: browserHistory.getCurrentLocation().state
    }
  }

  getChildContext () {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  componentDidMount = () => {
    this.showMap(this.state.route)
  }

  showMap = (route) => {
    const google = window.google
    let directionsDisplay = null
    const node = ReactDOM.findDOMNode(this.refs.map)
    const map = new google.maps.Map(node, { zoom: 10 })

    directionsDisplay = new google.maps.DirectionsRenderer({ map })
    directionsDisplay.setDirections(route)
  }

  redirect= () => {
    browserHistory.goBack()
  }

  render () {
    const routeShortcut = this.state.route
    return (
      <div className='app'>
        <RaisedButton
          label='Go back'
          labelColor='#fff'
          backgroundColor='#de991b'
          onClick={this.redirect}
        />
        <p>{helpers.labelFormatter(routeShortcut)}</p>
        <div style={{ height: 500 }} ref='map'>
          Loading...
        </div>
        <p>{routeShortcut.routes[0].legs[0].distance.text} About {routeShortcut.routes[0].legs[0].duration.text}</p>
      </div>
    )
  }
}

Mapa.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Mapa
