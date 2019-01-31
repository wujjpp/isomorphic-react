import React, { Component } from 'react'

export default class ServerError extends Component {
  render() {
    console.log(this.props.error) // eslint-disable-line
    return (<div>{(this.props.error && this.props.error.message) || '系统错误'}</div>)
  }
}