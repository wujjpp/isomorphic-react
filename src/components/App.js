/**
 * Created by JP on 2017/2/6.
 */

import React, {Component} from 'react'
import Nav from './Nav'
import Footer from './Footer'
import '../styles/global.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav/> {this.props.children}
        <Footer/>
      </div>
    )
  }
}
