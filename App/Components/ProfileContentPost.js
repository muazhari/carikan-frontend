import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { Image } from 'react-native-elements'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

import TextField from './TextField'

const {
  set: { tabNav: Metrics },
} = MetricsTypes

// import styles from './Styles/ProfileContentPostStyles'

export default class ProfileContentPost extends React.Component {
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

  shouldComponentUpdate(prevState, nextState) {
    if (prevState.IsPressed === nextState.IsPressed) {
      return false
    }
    return true
  }

  render() {
    const {
      containerStyle,
      imageStyle,
      textFieldStyle,
      placeholderStyle,
      profilePhoto,
      ...otherProps
    } = this.props
    const { IsPressed } = this.state

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            bottom: 0,
            position: 'absolute',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: Colors.haze,
            borderTopWidth: Metrics.screenRatio * 1,
            width: Metrics.screenWidth,
            height: Metrics.screenHeight * 0.15,
            backgroundColor: Colors.snow,
            padding: Metrics.screenHeight * 0.02,
          },
          containerStyle,
        ]}
      >
        <Image
          style={[
            {
              width: Metrics.screenWidth * 0.15,
              height: Metrics.screenWidth * 0.15,
              borderRadius: 100,
              marginRight: Metrics.screenWidth * 0.04,
            },
            imageStyle,
          ]}
          source={{ uri: profilePhoto }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <TextField
          placeholderStyle={[placeholderStyle]}
          style={[
            {
              backgroundColor: Colors.haze,
              borderRadius: 45,
              flex: 1,
              paddingHorizontal: Metrics.screenWidth * 0.05,
              height: Metrics.screenWidth * 0.15,
            },
            textFieldStyle,
          ]}
          {...otherProps}
        />
      </View>
    )
  }
}
