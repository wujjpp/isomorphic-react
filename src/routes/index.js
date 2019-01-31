/**
* Created by Wu Jian Ping on 2019/01/30
*/
import React from 'react'
import Home from './home'
import About from './about'
import Order from './order'
import OrderDetail from './order/detail'
import { defaultLayout } from '../layouts'
import { NotFound, RedirectWithStatus } from './common'

const routes = [
  {
    component: defaultLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/order',
        component: Order,
        routes: [
          {
            path: '/order/:id',
            component: OrderDetail
          }
        ]
      },
      {
        path: '/old-order',
        component: () => (<RedirectWithStatus from='/old-order' to='/order' status={302} />)
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes