import { createStackNavigator, createAppContainer } from 'react-navigation'

import LoadingScreen from '../Containers/LoadingScreen'
import LoggedInStackNavigator from './LoggedInStackNavigator'
import NotLoggedInStackNavigator from './NotLoggedInStackNavigator'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    LoggedInStack: { screen: LoggedInStackNavigator },
    NotLoggedInStack: { screen: NotLoggedInStackNavigator },
  },
  {
    // Default config for all screens
    // initialRouteName: 'LoadingScreen',
    headerMode: 'none',
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
)

export default createAppContainer(PrimaryNav)
