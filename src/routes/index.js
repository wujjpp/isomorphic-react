/**
 * Created by JP on 2017/2/6.
 */

import React from 'react'
import App from '../components/App'

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    require('./about').default,
    require('./todos').default,
    require('./lifecycle').default,
  ]
}

export default routes
