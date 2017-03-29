/**
 * Created by JP on 2017/2/15.
 */
import React, {Component} from 'react'
import Nav from './Nav'

class MainLayout extends Component {
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
