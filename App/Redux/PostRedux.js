import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postCreateRequest: ['text'],
  postCreateSuccess: ['content'],
  postCreateFailure: null,
  postReadRequest: ['id'],
  postReadSuccess: ['contents'],
  postReadFailure: null,
  postUpdateRequest: ['postId', 'text'],
  postUpdateSuccess: ['content'],
  postUpdateFailure: null,
  postDeleteRequest: ['postId'],
  postDeleteSuccess: ['content'],
  postDeleteFailure: null,
})

export const PostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  contents: [],
  fetching: false,
  error: false,
})

/* ------------- Selectors ------------- */

export const PostSelectors = {
  selectPosts: state => state.post.contents,
}

/* ------------- Reducers ------------- */

// request the posts for a user
export const request = state => {
  return { ...state, fetching: true }
}

// successful user posts lookup
export const success = (state, { contents }) => {
  if (contents) {
    return { ...state, fetching: false, contents }
  }
  return { ...state, fetching: false }
}

// failed to get the posts
export const failure = state => {
  return { ...state, fetching: false, error: true }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_CREATE_REQUEST]: request,
  [Types.POST_CREATE_SUCCESS]: success,
  [Types.POST_CREATE_FAILURE]: failure,
  // --------------------------------------------------
  [Types.POST_READ_REQUEST]: request,
  [Types.POST_READ_SUCCESS]: success,
  [Types.POST_READ_FAILURE]: failure,
  // --------------------------------------------------
  [Types.POST_UPDATE_REQUEST]: request,
  [Types.POST_UPDATE_SUCCESS]: success,
  [Types.POST_UPDATE_FAILURE]: failure,
  // --------------------------------------------------
  [Types.POST_DELETE_REQUEST]: request,
  [Types.POST_DELETE_SUCCESS]: success,
  [Types.POST_DELETE_FAILURE]: failure,
  // --------------------------------------------------
})
