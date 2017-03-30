/**
 * Created by Wu Jian Ping on 2017/2/21.
 */
import React, {Component} from 'react'
import {provideHooks} from '../../../core/redial'
import {connect} from 'react-redux'
import {loadReadme} from '../../../actions/readme'

// less also be supported
import '../style.less'

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
        <div className="col-md-12 markdown" dangerouslySetInnerHTML={{__html: this.props.data.__html}}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({data: state.readme})

export default provideHooks(hooks)(connect(mapStateToProps)(Home))
