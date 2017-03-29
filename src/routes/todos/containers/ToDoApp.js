/**
 * Created by JP on 2017/2/7.
 */

import React, {Component} from 'react'

//import Helmet from '../../../core/react-helmet'
import Helmet from 'react-helmet'
import {provideHooks} from '../../../core/redial'
import {connect} from 'react-redux'
import {loadTodoList} from '../../../actions/todo'

import MainLayout from '../../../components/MainLayout'

import {loadUser} from '../../../actions/user'

import Foo from './Foo'
import Bar from './Bar'

import './style.scss'

const hooks = {
  init: ({dispatch}) => {
    return dispatch(loadTodoList())
  },
  components: [Foo, Bar]
};

class ToDoApp extends Component {
  constructor(props) {
    super(props)
    this.foo = this.foo.bind(this)
  }

  foo(e) {
    console.log('onClick called')
    console.log(e)
    this.props.dispatch(loadUser())
  }

  render() {
    return (
      <div>
        <Helmet
          title='Title for todo list'
          meta={[
            {name: "description", content: "this is description for todo list page"},
            {name: "keywords", content: "this is keywords for todo list page"}
          ]}/>

        <h2>任务列表</h2>

        {this.props.data && this.props.data.map(c => <div key={c.id}>{c.name}</div>)}
        <Foo />
        <Bar />

        <button onClick={this.foo}>aaaa</button>

        <div className='foo'>
          测试一下foo样式的颜色
          <div className="test"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({data: state.todos})

export default provideHooks(hooks)(connect(mapStateToProps)(ToDoApp))
