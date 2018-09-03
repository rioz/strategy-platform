import React, { Component, Fragment} from 'react';
import {Footer, About, Heading, Posts, Login} from './modules'
import './styles/index.css'
import {checkIfLoggedIn} from 'store/modules/actions'
import {connect} from 'react-redux'

class Home extends Component {
  componentDidMount() {
    checkIfLoggedIn(this.props.dispatch)
  }
  render() {
    const {loggedInReader, loggedInAdmin} = this.props
    return (
      <Fragment>
        {
          loggedInReader || loggedInAdmin?
          <div className="Home">
            <Heading/>
            <About/>
            <Posts/>
            <Footer/>
          </div>
          :
          <Fragment>
            <Login text='Unipro Projects'/>
          </Fragment>
        }
      </Fragment>
    )
  }
}

export default connect(state => ({
  loggedInReader: state.data.loggedInReader,
  loggedInAdmin: state.data.loggedInAdmin
}))(Home)
