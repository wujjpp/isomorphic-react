import React, { Component } from 'react'
import loadReadme from '../../store/actions/readme'
import { connect } from 'react-redux'

class Home extends Component {
  handleClick() {
    alert('clicked')
  }

  componentDidMount() {
    console.log('home mounted')
  }

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <h3>Name: {this.props.readme.name}</h3>
        <button onClick={() => this.handleClick()}>Test</button>
        <button onClick={() => this.props.loadReadme()}>LoadReadme</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  readme: state.readme
})

const mapDispatchToProps = dispatch => {
  return {
    loadReadme: () => dispatch(loadReadme())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)