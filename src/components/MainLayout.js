/**
 * Created by Wu Jian Ping on 2017/2/15.
 */
import React from 'react'
import Nav from './Nav'

class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default MainLayout
