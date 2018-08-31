import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {NotificationModal, DeleteModal} from './Modals'
import ListItem from './ListItem'
import {deletePost, toggleDisplayPost, postNotification} from 'store/modules/actions'

class Posts extends Component {
  state = {
    deleteOpen: false,
    notificationOpen: false,
    focusedPost: {}
  }

  openNotification = (item) => () => {
    this.setState({
    notificationOpen: true,
    focusedPost: item })
  }
  closeNotification = () => this.setState({notificationOpen: false})

  handleDelete = (id) => () => {
    deletePost(this.props.dispatch, id)
    this.closeDelete()
  }
  openDelete = (item) => () => {
    this.setState({
      deleteOpen: true,
      focusedPost: item
    })
  }
  closeDelete = () => this.setState({deleteOpen: false})
  toggleDisplayPost = (item) => () => {
    toggleDisplayPost(item)
  }

  render() {
  const {posts} = this.props
  const {deleteOpen,notificationOpen,focusedPost} = this.state
    return (
      <Fragment>
        <DeleteModal
          focusedPost={focusedPost}
          deleteOpen={deleteOpen}
          closeDelete={this.closeDelete}
          handleDelete={this.handleDelete}
        />
        {
          notificationOpen?
          <NotificationModal
            focusedPost={focusedPost}
            notificationOpen={notificationOpen}
            closeNotification={this.closeNotification}
          />:null
        }
        <div className='Posts'>
          <ul>
            <li className='headings'>
              <h3 className='date'>Date</h3>
              <h3 className='posts'>Current Posts</h3>
              <h3 className='display'>Display</h3>
              <h3 className='notifications'>Notifications</h3>
            </li>
            {
              posts.map((item, i) =>
                <ListItem
                  key={item.title + i}
                  item={item}
                  openNotification={this.openNotification}
                  openDelete={this.openDelete}
                  toggleDisplayPost={this.toggleDisplayPost}
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
  posts: state.data.posts,
}))(Posts)
