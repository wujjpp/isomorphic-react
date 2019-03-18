/*
 * Created by Wu Jian Ping on 2019/03/18
 */

export default (init: ({ store, query, params, match, req }) => any) => (component: any) => {
  if (init) {
    component.init = init;
  }
  return component;
};
