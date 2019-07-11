import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  googleLoginRequest: null,
  googleRegisterRequest: ['resolve', 'reject'],
  loginRequest: ['email', 'password'],
  loginSuccess: ['credential'],
  loginFailure: ['error'],
  registerRequest: ['email', 'password', 'resolve', 'reject'],
  registerSuccess: ['credential'],
  registerFailure: ['error'],
  logoutRequest: null,
  logoutSuccess: ['credential'],
  logoutFailure: ['error'],
  autoLogin: ['credential'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  credential: null,
  error: null,
  fetching: false,
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = state => {
  return { ...state, fetching: true }
}

// we've successfully logged in
export const success = (state, { credential }) => {
  return { ...state, fetching: false, error: null, credential }
}

// we've had a problem logging in
export const failure = (state, { error }) => {
  return { ...state, fetching: false, error }
}

// we've logged out
export const logoutSuccess = (state, { credential }) => {
  return { ...INITIAL_STATE, credential }
}

// startup saga invoked autoLogin
export const autoLogin = (state, { credential }) => {
  return { ...state, credential }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  //--------------------------------------------------
  [Types.GOOGLE_LOGIN_REQUEST]: request,
  [Types.GOOGLE_REGISTER_REQUEST]: request,
  //--------------------------------------------------
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  //--------------------------------------------------
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
  //--------------------------------------------------
  [Types.LOGOUT_REQUEST]: request,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: failure,
  //--------------------------------------------------
  [Types.AUTO_LOGIN]: autoLogin,
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  // Is the current user logged in?
  selectIsLoggedIn: state => !!state.auth.credential,
  selectGetCredential: state => state.auth.credential,
}
