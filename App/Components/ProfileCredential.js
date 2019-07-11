import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { Text, Image } from 'react-native-elements'

import TouchyScale from './TouchyScale'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

const { set: {tabNav: Metrics} } = MetricsTypes

// import styles from './Styles/ProfileCredentialStyles'

export default class ProfileCredential extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // visibleHeight: Metrics.screenHeight,
      IsPressed: false,
    }
  }

  handlePressInOut = IsPressed => {
    this.setState({ IsPressed: !IsPressed })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.IsPressed === nextState.IsPressed) {
      return false
    }
    return true
  }

  render() {
    const { profileData, onPress } = this.props
    const { IsPressed } = this.state

    const { displayName, photoURL, message } = profileData

    return (
      <TouchyScale
        activeOpacity={1}
        onPress={onPress}
        // delayPressOut={1000}
        style={{
          width: Metrics.screenWidth * 0.95,
          height: Metrics.screenHeight * 0.2,
          backgroundColor: IsPressed ? Colors.frost : Colors.snow,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          shadowOpacity: 1,
          elevation: 3.5,
          borderRadius: Metrics.screenWidth * 0.04,
          marginBottom: Metrics.screenHeight * 0.02,
        }}>
        <Image
          style={{
            width: Metrics.screenWidth * 0.2,
            height: Metrics.screenWidth * 0.2,
            borderRadius: 100,
            marginHorizontal: Metrics.screenWidth * 0.08,
          }}
          source={{ uri: photoURL }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View
          style={{
            flexDirection: 'column',
            paddingRight: Metrics.screenWidth * 0.46,
          }}>
          <Text numberOfLines={2} style={{ fontWeight: 'bold', color: Colors.coal }}>
            {displayName}
          </Text>
          <Text numberOfLines={2} style={Fonts.size.h4}>
            {message}
          </Text>
        </View>
      </TouchyScale>
    )
  }
}
