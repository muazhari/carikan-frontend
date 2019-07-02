import { put, select, take, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { is } from 'ramda'
import { AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'

import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import LoggedInActions from '../Redux/AuthRedux'
import AppStateActions from '../Redux/AppStateRedux'

// exported to make available for tests
export const { selectAvatar } = GithubSelectors

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
  // if (__DEV__ && console.tron) {
  //   console.tron.onCustomCommand('Clear Redux-Persist AsyncStorage', async (payload: string) => {
  //     await AsyncStorage.clear()
  //     console.tron.log('async storage cleared.')
  //   })
  // }
  //
  try {
    const channel = yield call(getAuthChannel)
    const result = yield take(channel)

    if (result.user) {
      yield put(LoggedInActions.autoLogin(result.user))
    } else {
      yield put({ type: 'AUTH_NULL' })
    }

    yield put(AppStateActions.setRehydrationComplete())
    console.tron.log('✨ Firebase connected. ✨')
  } catch {
    yield put(AppStateActions.setRehydrationStatus(error))
    console.tron.log(`Firebase error. ${{ error }}`)
  }

  const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('muazhari'))
  }
}
