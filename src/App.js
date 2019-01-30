import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import Nav from './components/Nav'
import routes from './routes'

import './styles/global.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          {routes.map((route, n) => (
            <Route key={n} {...route} />
          ))}
        </Switch>
      </div>
    )
  }
}