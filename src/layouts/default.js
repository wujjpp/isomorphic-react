/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React, { Component } from 'react'
import Nav from '../components/Nav'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'

if (__BROWSER__) {
  require('../styles/global.scss')
}

export default class AppRoot extends Component {
  static propTypes = {
    route: PropTypes.shape({
      routes: PropTypes.arrayOf(PropTypes.object)
    })
  }

  render() {
    return (<div>
      <Nav />
      {renderRoutes(this.props.route.routes)}
    </div>)
  }
}