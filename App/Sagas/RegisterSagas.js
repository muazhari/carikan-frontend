import { call, put } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import AuthActions from '../Redux/AuthRedux'

// attempts to signup
export function* getRegister(authfbAPI, authdbAPI, { email, password }) {
  try {
    const auth = firebase.auth()
    // anonymus credential
    let result = yield call(authfbAPI.currentUser)
    // check registered auth provider.
    const provider = yield call([auth, auth.fetchSignInMethodsForEmail], email)

    // try signin with 'email' provider if doesn't linked yet
    if (provider.includes('password')) {
      result = yield call(authfbAPI.signInWithEmail, email, password)

      yield put(AuthActions.loginSuccess(result.user))
      console.tron.log(`Firebase signin success. ${result.user.email}`)
    } else {
      result = yield call(authfbAPI.linkWithEmail, email, password)
      // doing database works, pushing important & profile data.

      yield call(authdbAPI.newProfilePush, result.user)

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
