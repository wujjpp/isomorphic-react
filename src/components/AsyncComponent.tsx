import React from "react";
import Loadable from "react-loadable";
import Loading from "./Loading";

export default ({ loader, init }) => {
  const AsyncComponent = Loadable({ loader, loading: Loading });
  const Component = () => {
    return <AsyncComponent />;
  };
  if (init) {
    Component.init = init;
  }
  return Component;
};
