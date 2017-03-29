/**
 * Created by JP on 2017/2/21.
 */
import React, {Component} from 'react'
import {provideHooks} from '../../../core/redial'
import {connect} from 'react-redux'
import 'markdown-loader/example/markdown.css'
import {loadReadme} from '../../../actions/readme'

const hooks = {
  init: ({dispatch}) => {
    return dispatch(loadReadme())
  }
};

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12" dangerouslySetInnerHTML={{...this.props.data}}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({data: state.readme})

export default provideHooks(hooks)(connect(mapStateToProps)(Home))
