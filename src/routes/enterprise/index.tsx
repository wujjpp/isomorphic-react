// import React from "react";

// export default () => (<div>Enterprise</div>);

import Info from "./info";
import layout from "./layout";
import Risk from "./risk";

export default {
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
};
