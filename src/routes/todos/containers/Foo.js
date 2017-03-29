/**
 * Created by JP on 2017/2/10.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {provideHooks} from '../../../core/redial'
import {loadUser} from '../../../actions/user'

const hooks = {
  init: ({dispatch}) => {
    return dispatch(loadUser())
  }
};

class Foo extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>用户名: {this.props.data.name}</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({data: state.user})

export default provideHooks(hooks)(connect(mapStateToProps)(Foo))
