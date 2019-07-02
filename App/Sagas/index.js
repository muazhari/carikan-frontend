import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FBD_API from '../Services/firebaseDatabaseApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'

import { AuthTypes } from '../Redux/AuthRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'

import { getGoogleLogin } from './GoogleLoginSagas'
import { getGoogleRegister } from './GoogleRegisterSagas'

import { getLogin } from './LoginSagas'
import { getRegister } from './RegisterSagas'
import { getLogout } from './LogoutSagas'

import { getAuthed } from './AuthedSagas'

// import { setUsername } from './ProfileSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const fbdAPI = FBD_API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(AuthTypes.GOOGLE_LOGIN_REQUEST, getGoogleLogin),
    takeLatest(AuthTypes.GOOGLE_REGISTER_REQUEST, getGoogleRegister, fbdAPI),

    takeLatest(AuthTypes.LOGIN_REQUEST, getLogin),
    takeLatest(AuthTypes.REGISTER_REQUEST, getRegister, fbdAPI),
    takeLatest(AuthTypes.LOGOUT_REQUEST, getLogout),

    takeLatest(AuthTypes.LOGIN_SUCCESS, getAuthed),
    // takeLatest(AuthTypes.REGISTER_SUCCESS, getAuthed),
    takeLatest(AuthTypes.AUTO_LOGIN, getAuthed),

    // takeLatest(AuthTypes.REQUEST_PROFILE_SETUSERNAME, setUsername, fbdAPI),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
  ])
}
