import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { Text, Icon } from 'react-native-elements'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

const {
  set: { tabNav: Metrics },
} = MetricsTypes

// import styles from './Styles/ProfileImageNavBarStyles'

export default function ProfileImageNavBar(props) {
  const spacing = Metrics.screenWidth * 0.37
  const size = Metrics.screenRatio * 30
  const hitSlopSize = Metrics.screenHeight * 0.04
  const hitSlop = {
    top: hitSlopSize,
    left: hitSlopSize * 1.5,
    bottom: hitSlopSize,
    right: hitSlopSize * 1.5,
  }
  return (
    <View
      style={[
        {
          zIndex: 1,
          position: 'absolute',
          flexDirection: 'row',
          top: Metrics.screenWidth * 0.1,
          paddingVertical: hitSlopSize,
        },
        props.containerStyle,
      ]}>
      <TouchableOpacity hitSlop={hitSlop} style={{ marginHorizontal: spacing }}>
        <Icon size={size} color={Colors.snow} name="ios-arrow-back" type="ionicon" />
      </TouchableOpacity>

      <TouchableOpacity
        hitSlop={hitSlop}
        style={{
          transform: [{ rotate: '90deg' }],
          marginHorizontal: spacing,
        }}>
        <Icon size={size} color={Colors.snow} name="ios-more" type="ionicon" />
      </TouchableOpacity>
    </View>
  )
}
