import React, {Component} from 'react';
import {connect} from 'react-redux'

const Arrow = ({display}) =>
  <svg style={!display? {opacity: 0}:{}} width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>

class ListItem extends Component {
  state = { hover: false }
  onMouseOver = () => this.setState({hover: true })
  onMouseLeave = () => this.setState({hover: false })
  render() {
    const {item} = this.props
    return (
      <li onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <Arrow display={this.state.hover}/>
        <a href={item.link} target="_blank"/>
      </li>
    )
  }
}

const Posts = ({posts}) =>
<div className='Posts'>
  <ul>
    {
      posts.filter(item => item.display).map((item, i) => <ListItem key={item.title + i} item={item}/>)
    }
  </ul>
</div>


export default connect(state => ({
  posts: state.data.posts,
}))(Posts)
