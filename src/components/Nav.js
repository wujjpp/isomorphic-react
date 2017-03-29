/**
 * Created by JP on 2017/2/7.
 */

import {Link} from 'react-router'
import React, {Component} from 'react'
import {Navbar, Nav, MenuItem, NavItem, NavDropdown} from 'react-bootstrap'

class NavBar extends React.Component {
  render() {
    return (
      <Navbar className="navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="https://github.com/wujjpp/isomorphic-react">Isomorphic React</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
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
            <NavDropdown title="Dropdown" id="dropdown">
              <MenuItem>Action</MenuItem>
              <MenuItem>Another action</MenuItem>
              <MenuItem>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem>Link Right</NavItem>
            <NavItem>Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar
