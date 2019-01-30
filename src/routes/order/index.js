/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

export default class Order extends Component {
  componentDidMount() {
    console.log('order mounted')
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