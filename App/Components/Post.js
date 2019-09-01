import React from 'react'
import { View, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Moment from 'react-moment'

import { Text, Image } from 'react-native-elements'

import ReadMore from 'react-native-read-more-text'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

const {
  set: { tabNav: Metrics },
} = MetricsTypes

// import styles from './Styles/PostStyles'

const TextContentBar = props => {
  return (
    <Text numberOfLines={props.numberOfLines || 1} style={props.style} {...props.otherProps}>
      {props.children}
    </Text>
  )
}

const TextContent = props => {
  const renderTruncatedFooter = handlePress => {
    return (
      <Text style={{ color: Colors.sea, marginTop: 5 }} onPress={handlePress}>
        Read more
      </Text>
    )
  }

  const renderRevealedFooter = handlePress => {
    return (
      <Text style={{ color: Colors.sea, marginTop: 5 }} onPress={handlePress}>
        Show less
      </Text>
    )
  }

  return (
    <ReadMore
      style={props.style}
      numberOfLines={props.numberOfLines || 3}
      renderTruncatedFooter={renderTruncatedFooter}
      renderRevealedFooter={renderRevealedFooter}
      {...props.otherProps}>
      {props.children}
    </ReadMore>
  )
}

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
    const { content } = this.props

    const { text, imageURL, createdAt, updatedAt, upCount, postId, loc, user } = content

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
          source={{ uri: user.photoURL }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View
          style={{
            flexDirection: 'column',
            marginRight: Metrics.screenWidth * 0.2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: Metrics.screenWidth * 0.7,
            }}>
            <TextContentBar
              style={{
                flex: 1,
                fontSize: Fonts.size.regular,
                fontWeight: 'bold',
              }}>
              {user.displayName}
            </TextContentBar>

            <Moment
              style={{
                textAlign: 'right',
                flex: 1,
                fontSize: Fonts.size.small,
              }}
              element={TextContentBar}
              fromNow>
              {updatedAt}
            </Moment>
          </View>
          <TextContent>{text}</TextContent>
        </View>
      </TouchableOpacity>
    )
  }
}
