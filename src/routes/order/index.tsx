/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import * as React from 'react'
import { Component } from 'react'
import { renderRoutes } from 'react-router-config'

interface IOrderProps {
  route: {
    routes: any[]
  }
}

export default class Order extends Component<IOrderProps> {

  public componentDidMount(): void {
    console.log('order mounted')  // tslint:disable-line
  }

  public render(): React.ReactNode {
    return (
      <div>
        <div>Orders</div>
        <div>下面是detail</div>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}