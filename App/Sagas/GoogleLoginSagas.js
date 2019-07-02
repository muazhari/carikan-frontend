import { call, put } from 'redux-saga/effects'
import firebase from 'firebase'
import { GoogleSignin } from 'react-native-google-signin'
import AuthActions from '../Redux/AuthRedux'

// attempts to google signin
export function* getGoogleLogin() {
  try {
    yield call(GoogleSignin.hasPlayServices, {
      autoResolve: true,
      showPlayServicesUpdateDialog: true,
    })

    try {
      const authGoogleResult = yield call(GoogleSignin.signIn)

      const credential = yield call(
        firebase.auth.GoogleAuthProvider.credential,
        authGoogleResult.idToken,
        authGoogleResult.accessToken
      )

      const auth = firebase.auth()
      const result = yield call([auth, auth.signInWithCredential], credential)
      yield put(AuthActions.loginSuccess(result.user))

      console.tron.log(`Firebase signin success. ${result.user.email}`)
    } catch (err) {
      const error = { code: err.code, message: err.message }
      yield put(AuthActions.loginFailure(error))

      console.tron.log(`Firebase signin failed. ${error.message}`)
    }
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(AuthActions.loginFailure(error))

    console.tron.log('Play services error', err.code, err.message)
  }
}
