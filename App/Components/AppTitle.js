import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import styles from './Styles/AppTitleStyles'

// const subMessages = props => {
//   return <Text>{props.message}</Text>
// }

const AppTitle = props => {
  let { subMessages } = props

  if (!subMessages) {
    subMessages = [{ id: 0, msg: 'Gotong royong kuy' }]
  }
  return (
    <View style={[styles.containerText, props.containerStyle]}>
      <Text style={[styles.h1Text, props.h1Style]}>Carikan</Text>
      {subMessages.map(m => (
        <Text key={m.id} style={[styles.subText, props.subStyle]}>
          {m.msg}
        </Text>
      ))}
    </View>
  )
}

export default AppTitle
