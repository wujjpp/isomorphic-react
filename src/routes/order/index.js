/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

export default class Order extends Component {
  static propTypes = {
    route: PropTypes.shape({
      routes: PropTypes.array
    })
  }

  componentDidMount() {
    console.log('order mounted')  // eslint-disable-line
  }
  render() {
    return (
      <div>
        <div>Orders</div>
        <div>下面是detail</div>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}
