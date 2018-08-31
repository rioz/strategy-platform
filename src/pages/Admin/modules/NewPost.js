import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import {uploadPost} from 'store/modules/actions'
import {NewPostModal} from './Modals'

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
    const {dispatch} = this.props
    if(title.length && description.length && link.length) {
      uploadPost(dispatch, title, description, link)
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

export default connect()(NewPost)
