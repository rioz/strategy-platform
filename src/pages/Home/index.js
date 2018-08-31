import React, { Component } from 'react';
import {Footer, About, Heading, Posts} from './modules'
import './styles/index.css'

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Heading/>
        <About/>
        <Posts/>
        <Footer/>
      </div>
    );
  }
}
