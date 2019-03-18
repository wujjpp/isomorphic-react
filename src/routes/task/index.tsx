
/*
 * Created by Wu Jian Ping on 2019/03/15
 */

import asyncComponent from "../../components/async-component";
import withInit from "../../components/with-init";

export default withInit(({ store, req }) => store.taskStore.loadTask(req))(asyncComponent({ loader: () => import("./TaskList") }));
