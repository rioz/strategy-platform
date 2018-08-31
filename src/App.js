import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import {fetchPosts} from 'store/modules/actions'
import 'styles/global.css'

export default class App extends Component {
  componentDidMount() {
    fetchPosts(this.props.dispatch)
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/" component={Home}/>
          <Route component={Home}/>
        </Switch>
      </div>
    )
  }
}
