import firebase from 'react-native-firebase'
import R from 'ramda'
import { sha256 } from 'react-native-sha256'
import { GoogleSignin } from 'react-native-google-signin'
import { generateSecureRandom } from 'react-native-securerandom'

const escapeEmail = email => {
  return email.replace('.', ',')
}

const generateSecurePassword = b => {
  return generateSecureRandom(b).then(randomBytes => {
    return sha256(Object.values(randomBytes).join('')).then(hash => {
      return hash
    })
  })
}

const pickAndValidate = (pickKeys: Object, user: Object) => {
  const selected = {}
  const validate = keyItem => {
    // pick with assert
    if (pickKeys.includes(keyItem)) {
      // validate
      if (user[keyItem] === null || user[keyItem] === undefined) {
        selected[keyItem] = 0
      } else if (keyItem === 'email') {
        selected[keyItem] = escapeEmail(user[keyItem])
      } else {
        selected[keyItem] = user[keyItem]
      }
    }
  }
  Object.keys(user).map(validate)

  return selected
}

// our "constructor"
const create = () => {
  const updateProfile = profile => {
    return new Promise(async (resolve, reject) => {
      firebase
        .auth()
        .currentUser.updateProfile(profile)
        .then(() => {
          return resolve()
        })
        .catch(err => {
          return reject(err)
        })
    })
  }

  const linkWithCredential = credential => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await firebase.auth().currentUser.linkWithCredential(credential)

        const newCredential = result.user.providerData[0]
        console.tron.log('NEWCREDENTIAL', newCredential)
        await updateProfile({
          displayName: newCredential.displayName,
          phoneNumber: newCredential.phoneNumber,
          photoURL: newCredential.photoURL,
        })

        return resolve(result)
      } catch (err) {
        return reject(err)
      }
    })
  }

  const currentUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await firebase.auth().currentUser)
      } catch (err) {
        return reject(err)
      }
    })
  }

  const linkWithGoogle = (idToken, accessToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        // setting up 'google.com' provider credential to be used.
        const googleCredential = await firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        )
        const result = await linkWithCredential(googleCredential)

        return resolve(result)
      } catch (err) {
        return reject(err)
      }
    })
  }

  const linkWithEmail = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        // setting up 'email' provider credential to be used.
        const emailCredential = await firebase.auth.EmailAuthProvider.credential(email, password)

        const result = await linkWithCredential(emailCredential)
        return resolve(result)
      } catch (err) {
        return reject(err)
      }
    })
  }

  const signInWithCredential = credential => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await firebase.auth().signInWithCredential(credential)

        const newCredential = result.user.providerData[result.user.providerData.length - 1]
        console.tron.log(newCredential)
        await updateProfile({
          displayName: newCredential.displayName,
          phoneNumber: newCredential.phoneNumber,
          photoURL: newCredential.photoURL,
        })

        return resolve(result)
      } catch (err) {
        return reject(err)
      }
    })
  }

  const signInWithGoogle = (idToken, accessToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        // setting up 'google.com' provider credential to be used.
        const googleCredential = await firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        )
        const result = await signInWithCredential(googleCredential)
        return resolve(result)
      } catch (err) {
        return reject(err)
      }
    })
  }

  const signInWithEmail = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        // setting up 'email' provider credential to be used.
        const emailCredential = await firebase.auth.EmailAuthProvider.credential(email, password)

        const result = await signInWithCredential(emailCredential)
        return resolve(result)
      } catch (err) {
        return reject(err)
      }
    })
  }

  const authNewGoogleUser = ({ email, idToken, accessToken }) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.tron.log({ email, idToken, accessToken })
        const auth = firebase.auth()
        let result = await auth.currentUser

        // check registered auth provider.
        const provider = await auth.fetchSignInMethodsForEmail(email)

        // try signin/link with 'google.com' provider
        if (!provider.includes('google.com')) {
          result = await linkWithGoogle(idToken, accessToken)
        }

        // try linking with 'email' provider if doesn't linked yet
        if (!provider.includes('password')) {
          const securePassword = await generateSecurePassword(48)
          result = await linkWithEmail(email, securePassword)
        }

        return resolve(result)
      } catch (err) {
        return reject(err)
      }
    })
  }

  return {
    // a list of the API functions
    linkWithCredential,
    currentUser,
    linkWithGoogle,
    linkWithEmail,
    updateProfile,
    signInWithGoogle,
    signInWithEmail,
    authNewGoogleUser,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
