import { call, put, select } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { AsyncStorage } from 'react-native'
import AuthActions, { AuthSelectors } from '../Redux/AuthRedux'

export const { selectIsLoggedIn } = AuthSelectors

// attempts to logout
export function* getLogout() {
  const isGoogleSignedIn = yield call(GoogleSignin.isSignedIn)
  const isLoggedIn = yield select(selectIsLoggedIn)

  try {
    if (isLoggedIn) {
      const auth = firebase.auth()
      yield call([auth, auth.signOut])

      if (isGoogleSignedIn) {
        yield call(GoogleSignin.revokeAccess)
        yield call(GoogleSignin.signOut)
      }

      yield call(AsyncStorage.clear)
      const result = yield call([auth, auth.signInAnonymously])
      yield put(AuthActions.logoutSuccess(result.user))

      console.tron.log('Firebase logout success.')
    }
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(AuthActions.loginFailure(error))

    console.tron.log(`Firebase logout failed. ${error.message}`)
  }
}
