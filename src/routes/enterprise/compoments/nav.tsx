import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <span>二级Tab导航：</span>
    <Link to="/enterprise/info">【Enterprise Info】</Link>
    <Link to="/enterprise/risk">【Enterprise Risk】</Link>
  </div>
);
