import React, { Component, Fragment} from 'react';
import {Nav, Posts, NewPost, Footer, Login} from './modules'
import './styles/index.css'
import {connect} from 'react-redux'

const Admin = ({loggedInAdmin}) =>
  <div className="Admin">
    <Nav/>
    {
      loggedInAdmin?
      <Fragment>
        <NewPost/>
        <Posts/>
        <Footer/>
      </Fragment>
      :
      <Fragment>
        <Login/>
      </Fragment>
     }
  </div>

export default connect(state => ({
  loggedInAdmin: state.data.loggedInAdmin,
}))(Admin)
