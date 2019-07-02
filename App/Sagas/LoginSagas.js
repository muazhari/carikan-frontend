import { call, put } from 'redux-saga/effects'
import firebase from 'firebase'
import AuthActions from '../Redux/AuthRedux'
// import { getAuthed } from './AuthedSagas'

// attempts to signin
export function* getLogin({ username, password }) {
  try {
    const auth = firebase.auth()
    // check registered auth provider.
    const provider = yield call([auth, auth.fetchSignInMethodsForEmail], username)
    // try signin with 'email' provider if doesn't linked yet
    if (provider.includes('google.com')) {
      throw new Error('You are registered from Google, try reset password to change it')
    }

    if (provider.length > 0 || provider.includes('password')) {
      const result = yield call([auth, auth.signInWithEmailAndPassword], username, password)
      yield put(AuthActions.loginSuccess(result.user))
      // yield call(getAuthed)

      console.tron.log(`Firebase signin success. ${result.user.email}`)
    }
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(AuthActions.loginFailure(error))

    console.tron.log(`Firebase signin failed. ${error.message}`)
  }
}
