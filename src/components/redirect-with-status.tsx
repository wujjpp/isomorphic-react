/*
 * Created by Wu Jian Ping on 2019/01/31
 */

import React from "react";
import { Redirect, Route } from "react-router";

interface IRedirectWithStatusProps {
  from?: string;
  to: string;
  status: number;
}

const redirectWithStatus = ({ from, to, status = 301 }: IRedirectWithStatusProps) => {
  function component({ staticContext }: any) {
    if (staticContext) {
      staticContext.status = status;
    }

    return <Redirect from={from} to={to} />;
  }

  return (<Route render={component} />);
};

export default ({ from, to, status = 301 }: IRedirectWithStatusProps) => {
  return () => (redirectWithStatus({ from, to, status }));
};
