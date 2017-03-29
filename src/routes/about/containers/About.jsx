/**
 * Created by JP on 2017/2/6.
 */
import React, {Component} from 'react'
//import Helmet from '../../../core/react-helmet'
import Helmet from 'react-helmet'

import MainLayout from '../../../components/MainLayout'

class About extends Component {
  render() {
    return <MainLayout>
      <Helmet title='Title for about list' meta={[
        {
          name: "description",
          content: "this is description for about page"
        }, {
          name: "keywords",
          content: "this is keywords for about page"
        }
      ]}/>
      <span>这是About页面的内容</span>
    </MainLayout>
  }
}

export default About
