import { takeLatest, all } from 'redux-saga/effects'
import githubAPI from '../Services/githubApi'
import authDatabaseApi from '../Services/authDatabaseApi'
import authFirebaseApi from '../Services/authFirebaseApi'
import userPostApi from '../Services/userPostApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'

import { AuthTypes } from '../Redux/AuthRedux'

import { PostTypes } from '../Redux/PostRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'

import { getGoogleLogin } from './GoogleLoginSagas'
import { getGoogleRegister } from './GoogleRegisterSagas'

import { getLogin } from './LoginSagas'
import { getRegister } from './RegisterSagas'
import { getLogout } from './LogoutSagas'

import { getAuth } from './AuthSagas'

import { createPost, readPost, updatePost, deletePost } from './PostSagas'

// import { setUsername } from './ProfileSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const ugithubAPI = DebugConfig.useFixtures ? FixtureAPI : githubAPI.create()
const authdbAPI = authDatabaseApi.create()
const authfbAPI = authFirebaseApi.create()

const upostAPI = userPostApi.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(AuthTypes.GOOGLE_LOGIN_REQUEST, getGoogleLogin, authfbAPI, authdbAPI),
    takeLatest(AuthTypes.GOOGLE_REGISTER_REQUEST, getGoogleRegister, authfbAPI, authdbAPI),

    takeLatest(AuthTypes.LOGIN_REQUEST, getLogin, authfbAPI, authdbAPI),
    takeLatest(AuthTypes.REGISTER_REQUEST, getRegister, authfbAPI, authdbAPI),
    takeLatest(AuthTypes.LOGOUT_REQUEST, getLogout),

    takeLatest(AuthTypes.LOGIN_SUCCESS, getAuth),
    takeLatest(AuthTypes.REGISTER_SUCCESS, getAuth),
    takeLatest(AuthTypes.AUTO_LOGIN, getAuth),

    takeLatest(PostTypes.POST_CREATE_REQUEST, createPost, upostAPI),
    takeLatest(PostTypes.POST_READ_REQUEST, readPost, upostAPI),
    takeLatest(PostTypes.POST_UPDATE_REQUEST, updatePost, upostAPI),
    takeLatest(PostTypes.POST_DELETE_REQUEST, deletePost, upostAPI),

    // takeLatest(AuthTypes.REQUEST_PROFILE_SETUSERNAME, setUsername, authdbAPI),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, ugithubAPI),
  ])
}
