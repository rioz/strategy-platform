import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {DeleteModal, EditModal} from './Modals'
import ListItem from './ListItem'
import {deletePost, toggleDisplayPost, updateOrder, editPost} from 'store/modules/actions'

class Posts extends Component {
  state = {
    deleteOpen: false,
    editOpen: false,
    focusedPost: {}
  }

  handleDelete = (id) => () => {
    deletePost(this.props.dispatch, id)
    this.closeDelete()
  }
  handleEdit = (oldPost, newPost) => () => {
    editPost(this.props.dispatch, oldPost, newPost)
    this.closeEdit()
  }
  openDelete = (item) => () => {
    this.setState({
      deleteOpen: true,
      focusedPost: item
    })
  }
  openEdit = (item) => () => {
    this.setState({
      editOpen: true,
      focusedPost: item
    })
  }
  closeDelete = () => this.setState({deleteOpen: false})
  closeEdit = () => this.setState({editOpen: false})
  toggleDisplayPost = (item) => () => toggleDisplayPost(item)
  updateOrder = (value, item) => () => updateOrder(this.props.dispatch, value, item)

  render() {
  const {posts} = this.props
  const {deleteOpen,focusedPost,editOpen} = this.state
    return (
      <Fragment>
        <DeleteModal
          focusedPost={focusedPost}
          deleteOpen={deleteOpen}
          closeDelete={this.closeDelete}
          handleDelete={this.handleDelete}
        />
        <EditModal
          focusedPost={focusedPost}
          editOpen={editOpen}
          closeEdit={this.closeEdit}
          handleEdit={this.handleEdit}
        />
        <div className='Posts'>
          <ul>
            <li className='headings'>
              <h3 className='date'>Date</h3>
              <h3 className='posts'>Current Posts</h3>
              <h3 className='display'>Display</h3>
            </li>
            {
              posts.sort((a, b) => a.order - b.order).map((item, i) =>
                <ListItem
                  key={item.title + i}
                  item={item}
                  openDelete={this.openDelete}
                  openEdit={this.openEdit}
                  toggleDisplayPost={this.toggleDisplayPost}
                  updateOrder={this.updateOrder}
                />
              )
            }
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default connect(state => ({
  posts: state.data.posts
}))(Posts)
