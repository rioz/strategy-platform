import {database, auth} from '../firebase-init'
import firebase from 'firebase'

// Action types

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SUCCESSFUL_UPLOAD = 'SUCCESSFUL_UPLOAD'
export const FAILED_UPLOAD = 'FAILED_UPLOAD'
export const DELETE_POST = 'DELETE_POST'
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN'
export const SUCCESSFUL_LOGIN_READER = 'SUCCESSFUL_LOGIN_READER'
export const SUCCESSFUL_LOGOUT = 'SUCCESSFUL_LOGOUT'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const SUCCESSFUL_UPDATE = 'SUCCESSFUL_UPDATE'
export const FAILED_UPDATE = 'FAILED_UPDATE'
export const SUCCESSFUL_EDIT = 'SUCCESSFUL_EDIT'
export const FAILED_EDIT = 'FAILED_EDIT'

// Action creators

export const uploadPost = (dispatch, title, description, link, nextPostValue) => {
  const id = database.ref().child('posts').push().key
  const updates = {};
  updates['/posts/' + id] = {
    title, description, link, id,
    display: true,
    date: new Date().toString().slice(4,15),
    order: nextPostValue
  }
  database.ref().update(updates, (error) => {
    if(error) {
      dispatch({
        type: FAILED_UPLOAD
      })
    } else {
      dispatch({
        type: SUCCESSFUL_UPLOAD
      })
    }
  })
}

export const fetchPosts = (dispatch) => {
  database.ref('posts/').on('value', snapshot => {
    const posts =  snapshot.val()
    dispatch({
      type: RECEIVE_POSTS,
      payload: posts? Object.keys(posts).map(e => posts[e]) : []
    })
  })
}

export const updateOrder = (dispatch, value, item) => {
  const updates = {};
  updates['/posts/' + item.id] = {
    ...item,
    order: item.order + value? item.order + value : 1
  }
  database.ref().update(updates, (error) => {
    if(error) dispatch({ type: FAILED_UPDATE })
    else dispatch({ type: SUCCESSFUL_UPDATE })
  })
}

export const logIn = (dispatch, email, password) => {
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() =>
  auth.signInWithEmailAndPassword(email, password)).catch(error => {
    dispatch({
      type: FAILED_LOGIN
    })
  })

  auth.onAuthStateChanged(user => {
    if (user) {
      const uid = user.uid;
      database.ref('users/' + uid).on('value', snapshot => {
        const userRole =  snapshot.val().role
        if(userRole === 'reader') {
          dispatch({
            type: SUCCESSFUL_LOGIN_READER,
            payload: user
          })
        } else if (userRole === 'admin') {
          dispatch({
            type: SUCCESSFUL_LOGIN,
            payload: user
          })
        }
      })

    } else {
      dispatch({
        type: SUCCESSFUL_LOGOUT
      })
    }
  })
}

export const toggleDisplayPost = (item) => {
  database.ref().child('posts/' + item.id).update({
    display: !item.display
  })
}

export const deletePost = (dispatch, id) => {
  database.ref('posts/' + id).remove()
}

export const editPost = (dispatch, oldPost, newPost) => {
  const updates = {};
  updates['/posts/' + oldPost.id] = {
    ...oldPost,
    title: newPost.title,
    description: newPost.description,
    link: newPost.link
   }
  database.ref().update(updates, (error) => {
    if(error) dispatch({ type: FAILED_EDIT })
    else dispatch({ type: SUCCESSFUL_EDIT })
  })
}

export const logOut = () => {
  auth.signOut()
}
