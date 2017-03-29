 /**
 * Created by JP on 2017/2/21.
 */
import React, {Component} from 'react'

class Lifecycle extends Component{
  constructor(props, context){
    super(props, context)
  }

  componentWillMount() {
    console.log('[Lifecycle] - componentWillMount')
  }

  componentDidMount() {
    // 可以通过下面的方式在浏览器端获取数据，比如：当前用户信息
    console.log('[Lifecycle] - componentDidMount')
  }

  componentWillUnmount() {
    console.log('[Lifecycle] - componentWillUnmount')
  }

  render(){
    return (<div>Lifecycle test</div>)
  }

}

export default Lifecycle
