import { createStackNavigator } from 'react-navigation'
import { zoomIn, zoomOut, fromLeft, fromRight, fadeIn, fadeOut } from 'react-navigation-transitions'

import SigninScreen from '../Containers/SigninScreen'
import SignupScreen from '../Containers/SignupScreen'
import SignupUsernameScreen from '../Containers/SignupUsernameScreen'
import InitialScreen from '../Containers/InitialScreen'

// import styles from './Styles/NavigationStyles'

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2] // second last element
  const nextScene = scenes[scenes.length - 1] // last element

  // Custom transitions go there
  // if (
  //   prevScene &&
  //   prevScene.route.routeName === 'SignupScreen' &&
  //   nextScene.route.routeName === 'SigninScreen'
  // ) {
  //   return fromRight()
  // }
  // if (
  //   prevScene &&
  //   prevScene.route.routeName === 'SigninScreen' &&
  //   nextScene.route.routeName === 'SignupScreen'
  // ) {
  //   return fromRight()
  // }
  return fromLeft()
}

// Manifest of possible screens
export default createStackNavigator(
  {
    InitialScreen: {
      screen: InitialScreen,
      navigationOptions: {},
    },
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: {},
    },
    SignupUsernameScreen: {
      screen: SignupUsernameScreen,
      navigationOptions: {},
    },
    SigninScreen: {
      screen: SigninScreen,
      navigationOptions: {},
    },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'InitialScreen',
    transitionConfig: nav => handleCustomTransition(nav),
    navigationOptions: {
      // headerStyle: styles.header,
    },
  }
)
