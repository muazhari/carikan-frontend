import React from 'react'
import { View } from 'react-native'

import { Icon, Text } from 'react-native-elements'

import TouchableScale from 'react-native-touchable-scale'
import Swiper from 'react-native-swiper'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

const { set: {tabNav: Metrics} } = MetricsTypes

// import styles from './Styles/ProfileCredentialBarStyles'

export default function ProfileCredentialBar(props) {
  const { onPressPost, onPressHeart, onPressShare } = props
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Metrics.screenWidth,
        height: Metrics.screenWidth * 0.1,
        marginVertical: Metrics.screenHeight * 0.02,
      }}>
      <TouchableScale
        onPress={onPressHeart}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Icon color={Colors.fire} name="heart" type="font-awesome" />
        <Text style={{ marginHorizontal: Metrics.screenWidth * 0.03 }}>99</Text>
      </TouchableScale>
      <TouchableScale
        onPress={onPressPost}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Icon color={Colors.steel} name="comment" type="font-awesome" />
        <Text style={{ marginHorizontal: Metrics.screenWidth * 0.03 }}>99</Text>
      </TouchableScale>
      <TouchableScale
        onPress={onPressShare}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Icon color={Colors.steel} name="share" type="font-awesome" />
        <Text style={{ marginHorizontal: Metrics.screenWidth * 0.03 }}>99</Text>
      </TouchableScale>
    </View>
  )
}
