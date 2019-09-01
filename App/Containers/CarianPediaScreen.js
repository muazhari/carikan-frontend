import React, { Component } from 'react'
import {
  View,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'

import { Button, Icon, Text, Image } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import { QRCode } from 'react-native-custom-qr-codes'
import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

import StatusBar from '../Components/StatusBar'
import AppTitle from '../Components/AppTitle'
import TouchyScale from '../Components/TouchyScale'
import TextField from '../Components/TextField'

import Post from '../Components/Post'

import PostActions from '../Redux/PostRedux'

// Styles
import styles from './Styles/CarianPediaScreenStyle'

const {
  set: { normal: Metrics },
} = MetricsTypes

const TouchyButton = props => {
  return (
    <TouchyScale
      style={[{ justifyContent: 'center' }, props.buttonStyle]}
      {...props.otherProps}
    >
      <Text style={[{ textAlign: 'center' }, props.titleStyle]}>
        {props.title}
      </Text>
    </TouchyScale>
  )
}

class CarianPediaScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStatusBarTransparent: false,
      visibleHeight: Metrics.screenHeight,
      text: '',
    }
    this.isAttempting = false
  }

  keyboardDidShowListener = {}

  keyboardDidHideListener = {}

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    )
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    const newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
    })
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
    })
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate()
    // Did the attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      // this.props.navigation.goBack()
    }
  }

  // handleCommentInput = text => {
  //   this.setState({ text })
  // }

  // handlePressComment = () => {
  //   const { text } = this.state
  //   const { attemptCreatePost } = this.props
  //   attemptCreatePost(text)
  // }

  onRefresh = () => {
    const { attemptReadPost } = this.props
    attemptReadPost()
  }

  render() {
    const { isStatusBarTransparent } = this.state
    const { fetching, posts } = this.props
    return (
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={this.onRefresh} />
        }
      >
        <StatusBar
          barStyle="dark-content"
          translucent={isStatusBarTransparent}
          backgroundColor={
            isStatusBarTransparent ? 'transparent' : Colors.night
          }
        />
        <View
          style={{
            flex: 1,
            marginVertical: Metrics.doubleBaseMargin,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text>CarianPediaScreen</Text>
        </View>
        {/* // in reverse order */}
        {posts &&
          posts.map((val, index) => (
            <Post
              key={posts[posts.length - 1 - index].updatedAt}
              content={posts[posts.length - 1 - index]}
            />
          ))}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.post.fetching,
    error: state.post.error,
    posts: state.post.contents,
    credential: state.auth.credential,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptCreatePost: text => dispatch(PostActions.postCreateRequest(text)),
    attemptReadPost: id => dispatch(PostActions.postReadRequest(id)),
    attemptUpdatePost: (postId, text) =>
      dispatch(PostActions.postUpdateRequest(postId, text)),
    attemptDeletePost: postId =>
      dispatch(PostActions.postDeleteRequest(postId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarianPediaScreen)
