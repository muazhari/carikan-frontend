import firebase from 'react-native-firebase'
import R from 'ramda'
import { sha256 } from 'react-native-sha256'

const escapeEmail = email => {
  return email.replace('.', ',')
}

const validateIsIn = (ref, data) => {
  return ref.child(data).once('value', snapshot => {
    return snapshot.exists()
  })
}

const profileRef = (uid: String) => {
  return firebase.database().ref(`users/${uid}/profile`)
}

const usernamesRef = (username: String) => {
  return firebase.database().ref(`usernames/${username}/profile`)
}

const pickAndValidate = (pickKeys: Object, user: Object) => {
  const selected = {}
  pickKeys.map(keyItem => {
    // validate
    if (user[keyItem] === null || user[keyItem] === undefined) {
      selected[keyItem] = ''
    } else if (keyItem === 'email') {
      selected[keyItem] = escapeEmail(user[keyItem])
    } else {
      selected[keyItem] = user[keyItem]
    }
  })
  return selected
}

const claimEmail = (uid, email) => {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`email_lookup/${escapeEmail(email)}`)
      .set(uid, err => {
        if (err) {
          console.tron.log('claimEmail', err)
          return reject({ code: 'taken/email', message: 'Email not available' })
        }
        return resolve()
      })
  })
}

const claimUsername = (uid, username) => {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`username_lookup/${username}`)
      .set(uid, err => {
        if (err) {
          console.tron.log('claimUsername', err)
          return reject({ code: 'taken/username', message: 'Username not available' })
        }
        return resolve()
      })
  })
}

const claimProfile = (uid, profile) => {
  return new Promise((resolve, reject) => {
    return profileRef(uid).set(profile, err => {
      if (err) {
        console.tron.log('claimProfile', err)
        return reject(err)
      }
      return resolve()
    })
  })
}

const createUser = async (uid, profile) => {
  return new Promise((resolve, reject) => {
    return Promise.all([
      claimEmail(uid, profile.email),
      claimUsername(uid, profile.username),
      claimProfile(uid, profile),
    ])
      .then(() => {
        return resolve()
      })
      .catch(err => {
        console.tron.log('createUser', err)
        return reject({ code: 'taken/user', message: 'User registered' })
      })
  })
}

// our "constructor"
const create = () => {
  const readProfile = (uid: String, key: String) => {
    return new Promise((resolve, reject) => {
      return profileRef(uid)
        .child(key)
        .once('value')
        .then(snapshot => {
          return resolve(snapshot.val())
        })
        .catch(err => {
          return reject(err)
        })
    })
  }

  // push basic properties from auth credential, and check if registered by existing data in firebase database.
  const newProfilePush = user => {
    return new Promise(async (resolve, reject) => {
      const profile = pickAndValidate(['displayName', 'email', 'phoneNumber', 'photoURL'], user)

      profile.isNewUser = true
      profile.username = await sha256(user.uid).then(hash => {
        return hash.substr(0, 15)
      })

      console.tron.log('PROFILE CURRENTUSER', user)
      console.tron.log('PROFILE PICKED', profile)

      return createUser(user.uid, profile)
        .then(() => {
          return resolve()
        })
        .catch(err => {
          return reject(err)
        })
    })
  }

  // set/update profile username to firebase database.
  const setProfileUsername = (auth, username: Object) => {
    return new Promise((resolve, reject) => {
      console.tron.log('PROFILE CURRENT_USER', auth.currentUser)

      claimUsername(auth.currentUser.uid, username).then(error =>
        error ? reject(error) : resolve()
      )
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
