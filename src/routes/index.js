/**
* Created by Wu Jian Ping on 2019/01/30
*/

import Home from './home'
import About from './about'
import Order from './order'
import OrderDetail from './order/detail'
import NotFound from './errors/NotFound'
import { defaultLayout } from '../layouts'

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
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes