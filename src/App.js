import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import './styles/global.scss'

import Nav from './components/Nav'
import routes from './routes'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          {
            routes.map(route => <Route key={route.path} {...route} />)
          }
        </Switch>
      </div>
    )
  }
}