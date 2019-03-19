/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import { defaultLayout } from "../layouts";
import { NotFound } from "./common";

import HomeApp from "./home";
import TaskApp from "./task";
import TodoApp from "./todo";

// import EnterpiseApp from "./enterprise";

import Info from "./enterprise/info";
import layout from "./enterprise/layout";
import Risk from "./enterprise/risk";

const routes = [
  {
    component: defaultLayout,
    routes: [
      {
        path: "/",
        exact: true,
        component: HomeApp,
      },
      {
        path: "/todo/:page?",
        component: TodoApp,
      },
      {
        path: "/task",
        component: TaskApp,
      },
      {
        path: "/enterprise",
        component: layout,
        routes: [
          {
            path: "/enterprise/info",
            component: Info,
          },
          {
            path: "/enterprise/risk",
            component: Risk,
          },
        ],
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  },
];

export default routes;
