import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import {fetchPosts} from 'store/modules/actions'
import {messaging} from './store/firebase-init'
import 'styles/global.css'

export default class App extends Component {
  componentDidMount() {
    fetchPosts(this.props.dispatch)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
          console.log('ServiceWorker registration successful with scope');
        }, err => {
          console.log('ServiceWorker registration failed');
        }).catch(err => {
          console.log(err)
        })
      })
    } else {
      console.log('service worker is not supported');
    }
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
