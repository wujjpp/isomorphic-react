import Home from './home'
import About from './about'
import NotFound from './errors/NotFound'
import Order from './order'
import defaultLayout from './default-layout'

export default [
  {
    component: defaultLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]
