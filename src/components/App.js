/**
 * Created by JP on 2017/2/6.
 */

import React, {Component, PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {connect} from 'react-redux'

import '../styles/bootstrap/bootstrap.scss'
import {Button} from 'react-bootstrap'

import Nav from './Nav'
import '../styles/main.scss'

import image1 from './images/a.jpg'

class App extends Component {

  static propTypes = {
    data: PropTypes.object // eslint-disable-line
  }

  componentWillMount() {
    /*if (!__BROWSER__) {
      console.log('=====================');
      console.log('server side');
    }

    if (__BROWSER__) {
      console.log('=====================');
      console.log('client side');
    }*/
  }

  componentDidMount() {
    // 可以通过下面的方式在浏览器端获取数据，比如：当前用户信息
    console.log('componentDidMount called')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount called')
  }

  render() {
    return (
      <div>
        <h1>这只是测试</h1>
        <div>
          <Button bsStyle="success">Success</Button>
          <span className="glyphicon glyphicon-music"/>
        </div>

        <div>
          {/*<img src={image1} width="300" alt=""/>*/}
        </div>
        {this.props.data && this.props.data.name && <span>当前用户：{this.props.data.name}</span>}
        <Nav/> {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({data: state.user}) //eslint-disable-line

export default connect(mapStateToProps)(App)
