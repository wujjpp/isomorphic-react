
/*
 * Created by Wu Jian Ping on 2019/03/15
 */

import asyncComponent from "../../components/AsyncComponent";

export default asyncComponent({
  loader: () => import("./TodoList"),
  init: ({ store, req }) => store.todoStore.loadTodo(req),
});
