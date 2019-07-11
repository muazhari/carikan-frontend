import { call, put } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { sha256 } from 'react-native-sha256'
import { generateSecureRandom } from 'react-native-securerandom'
import AuthActions from '../Redux/AuthRedux'

const generateSecurePassword = b => {
  return generateSecureRandom(b).then(randomBytes => {
    return sha256(Object.values(randomBytes).join('')).then(hash => {
      return hash
    })
  })
}

// attempts to google register
export function* getGoogleRegister(fbaAPI, fbdAPI) {
  try {
    yield call(GoogleSignin.hasPlayServices, {
      autoResolve: true,
      showPlayServicesUpdateDialog: true,
    })

    const auth = firebase.auth()
    const authGoogleResult = yield call(GoogleSignin.signIn)
    // anonymus credential
    let result = yield call(fbaAPI.currentUser)

    // check registered auth provider.
    const provider = yield call(
      [auth, auth.fetchSignInMethodsForEmail],
      authGoogleResult.user.email
    )

    // try signin with 'google.com' provider
    if (provider.includes('google.com')) {
      result = yield call(
        fbaAPI.signInWithGoogle,
        authGoogleResult.idToken,
        authGoogleResult.accessToken
      )
      yield put(AuthActions.loginSuccess(result.user))
      console.tron.log(`Firebase signin success. ${result.user.email}`)
    } else {
      result = yield call(fbaAPI.authNewGoogleUser, {
        email: authGoogleResult.user.email,
        idToken: authGoogleResult.idToken,
        accessToken: authGoogleResult.accessToken,
      })
      // doing database works, pushing important & profile data.
      yield call(fbdAPI.newProfilePush, result.user)
      yield put(AuthActions.registerSuccess(result.user))
      console.tron.log(`Firebase register success. ${result.user.email}`)
    }

    yield put({ type: 'AUTH_SUCCESS' })
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(AuthActions.registerFailure(error))

    console.tron.log(`Firebase register failed. ${err}`)
  }
}
