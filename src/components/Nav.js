/**
 * Created by JP on 2017/2/7.
 */

import {Link} from 'react-router'
import React, {Component} from 'react'

function Nav() {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <a className="navbar-brand" href="https://github.com/wujjpp/isomorphic-react">
            Isomorphic React
          </a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/home" activeClassName="active" onlyActiveOnIndex={true}>Home</Link>
            </li>
            <li>
              <Link to="/Test" activeClassName="active">Test</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="javascript:;">xxxx</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
