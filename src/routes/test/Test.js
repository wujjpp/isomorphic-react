/**
 * Created by Wu Jian Ping on 2017/2/21.
 */
import React, {Component} from 'react'
import img1 from './images/1.jpg'
import './style.scss'
import '../../styles/toastr.scss'

if (__BROWSER__) {
  require('easy-pie-chart/dist/jquery.easypiechart')
  var toastr = require('toastr') //toastr is a client library for displaying notification, it is useless in server side
}

class Test extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      count: 10,
      content: 'isomorphic-react'
    }

    this.inc = this.inc.bind(this)
    this.dec = this.dec.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.updateChart = this.updateChart.bind(this)
  }

  componentDidMount() {
    $('.chart').easyPieChart({
      easing: 'easeOutBounce',
      onStep: function(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent))
      }
    })
    this.chart = $('.chart').data('easyPieChart');
    this.chart.update(Math.random() * 200 - 100)
  }

  inc() {
    this.setState({
      count: this.state.count + 1
    })
  }

  dec() {
    this.setState({
      count: this.state.count - 1
    })
  }

  handleInput(e) {
    this.setState({content: e.target.value})
  }

  updateChart() {
    this.chart.update(Math.random() * 200 - 100)
  }

  showToastr() {
    toastr.success('Have fun storming the castle!', 'Miracle Max Says')
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>
            React14.5.2 + Webpack2 + Babel6
            <small>&nbsp;Support ES6</small>
          </h1>
        </div>
        <div className="col-md-12">
          <h2>1. Test import image</h2>
          <img src={img1} className="img-responsive"/>
        </div>
        <div className="col-md-12">
          <h2>2. Test background</h2>
          <div className="test-background"/>
        </div>
        <div className="col-md-12">
          <h2>3. Test vdom</h2>
          <div>
            Counter:
            <b>{this.state.count}</b>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.inc}>+</button>
            <button type="button" className="btn btn-default" onClick={this.dec}>
              -
            </button>
          </div>
        </div>
        <div className="col-md-12">
          <h2>
            4. Two way data-binding
            <small>&nbsp;Try to type any character in the following textbox</small>
          </h2>
          <div className="row">
            <div className="form-group">
              <div className="col-md-4"><input className="form-control" value={this.state.content} type="text" onChange={this.handleInput}/></div>
              <div className="col-md-8">
                <p className="form-control-static"><b>{this.state.content}</b></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h2>5. Test integrate jquery plugin</h2>
          <span className="chart">
            <span className="percent"></span>
          </span>
          <span className="btn btn-default" onClick={this.updateChart}>Update chart</span>
        </div>
        <div className="col-md-12">
          <h2>6. Test icon font</h2>
          <span className="glyphicon glyphicon-heart" style={{
            fontSize: '80px'
          }}/>
          <p>glyphicon glyphicon-heart</p>
        </div>
        <div className="col-md-12">
          <h2>7. Test plain javascript library</h2>
          <a className="btn btn-default" href="javascript:;" onClick={this.showToastr}>Click me to show toastr</a>
        </div>
      </div>
    )
  }
}

export default Test
