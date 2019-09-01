import React from 'react'
import { View } from 'react-native'

import styles from './Styles/LoadingScreenStyles'
import StatusBar from '../Components/StatusBar'
import AppTitle from '../Components/AppTitle'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <AppTitle />
      </View>
    )
  }
}

export default LoadingScreen
