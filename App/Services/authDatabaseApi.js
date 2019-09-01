import firebase from 'react-native-firebase'
import R from 'ramda'
import { sha256 } from 'react-native-sha256'
import apisauce from 'apisauce'

const api = apisauce.create({
  baseURL: 'http://192.168.43.208:8080/',
  headers: {
    'Cache-Control': 'no-cache',
  },
  // 10 second timeout...
  timeout: 10000,
})

const pickAndValidate = (pickKeys, data) => {
  const selected = {}
  pickKeys.forEach(keyItem => {
    // validate
    if (data[keyItem]) {
      selected[keyItem] = data[keyItem]
    }
  })
  return selected
}

const claimUsername = data => {
  // { uid: String, username: String }
  return new Promise((resolve, reject) => {
    return api
      .put('/user', data)
      .then(res => resolve(res))
      .catch(err => {
        console.tron.log('claimUsername Error', err)
        return reject(err)
      })
  })
}

const claimProfile = profile => {
  // { uid: String, username: String, email: String, displayName: String, phoneNumber: String, photoURL: String }
  return new Promise((resolve, reject) => {
    return api
      .post('/user', profile)
      .then(res => resolve(res))
      .catch(err => {
        console.tron.log('claimProfile Error', err)
        return reject(err)
      })
  })
}

const createUser = profile => {
  return new Promise((resolve, reject) => {
    return Promise.all([claimProfile(profile)])
      .then(res => resolve(res))
      .catch(err => {
        console.tron.log('createUser Error', err)
        return reject({ code: 'user/taken', message: 'User registered' })
      })
  })
}

// our "constructor"
const create = () => {
  const readProfile = data => {
    return new Promise((resolve, reject) => {
      return api
        .get('/user', data)
        .then(res => {
          return resolve(res)
        })
        .catch(err => {
          return reject(err)
        })
    })
  }

  // push basic properties from auth credential
  // with check if unregistered by existing data in firebase database.
  const newProfilePush = user => {
    return new Promise(async (resolve, reject) => {
      const profile = pickAndValidate(
        ['uid', 'email', 'displayName', 'phoneNumber', 'photoURL'],
        user
      )

      console.tron.log('PROFILE CURRENTUSER', user)
      console.tron.log('PROFILE PICKED', profile)

      return createUser(profile)
        .then(res => resolve(res))
        .catch(err => {
          return reject(err)
        })
    })
  }

  // set/update profile username to firebase database.
  const setProfileUsername = (auth, username) => {
    return new Promise((resolve, reject) => {
      console.tron.log('PROFILE CURRENT_USER', auth.currentUser)

      const data = { uid: auth.currentUser.uid, username }

      return claimUsername(data)
        .then(res => resolve(res))
        .catch(err => {
          return reject(err)
        })
    })
  }

  return {
    // a list of the API functions
    newProfilePush,
    setProfileUsername,
    readProfile,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
