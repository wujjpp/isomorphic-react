import React, { Component } from 'react'
import Nav from '../components/Nav'
import { renderRoutes } from 'react-router-config'
import '../styles/global.scss'

export default class AppRoot extends Component {
  render() {
    return (<div>
      <Nav />
      {renderRoutes(this.props.route.routes)}
    </div>)
  }
}