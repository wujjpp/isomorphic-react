/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  public render() {
    return (
      <>
        <hr />
        <div>
          <Link to="/">【Home】</Link>
          <Link to="/todo">【Todo】</Link>
          <Link to="/task">【Task】</Link>
        </div>
        <hr />
      </>
    );
  }
}
