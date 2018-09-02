import {RECEIVE_POSTS, SUCCESSFUL_LOGIN, SUCCESSFUL_LOGIN_READER, SUCCESSFUL_LOGOUT, FAILED_LOGIN} from './actions'

const initialState = {
  posts: [],
  user: null,
  loggedInAdmin: false,
  loggedInReader: false,
  errorMessage: null,
  error: false
}


export default (state=initialState, action) => {
  switch(action.type){
    case RECEIVE_POSTS: {
      return {
        ...state,
        posts: action.payload
      }
    }
    case SUCCESSFUL_LOGIN: {
      return {
        ...state,
        error: false,
        errorMessage: null,
        loggedInAdmin: true,
        loggedInReader: false,
        user: action.payload
      }
    }
    case SUCCESSFUL_LOGIN_READER: {
      return {
        ...state,
        error: false,
        errorMessage: null,
        loggedInReader: true,
        loggedInAdmin: false,
        user: action.payload
      }
    }
    case SUCCESSFUL_LOGOUT: {
      return {
        ...state,
        loggedInAdmin: false,
        user: null
      }
    }
    case FAILED_LOGIN: {
      return {
        ...state,
        error: true,
        errorMessage: 'Failed log in - Your details are incorrect',
      }
    }
    default: return state
  }
}
