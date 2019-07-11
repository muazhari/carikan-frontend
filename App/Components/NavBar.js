import React from 'react'

import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Text } from 'react-native-elements'

import { Metrics, Colors, Fonts } from '../Themes'

export default class NavBar extends React.Component {
  // Create a React ref that will be used to store the
  // TextInput reference

  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  render() {
    const { onPressGoBack, onPressRightText, rightText } = this.props

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: Metrics.screenWidth * 0.1,
          paddingBottom: Metrics.screenWidth * 0.05,
        }}>
        <TouchableOpacity
          onPress={onPressGoBack}
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon color="black" name="ios-arrow-back" type="ionicon" size={Fonts.size.h1} />
          <Text
            style={{
              marginHorizontal: Metrics.screenWidth * 0.03,
              fontWeight: 'bold',
              color: 'black',
              fontSize: Fonts.size.medium,
            }}>
            back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          onPress={onPressRightText}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Fonts.size.medium,
            }}>
            {rightText}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
