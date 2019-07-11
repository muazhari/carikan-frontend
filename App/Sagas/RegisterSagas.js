import { call, put } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import AuthActions from '../Redux/AuthRedux'

// attempts to signup
export function* getRegister(fbaAPI, fbdAPI, { email, password }) {
  try {
    const auth = firebase.auth()
    // anonymus credential
    let result = yield call(fbaAPI.currentUser)
    // check registered auth provider.
    const provider = yield call([auth, auth.fetchSignInMethodsForEmail], email)

    // try signin with 'email' provider if doesn't linked yet
    if (provider.includes('password')) {
      result = yield call(fbaAPI.signInWithEmail, email, password)

      yield put(AuthActions.loginSuccess(result.user))
      console.tron.log(`Firebase signin success. ${result.user.email}`)
    } else {
      result = yield call(fbaAPI.linkWithEmail, email, password)
      // doing database works, pushing important & profile data.

      yield call(fbdAPI.newProfilePush, result.user)

      yield put(AuthActions.registerSuccess(result.user))
      console.tron.log(`Firebase signup success. ${result.email}`)
    }

    yield put({ type: 'AUTH_SUCCESS' })
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(AuthActions.registerFailure(error))

    console.tron.log(`Firebase signup failed. ${err}`)
  }
}
