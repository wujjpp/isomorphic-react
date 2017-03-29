/**
 * Created by Wu Jian Ping on 2017/2/7.
 */
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default {
  path: '/home',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('./containers/Home').default)
    })
  }
}
