
/*
 * Created by Wu Jian Ping on 2019/03/15
 */

import asyncComponent from "../../components/async-component";
import withInit from "../../components/with-init";

export default withInit(({ store, req }) => store.todoStore.loadTodo(req))(asyncComponent({ loader: () => import("./TodoList") }));
