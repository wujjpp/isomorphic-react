/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import { defaultLayout } from "../layouts";
import About from "./about";
import { NotFound, RedirectWithStatus } from "./common";
import Context from "./context";
import Counter from "./counter";
import Home from "./home";
import Lifecycle from "./lifecycle";
import Order from "./order";
import OrderDetail from "./order/detail";

const routes = [
  {
    component: defaultLayout,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/about",
        component: About,
      },
      {
        path: "/order",
        component: Order,
        routes: [
          {
            path: "/order/:id",
            component: OrderDetail,
          },
        ],
      },
      {
        path: "/old-order",
        component: RedirectWithStatus({ from: "/old-order", to: "/order", status: 302 }), // eslint-disable-react-dispayname
      },
      {
        path: "/counter",
        component: Counter,
      },
      {
        path: "/lifecycle",
        component: Lifecycle,
      },
      {
        path: "/context",
        component: Context,
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  },
];

export default routes;
