import React, { Component } from 'react'

export default class Home extends Component {
  handleClick() {
    console.log('aaaaaaaaaaaaaaaaaa') // eslint-disable-line
    alert('clicked')
  }

  render() {
    return <div>
      <h2>Home Page</h2>
      <button onClick={() => this.handleClick()}>Test</button>
    </div>

  }
}