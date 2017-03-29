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
        <Nav router={this.props.router}/>
        <div className='container content-container'>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}
