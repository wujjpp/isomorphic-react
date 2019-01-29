import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Nav from '../components/Nav'

import '../styles/global.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}