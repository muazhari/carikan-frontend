import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestSetUsername: null,
  SuccessSetUsername: ['username'],
  FailureSetUsername: ['error'],
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  profile: null,
  error: null,
  fetching: false,
})

/* ------------- Reducers ------------- */

// we're attempting to crud-ing
export const request = state => {
  return { ...state, fetching: true }
}

// we've had a problem crud-ing
export const failure = (state, { error }) => {
  return { ...state, fetching: false, error }
}

// truncate pf state
export const truncate = () => {
  return { ...INITIAL_STATE }
}

// credential cruds - create
export const create = (state, { properties }) => {
  return { ...state, fetching: false, error: null, profile: properties }
}

// credential cruds - update
export const update = (state, { properties }) => {
  Object.keys(state.profile).map(profileKey => {
    if (Object.keys(properties).includes(profileKey)) {
      state.profile[profileKey] = properties[profileKey]
    }
  })
  return { ...state, fetching: false, error: null }
}

// credential cruds - update
export const del = (state, propertiesKeys: Object) => {
  Object.keys(state.profile).map(profileKey => {
    if (propertiesKeys.includes(profileKey)) {
      delete state.profile[profileKey]
    }
  })
  return { ...state, fetching: false, error: null }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_PROFILE_SETUSERNAME]: request,
  [Types.SUCCESS_PROFILE_SETUSERNAME]: create,
  [Types.FAILURE_PROFILE_SETUSERNAME]: failure,
  //--------------------------------------------------
})

/* ------------- Selectors ------------- */

export const ProfileSelectors = {
  // credential cruds - read
  selectGetProfile: state => state.pf.profile,
}
