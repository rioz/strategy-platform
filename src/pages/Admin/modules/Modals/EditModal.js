import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';


export default class Posts extends Component {

  state = {
    title: '',
    description: '',
    link: ''
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      title: nextProps.focusedPost.title,
      description: nextProps.focusedPost.description,
      link: nextProps.focusedPost.link,
    })
  }
  handleInput = (e) => this.setState({[e.target.dataset.type]: e.target.value})

  render() {
    const { focusedPost, editOpen, handleEdit, closeEdit } = this.props
    const { title, link, description} = this.state
    return (
      <Dialog
        open={editOpen}
        onClose={closeEdit}
        >
          <div className='modal edit'>
            <h4>Edit this post</h4>

            <div className='display-post'>
              <h3 className='date' >{focusedPost.date}</h3>

              <div>Title</div>
              <input onChange={this.handleInput} value={title} data-type='title' type="text"/>

              <div>Description</div>
              <textarea onChange={this.handleInput}
                style={{minHeight: '150px'}} value={description} data-type='description'/>

              <div>Link</div>
              <input onChange={this.handleInput} value={link} data-type='link' type="text"/>
            </div>

            <div className='upload-post'>
              <div className='button bright' onClick={handleEdit(focusedPost, this.state)}>Update</div>
            </div>
          </div>
        </Dialog>
    )
  }
}
