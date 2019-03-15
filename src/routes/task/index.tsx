
/*
 * Created by Wu Jian Ping on 2019/03/15
 */

import asyncComponent from "../../components/AsyncComponent";

export default asyncComponent({
  loader: () => import("./TaskList"),
  init: ({ store, req }) => store.taskStore.loadTask(req),
});
