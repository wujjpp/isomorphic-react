/**
 * Created by JP on 2017/2/7.
 */

import {Link} from 'react-router'
import React, {Component} from 'react'

function Nav() {
  return (
    <ul role="nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/todos">Todos</Link>
      </li>
      <li>
        <Link to="/lifecycle">Lifecycle</Link>
      </li>
    </ul>
  )
}

export default Nav
