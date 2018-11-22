/**
 * Created by Wu Jian Ping on 2017/2/6.
 */

import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import '../styles/global.scss'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav router={this.props.router} />
        <div className='container content-container'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
