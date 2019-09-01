import React from 'react'
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'

import { Button, Icon, Text, Image } from 'react-native-elements'

import TouchableScale from 'react-native-touchable-scale'
import Swiper from 'react-native-swiper'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

const {
  set: { tabNav: Metrics },
} = MetricsTypes

// import styles from './Styles/ProfileImagesStyles'

const renderPagination = (index, total, context) => {
  return undefined
}

export default function ProfileImages(props) {
  const { imageURLs, containerStyle, imageStyle, placeholderStyle } = props
  return (
    <Swiper
      width={Metrics.screenWidth}
      height={Metrics.screenWidth}
      style={containerStyle}
      activeDotColor={Colors.snow}
      // showsButtons
    >
      {imageURLs.map((url, index) => {
        return (
          <TouchableOpacity key={index} activeOpacity={1}>
            <Image
              style={[
                {
                  width: Metrics.screenWidth,
                  height: Metrics.screenWidth,
                  resizeMode: 'cover',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  borderBottomRightRadius: 25,
                  borderBottomLeftRadius: 25,
                },
                imageStyle,
              ]}
              placeholderStyle={[
                { backgroundColor: Colors.steel },
                placeholderStyle,
              ]}
              source={{ uri: url }}
              PlaceholderContent={
                <ActivityIndicator
                  size={Metrics.screenRatio * 50}
                  color={Colors.snow}
                />
              }
            />
          </TouchableOpacity>
        )
      })}
    </Swiper>
  )
}
