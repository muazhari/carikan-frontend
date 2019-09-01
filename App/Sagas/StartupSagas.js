import { put, select, take, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { is } from 'ramda'

import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native'
import firebaseTimerFixes from '../Services/firebaseTimerFixes'
import FireBaseConfig from '../Config/FirebaseConfig'

// import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import AuthActions from '../Redux/AuthRedux'
import PostActions from '../Redux/PostRedux'
import AppStateActions from '../Redux/AppStateRedux'

// exported to make available for tests
// export const { selectAvatar } = GithubSelectors

// Firbase authState checker
function getAuthChannel() {
  if (!this.authChannel) {
    this.authChannel = eventChannel(emit => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => emit({ user }))
      return unsubscribe
    })
  }
  return this.authChannel
}

// process STARTUP actions
export function* startup() {
  if (__DEV__ && console.tron) {
    console.tron.onCustomCommand('Clear Redux-Persist AsyncStorage', async () => {
      await AsyncStorage.clear()
      console.tron.log('async storage cleared.')
    })
  }

  try {
    const initFireBase = new FireBaseConfig()
    yield call(initFireBase.configureGoogleSignIn)

    const channel = yield call(getAuthChannel)
    let result = yield take(channel)

    if (!result.user) {
      const auth = firebase.auth()
      result = yield call([auth, auth.signInAnonymously])
    }

    if (result.user.isAnonymous) {
      yield put({ type: 'AUTH_ANONYMOUS' })
    } else {
      yield put(AuthActions.autoLogin(result.user))
    }

    yield call(firebaseTimerFixes.init)
    yield put(PostActions.postReadRequest())
    yield put(AppStateActions.setRehydrationComplete())
    console.tron.log('✨ Firebase connected. ✨')
  } catch (err) {
    yield put(AppStateActions.setRehydrationStatus(err))
    console.tron.log(`Firebase error. ${err}`)
  }

  // const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  // if (!is(String, avatar)) {
  //   yield put(GithubActions.userRequest('muazhari'))
  // }
}
