import React, { Component, Fragment} from 'react';
import {Footer, About, Heading, Posts, Login} from './modules'
import './styles/index.css'
import {connect} from 'react-redux'

const Home = ({loggedInReader, loggedInAdmin}) =>
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


export default connect(state => ({
  loggedInReader: state.data.loggedInReader,
  loggedInAdmin: state.data.loggedInAdmin,
}))(Home)
