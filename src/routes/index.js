import { matchPath } from 'react-router-dom'
import Home from './home'
import About from './about'
import Order from './order'
import NotFound from './errors/NotFound'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    dependencies: []
  },
  {
    path: '/about',
    component: About,
    dependencies: []
  },
  {
    path: '/order',
    component: Order,
    dependencies: []
  },
  {
    component: NotFound
  }
]

export default routes

export const match = path => {
  const promises = []
  routes.some(route => {
    const match = matchPath(path, route)
    if (match) promises.push(route.loadData(match))
    return match
  })

  return promises
}