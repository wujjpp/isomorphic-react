/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  public render(): React.ReactNode {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>
            <Link to="/old-order">Old Order</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
          <li>
            <Link to="/lifecycle">Lifecycle</Link>
          </li>
          <li>
            <Link to="/context">Context</Link>
          </li>
          <li>
            <Link to="/refs">Refs</Link>
          </li>
          <li>
            <Link to="/render-props">Render Props</Link>
          </li>
          <li>
            <Link to="/mobx">Mobx</Link>
          </li>
        </ul>
      </div>
    );
  }
}
