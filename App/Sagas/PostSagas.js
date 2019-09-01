/* eslint-disable require-yield */
import { call, put, select, take } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import PostActions, { PostSelectors } from '../Redux/PostRedux'
import AuthActions, { AuthSelectors } from '../Redux/AuthRedux'

export const { selectPosts } = PostSelectors
export const { selectIsLoggedIn, selectGetCredential } = AuthSelectors

// attempts to signin
function* createPost(upostApi, { text }) {
  const { uid } = yield select(selectGetCredential)
  try {
    console.tron.log({ uid, text })
    const result = yield call(upostApi.createPost, { uid, text })
    yield put(PostActions.postCreateSuccess())
    // refreshing
    yield put(PostActions.postReadRequest())
    console.tron.log('✨ createPost success ✨', result)
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(PostActions.postCreateFailure())
    console.tron.log('createPost failed', error)
  }
}

function* readPost(upostApi, { id }) {
  // postId / uid

  try {
    const toFind = id ? { id } : {}
    const result = yield call(upostApi.readPost, toFind)
    yield put(PostActions.postReadSuccess(result.data))
    console.tron.log('✨ readPost success ✨', result)
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(PostActions.postReadFailure())
    console.tron.log('readPost failed', error)
  }
}

function* updatePost(upostApi, { postId, text }) {
  const { uid } = yield select(selectGetCredential)
  try {
    const result = yield call(upostApi.updatePost, { uid, postId, text })
    yield put(PostActions.postUpdateSuccess())
    // refreshing
    yield put(PostActions.postReadRequest())
    console.tron.log('✨ updatePost success ✨', result)
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(PostActions.postUpdateFailure())
    console.tron.log(`updatePost failed. ${JSON.stringify(error)}`)
  }
}

function* deletePost(upostApi, { postId }) {
  const { uid } = yield select(selectGetCredential)
  try {
    const result = yield call(upostApi.deletePost, { uid, postId })
    yield put(PostActions.postDeleteSuccess())
    // refreshing
    yield put(PostActions.postReadRequest())
    console.tron.log('✨ deletePost success ✨', result)
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(PostActions.postDeleteFailure())
    console.tron.log(`deletePost failed. ${JSON.stringify(error)}`)
  }
}

export { createPost, readPost, updatePost, deletePost }
