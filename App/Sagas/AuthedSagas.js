import { call, put, select, take } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import AuthActions, { AuthSelectors } from '../Redux/AuthRedux'

export const { selectIsLoggedIn, selectGetCredential } = AuthSelectors

// attempts to signin
export function* getAuthed() {
  const isLoggedIn = yield select(selectIsLoggedIn)
  const authCredential = yield select(selectGetCredential)

  try {
    if (isLoggedIn) {
      yield put({ type: 'AUTH_SUCCESS' })
      console.tron.log(`authCredential.email ✨${authCredential.email}. ✨`)
    } else {
      yield put({ type: 'AUTH_NULL' })
    }
  } catch (err) {
    const error = { code: err.code, message: err.message }
    console.tron.log(`authCredential.email failed. ${error}`)
  }
}
