/**
 * Created by Wu Jian Ping on 2017/2/6.
 */
import App from '../components/App'

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/home')
  },
  childRoutes: [
    require('./home').default,
    require('./test').default
  ]
}

export default routes
