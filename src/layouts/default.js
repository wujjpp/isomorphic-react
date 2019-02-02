/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import Nav from '../components/Nav'

if (__BROWSER__) {
  require('../styles/global.scss')
}

class AppRoot extends Component {
  render() {
    return (
      <div>
        <Nav />
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

AppRoot.propTypes = {
  route: PropTypes.shape(
    {
      routes: PropTypes.array
    }
  )
}

export default AppRoot
