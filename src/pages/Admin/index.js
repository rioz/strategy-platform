import React, { Component, Fragment} from 'react';
import {Nav, Posts, NewPost, Footer, Login} from './modules'
import './styles/index.css'
import {connect} from 'react-redux'

const Admin = ({loggedIn}) =>
  <div className="Admin">
    <Nav/>
    {
      loggedIn?
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
  loggedIn: state.data.loggedIn,
}))(Admin)
