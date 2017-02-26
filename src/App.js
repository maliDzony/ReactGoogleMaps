import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import TextField from 'material-ui/TextField'
import injectTapEventPlugin from 'react-tap-event-plugin'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import * as helpers from './helpers'
import * as apiHelpers from './apiHelpers'
import './App.css'

injectTapEventPlugin()
class App extends Component {
  state={
    from: '',
    to: '',
    routes: [],
    snackbarShown: false
  }
  getChildContext () {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  componentWillMount = () => {
    const retrievedObject = localStorage.getItem('paths')
    this.setState({
      routes: JSON.parse(retrievedObject) ? JSON.parse(retrievedObject) : []
    })
  }
  componentWillUnmount= () => {
    localStorage.setItem('paths', JSON.stringify(this.state.routes))
  }

  onSubmit= () => {
    apiHelpers.loadMap(this.state, this.okCallback, this.failCallback)
  }

  okCallback= (route) => {
    this.setState({
      routes: update(this.state.routes, { $push: [route] })
    })
    browserHistory.push({
      pathname: '/map',
      state: route
    })
  }

  failCallback= () => {
    this.setState({
      snackbarShown: true
    })
  }

  details= (route) => {
    browserHistory.push({
      pathname: '/map',
      state: route
    })
  }

  deleteRoute = (index) => {
    this.setState({
      routes: update(this.state.routes, { $splice: [[index, 1]] })
    },
    localStorage.setItem('paths', JSON.stringify(this.state.routes))
    )
  }

  handleRequestClose = () => {
    this.setState({
      snackbarShown: false
    })
  }

  onChangeFrom= (event) => {
    this.setState({
      from: event.target.value
    })
  }

  onChangeTo= (event) => {
    this.setState({
      to: event.target.value
    })
  }

  render () {
    return (
      <div className='app'>
        <form>
          <TextField
            className='textField'
            floatingLabelText='From'
            onChange={this.onChangeFrom}
            value={this.state.from}
          />
          <TextField
            className='textField'
            floatingLabelText='To'
            onChange={this.onChangeTo}
            value={this.state.to}
          />
          <RaisedButton
            label='Submit'
            primary={true}
            onClick={this.onSubmit}
          />
        </form>
        <div className='prevRoute'>
        {
          this.state.routes.map((routeItem, index) =>
          <div className='prevRouteItem' key={index} >
            <span className='prevRouteLabel'>
              {helpers.previouslyEnteredRoute(routeItem, index)}
            </span>
            <RaisedButton
              label='Detail'
              primary={true}
              onClick={() => this.details(routeItem)}
            />
            <RaisedButton
              label='Delete'
              labelColor='#fff'
              style={{ marginLeft: 12 }}
              backgroundColor='#c1182c'
              onClick={() => this.deleteRoute(index)}
            />
          </div>
          )
        }
        </div>
        <p>{`You have ${this.state.routes.length} rote(s)`}</p>
        <Snackbar
          open={this.state.snackbarShown}
          message='Not found'
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ textAlign: 'center', backgroundColor: '#dc736d' }}
        />
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default App
