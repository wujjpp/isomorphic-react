/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadReadme from '../../store/actions/readme'

if (__BROWSER__) {
  require('./style.scss')
}

class Home extends Component {
  static init({ store }) {
    return store.dispatch(loadReadme())
  }

  handleClick() {
    alert('clicked')
  }

  componentDidMount() {
    this.props.loadReadme()
  }

  render() {
    return (
      <div>
        <h2 className="c1">Home Page</h2>
        <h3>Name: {(this.props.data.status !== 'success') && this.props.data.status} {this.props.data.data.name}</h3>
        <button onClick={() => this.handleClick()}>Test</button>
        <button onClick={() => this.props.loadReadme()}>LoadReadme</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({ data: state.readme })

const mapDispatchToProps = dispatch => bindActionCreators({ loadReadme }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)