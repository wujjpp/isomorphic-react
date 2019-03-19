import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <>
    <h1>这里放企业详情Header组件</h1>
    <div>
      <span>二级Tab导航：</span>
      <Link to="/enterprise/info">【Enterprise Info】</Link>
      <Link to="/enterprise/risk">【Enterprise Risk】</Link>
    </div>
  </>
);
export default Header;
