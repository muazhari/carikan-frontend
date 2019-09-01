import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { omit } from 'ramda'

export default class FireBaseConfig {
  constructor () {
    this.config = {
      apiKey: 'AIzaSyCOOvVYGJB8mgubJY-jlF3BvZObiBBGDow',
      authDomain: 'carikan-id.firebaseapp.com',
      databaseURL: 'https://carikan-id.firebaseio.com',
      projectId: 'carikan-id',
      storageBucket: '',
      messagingSenderId: '451228539081',
      appId: '1:451228539081:web:3dae049820c64cd6',
      webClientId: '451228539081-plhf3g146u93esgus0ilb18qd6e9d3kh.apps.googleusercontent.com'
    }
  }

  startConfigure = () => {
    this.initFirebaseApp()
    this.configureGoogleSignIn()
  }

  configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: this.config.webClientId,
      offlineAccess: false
    })
  }

  initFirebaseApp = () => {
    firebase.initializeApp(omit('webClientId', this.config))
  }
}
