import { call, put } from 'redux-saga/effects'
import firebase from 'firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { generateSecureRandom } from 'react-native-securerandom'
import { sha256 } from 'react-native-sha256'

import AuthActions from '../Redux/AuthRedux'

const generateSecurePassword = b => {
  return generateSecureRandom(b).then(randomBytes => {
    return sha256(Object.values(randomBytes).join('')).then(hash => {
      return hash
    })
  })
}

const linkWithEmail = emailCredential => {
  return new Promise(async (resolve, reject) => {
    firebase
      .auth()
      .currentUser.linkWithCredential(emailCredential)
      .then(result => {
        return resolve(result)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

// attempts to google register
export function* getGoogleRegister(fbdAPI, { resolve, reject }) {
  try {
    yield call(GoogleSignin.hasPlayServices, {
      autoResolve: true,
      showPlayServicesUpdateDialog: true,
    })

    try {
      const authGoogleResult = yield call(GoogleSignin.signIn)

      // setting up 'google.com' provider credential to be used.
      const googleCredential = yield call(
        firebase.auth.GoogleAuthProvider.credential,
        authGoogleResult.idToken,
        authGoogleResult.accessToken
      )

      const securePassword = yield call(generateSecurePassword, 48)

      // setting up 'email' provider credential to be used.
      const emailCredential = yield call(
        firebase.auth.EmailAuthProvider.credential,
        authGoogleResult.user.email,
        securePassword
      )

      const auth = firebase.auth()

      // try signin with 'google.com' provider
      let result = yield call([auth, auth.signInWithCredential], googleCredential)

      // check registered auth provider.
      const provider = yield call(
        [auth, auth.fetchSignInMethodsForEmail],
        authGoogleResult.user.email
      )

      // try signin with 'email' provider if doesn't linked yet
      if (!provider.includes('password')) {
        result = yield call(linkWithEmail, emailCredential)
      }

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
      console.tron.log(`Firebase register success. ${result.user.email}`)
    } catch (err) {
      const error = { code: err.code, message: err.message }
      yield put(AuthActions.registerFailure(error))
      yield put(AuthActions.logoutRequest())
      console.tron.log(`Firebase register failed. ${error.message}`)
    }
  } catch (err) {
    const error = { code: err.code, message: err.message }
    yield put(AuthActions.registerFailure(error))
    yield call(reject)

    console.tron.log('Play services error', err.code, err.message)
  }
}
