import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {deletePost} from 'store/modules/actions'

export default ({focusedPost, closeDelete, handleDelete, deleteOpen}) =>
  <Dialog
    open={deleteOpen}
    onClose={closeDelete}
    >
    <div className='modal delete'>
      <h4>Are you sure you want to delete this post permanently?</h4>

      <div className='display-post'>
        <h3 className='date' >{focusedPost.date}</h3>
        <h3>{focusedPost.title}</h3>
        <div>{focusedPost.description}</div>
        <div>{focusedPost.link}</div>
      </div>

      <div className='upload-post'>
        <div className='button bright' onClick={handleDelete(focusedPost.id)}>Confirm Delete</div>
      </div>
    </div>
  </Dialog>
