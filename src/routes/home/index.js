import React, { Component } from 'react'
import NewsFeed from './NewsFeed'
export default class Home extends Component {
  handleClick() {
    alert('clicked')
  }

  render() {
    return <div>
      <h2>Home Page</h2>
      <button onClick={() => this.handleClick()}>Test</button>
      <NewsFeed />
    </div>

  }
}