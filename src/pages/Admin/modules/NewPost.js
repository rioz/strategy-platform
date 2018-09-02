import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import {uploadPost} from 'store/modules/actions'
import {NewPostModal} from './Modals'

function findSmallestInteger(array) {
  for (let i = 1; i < 100000; i++) {
    if(!array.includes(i)) return i
  }
}

class NewPost extends Component {
  state ={
    open: false,
    title:'',
    description: '',
    link:''
  }
  handleTextInput = e => this.setState({[e.target.dataset.type]: e.target.value})
  handleClose = () => this.setState({open: false})
  handleOpen = () => this.setState({open: true})
  handleUpload = () => {
    const {title, description, link} = this.state
    const {dispatch, orderValues} = this.props
    const nextPostValue = findSmallestInteger(this.props.orderValues)
    if(title.length && description.length && link.length) {
      uploadPost(dispatch, title, description, link, nextPostValue)
      this.handleClose()
    }
  }
  render() {
    return (
      <Fragment>
        <NewPostModal
          handleClose={this.handleClose}
          state={this.state}
          handleTextInput={this.handleTextInput}
          handleUpload={this.handleUpload}
        />
        <div className='NewPost'>
          <div>
            <p>Create a new post to appear on the home page</p>
          </div>
          <div className='button' onClick={this.handleOpen}>
            Create New Post
          </div>
        </div>
      </Fragment>
    )
  }
}

export default connect(state => ({
  orderValues: state.data.posts.map(post => post.order)
}))(NewPost)
