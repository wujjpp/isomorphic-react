/**
 * Created by Wu Jian Ping on 2017/2/7.
 */

import {Link} from 'react-router'
import React from 'react'

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="https://github.com/wujjpp/isomorphic-react">
              Isomorphic React
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={this.props.router.isActive('/home', true)
                ? 'active'
                : ''}>
                <Link to='/home'>Home</Link>
              </li>
              <li className={this.props.router.isActive('/test', false)
                ? 'active'
                : ''}>
                <Link to='/test'>Test</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="javascript:;">xxx@xxx.com</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
