import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AppTitleStyles'

const AppTitle = props => {
  return (
    <View style={[styles.containerText, props.containerStyle]}>
      <Text style={[styles.h1Text, props.h1Style]}>ShopCast</Text>
      <Text style={[styles.subText, props.subStyle]}>Spread Yours</Text>
    </View>
  )
}

export default AppTitle
