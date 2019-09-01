import { call, put } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import AuthActions from '../Redux/AuthRedux'

// attempts to google signin
export function* getGoogleLogin(authfbAPI, authdbAPI) {
  try {
    yield call(GoogleSignin.hasPlayServices, {
      autoResolve: true,
      showPlayServicesUpdateDialog: true,
    })

    const auth = firebase.auth()
    const authGoogleResult = yield call(GoogleSignin.signIn)

    // check registered auth provider.
    const provider = yield call(
      [auth, auth.fetchSignInMethodsForEmail],
      authGoogleResult.user.email
    )

    // anonymus credential
    let result = yield call(authfbAPI.currentUser)
    // try signin with 'google.com' provider
    if (provider.includes('google.com')) {
      result = yield call(
        authfbAPI.signInWithGoogle,
        authGoogleResult.idToken,
        authGoogleResult.accessToken
      )
      yield put(AuthActions.loginSuccess(result.user))
      console.tron.log(`Firebase signin success. ${result.user.email}`)
    } else {
      result = yield call(authfbAPI.authNewGoogleUser, {
        email: authGoogleResult.user.email,
        idToken: authGoogleResult.idToken,
        accessToken: authGoogleResult.accessToken,
      })
      // doing database works, pushing important & profile data
      yield call(authdbAPI.newProfilePush, result.user)
      yield put(AuthActions.registerSuccess(result.user))
      console.tron.log(`Firebase register success. ${result.user.email}`)
    }
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(AuthActions.loginFailure(error))

    console.tron.log(`Firebase signin failed. ${err}`)
  }
}
