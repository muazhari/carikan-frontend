import { call, put } from 'redux-saga/effects'
import firebase from 'firebase'
import AuthActions from '../Redux/AuthRedux'

// attempts to signup
export function* getRegister(fbdAPI, { email, password, resolve, reject }) {
  try {
    const auth = firebase.auth()

    // check registered auth provider.
    const provider = yield call([auth, auth.fetchSignInMethodsForEmail], email)
    // try signin with 'email' provider if doesn't linked yet
    if (provider.includes('google.com')) {
      throw new Error('You are registered from Google, try reset password to change it')
    }

    if (provider.length === 0 || provider.includes('password')) {
      const result = yield call([auth, auth.createUserWithEmailAndPassword], email, password)

      // return true if user hasn't been set their username for the first time.
      const isNewUser = yield call(fbdAPI.readProfile, auth.currentUser.uid, 'isNewUser')

      // route back user hasn't been set a username, based on isNewUser profile property.
      if (isNewUser) {
        yield call(resolve, { isNewUser: true })
      } else {
        // doing database works, pushing important & profile data.
        yield call(fbdAPI.newProfilePush, auth)

        yield put({ type: 'AUTH_SUCCESS' })
      }

      yield put(AuthActions.registerSuccess(result.user))

      console.tron.log(`Firebase signup success. ${result.email}`)
    }
  } catch (err) {
    const error = { code: err.code, message: err.message }
    // yield call([auth, auth.currentUser.delete])
    yield put(AuthActions.registerFailure(error))
    yield call(reject)

    console.tron.log(`Firebase signup failed. ${error.message}`)
  }
}
