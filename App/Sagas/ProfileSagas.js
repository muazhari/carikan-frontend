import { call, put } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import ProfileActions from '../Redux/ProfileRedux'

// attempts to google register
export function* setUsername(authdbAPI, { username }) {
  try {
    const auth = firebase.auth()
    yield call(authdbAPI.claimUsername(auth.currentUser.uid, username))
    yield put(ProfileActions.successSetUsername({ username }))
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(ProfileActions.failureSetUsername(error))

    // console.tron.log('Play services error', err.code, err.message)
  }
}
