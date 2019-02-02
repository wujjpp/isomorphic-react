/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import loadReadme from '../../store/actions/readme'

if (__BROWSER__) {
  require('./style.scss')
}

interface IHomeProps {
  data: {
    status: string,
    data: any
  }
  loadReadme: () => any
}

class Home extends React.Component<IHomeProps> {
  public static init({ store }: { store: any }) {
    return store.dispatch(loadReadme())
  }

  constructor(props: IHomeProps) {
    super(props)
  }

  public handleClick() {
    alert('clicked')
  }

  public componentDidMount(): void {
    this.props.loadReadme()
  }

  public render(): React.ReactNode {
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

const mapStateToProps = (state: any) => ({ data: state.readme })

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ loadReadme }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)