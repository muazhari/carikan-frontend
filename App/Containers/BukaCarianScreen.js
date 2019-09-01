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

import PostActions from '../Redux/PostRedux'

// Styles
import styles from './Styles/BukaCarianScreenStyle'

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

class BukaCarianScreen extends Component {
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

  handleTextBoxInput = text => {
    this.setState({ text })
  }

  handlePressTextBox = () => {
    const { text } = this.state
    const { attemptCreatePost } = this.props
    attemptCreatePost(text)
  }

  render() {
    const { isStatusBarTransparent } = this.state
    const { fetching } = this.props
    return (
      <View style={styles.backgroundContainer}>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
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
            <TextField
              multiline
              style={{
                // height: Metrics.screenWidth * 0.2,
                width: Metrics.screenWidth * 0.7,
                backgroundColor: Colors.snow,
                borderRadius: 10,
                padding: Metrics.screenWidth * 0.07,
              }}
              placeholderStyle={{
                textAlign: 'center',
              }}
              onChangeText={this.handleTextBoxInput}
              value={this.state.text}
              placeholder="Info yang kamu berikan"
            />
            <Button
              buttonStyle={styles.authButton}
              titleStyle={styles.authText}
              title="OK"
              onPress={this.handlePressTextBox}
            />
          </View>
        </ScrollView>
      </View>
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
)(BukaCarianScreen)
