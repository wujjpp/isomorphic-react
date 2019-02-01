/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import loadReadme from '../../store/actions/readme'

if (__BROWSER__) {
  require('./style.scss')
}

class Home extends React.Component {
  static propTypes = {
    loadReadme: PropTypes.func,
    data: PropTypes.shape({
      status: PropTypes.string.isRequired,
      data: PropTypes.object
    })
  }

  static init({ store }) {
    return store.dispatch(loadReadme())
  }

  constructor(props) {
    super(props)
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
        <Helmet>
          <title>这是首页</title>
          <meta name="description" content="这是首页的描述" />
          <meta name="keywords" content="这是首页的关键词" />
        </Helmet>
        <h2 className="c1">Home Page</h2>
        <h3>Name: {(this.props.data.status !== 'success') && this.props.data.status} {this.props.data.data.name}</h3>
        <button onClick={this.handleClick}>Test</button>
        <button onClick={this.props.loadReadme}>LoadReadme</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({ data: state.readme })

const mapDispatchToProps = dispatch => bindActionCreators({ loadReadme }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)