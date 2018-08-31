import React, {Component, Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';

export default ({state, handleClose, handleTextInput, handleUpload}) =>
  <Dialog
    open={state.open}
    onClose={handleClose}
    >
    <div className='modal'>
      <div>Title</div>
      <input onChange={handleTextInput} value={state.title} data-type='title' type="text"/>
      <div>Description</div>
      <input onChange={handleTextInput} value={state.description} data-type='description' type="text"/>
      <div>Link</div>
      <input onChange={handleTextInput} value={state.link} data-type='link' type="text"/>
      <div className='upload-post'>
        <div
          className={ state.description.length && state.link.length && state.title.length?
            'button bright' : 'button error' }
          onClick={handleUpload}>Upload Post</div>
      </div>
    </div>
  </Dialog>
