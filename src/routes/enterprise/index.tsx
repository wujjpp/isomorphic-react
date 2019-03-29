import Info from "./info";
import layout from "./layout";
import Risk from "./risk";

export default {
  path: "/enterprise",
  component: layout,
  routes: [
    {
      path: "/enterprise",
      exact: true,
      component: Info,
    },
    {
      path: "/enterprise/info",
      component: Info,
    },
    {
      path: "/enterprise/risk",
      component: Risk,
    },
  ],
};
