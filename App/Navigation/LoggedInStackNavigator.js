import { createStackNavigator } from 'react-navigation'

import ListScreen from '../Containers/ListScreen'
import LiveStreamScreen from '../Containers/LiveStreamScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default createStackNavigator(
  {
    ListScreen: { screen: ListScreen },
    LiveStreamScreen: { screen: LiveStreamScreen },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'ListScreen',
    // navigationOptions: {
    //   headerStyle: styles.header,
    // },
  }
)
