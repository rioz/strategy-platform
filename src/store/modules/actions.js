import {database, auth} from '../firebase-init'
import firebase from 'firebase'

// Action types

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SUCCESSFUL_UPLOAD = 'SUCCESSFUL_UPLOAD'
export const FAILED_UPLOAD = 'FAILED_UPLOAD'
export const DELETE_POST = 'DELETE_POST'
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN'
export const SUCCESSFUL_LOGOUT = 'SUCCESSFUL_LOGOUT'
export const FAILED_LOGIN = 'FAILED_LOGIN'

// Action creators

export const postNotification = (title, body, link) => {
  auth.currentUser.getIdToken(true).then(idToken => {
    fetch(`https://us-central1-unipro-innovation-platform.cloudfunctions.net/notification/postNotification`,
      {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + idToken
        },
        body:"title=" + title + "&body=" + body + "&link=" + link + "&icon=https://unipro-innovation-platform.firebaseapp.com/assets/unipro-favicon-small.png"
      })
      .then(res => res.json())
      .catch(error => console.log("Error with posting notification : ",error))
  }).catch((error) => console.log('error getting Firebase id token: ',error ))
}

export const uploadPost = (dispatch, title, description, link) => {
  const id = database.ref().child('posts').push().key
  const updates = {};
  updates['/posts/' + id] = {
    title, description, link, id,
    display: true,
    date: new Date().toString().slice(4,15)
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

export const logIn = (dispatch, email, password) => {
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() =>
  auth.signInWithEmailAndPassword(email, password)).catch(error => {
    dispatch({
      type: FAILED_LOGIN
    })
  })

  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: user
      })
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
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

export const logOut = () => {
  auth.signOut()
}
