/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import { defaultLayout } from "../layouts";
import { NotFound } from "./common";

import Home from "./home";
import TaskApp from "./task";
import TodoApp from "./todo";

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
        path: "/todo/:page?",
        component: TodoApp,
      },
      {
        path: "/task",
        component: TaskApp,
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  },
];

export default routes;
