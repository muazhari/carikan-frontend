import React from 'react'
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
// import Moment from 'react-moment'

import { Text, Image } from 'react-native-elements'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

const { set: {tabNav: Metrics} } = MetricsTypes

// import styles from './Styles/ProfileContentStyles'

export default class ProfileContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // visibleHeight: Metrics.screenHeight,
      IsPressed: false,
    }
  }

  handlePressInOut = e => {
    const { IsPressed } = this.state
    this.setState({ IsPressed: !IsPressed })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.IsPressed === nextState.IsPressed) {
      return false
    }
    return true
  }

  render() {
    const { IsPressed } = this.state
    const { contentData } = this.props

    const { displayName, photoURL, message, timeStamp } = contentData

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={this.handlePressInOut}
        onPressOut={this.handlePressInOut}
        delayPressIn={1000}
        // delayPressOut={1000}
        style={{
          width: Metrics.screenWidth,
          // height: Metrics.screenHeight * 0.1,
          // flexGrow: 1,
          backgroundColor: IsPressed ? Colors.haze : Colors.snow,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: Metrics.screenHeight * 0.03,
          paddingHorizontal: Metrics.screenWidth * 0.05,
          borderColor: Colors.haze,
          borderTopWidth: Metrics.screenRatio * 1,
        }}>
        <Image
          style={{
            width: Metrics.screenWidth * 0.15,
            height: Metrics.screenWidth * 0.15,
            borderRadius: 100,
            marginRight: Metrics.screenWidth * 0.05,
          }}
          source={{ uri: photoURL }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginRight: Metrics.screenWidth * 0.2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'space-between',
            }}>
            <Text style={{ fontSize: Fonts.size.regular, fontWeight: 'bold' }}>{displayName}</Text>

            {/* <Moment style={{ fontSize: Fonts.size.regular }} fromNow>
              {timeStamp}
            </Moment> */}
          </View>
          <Text style={{}}>{message}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
