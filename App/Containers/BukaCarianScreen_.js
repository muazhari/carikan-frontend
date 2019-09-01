import React, { Component } from 'react'
import {
  View,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
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

// Styles
import styles from './Styles/BukaCarianScreenStyle'

const {
  set: { normal: Metrics },
} = MetricsTypes

const TouchyButton = props => (
  <TouchyScale
    style={[{ justifyContent: 'center' }, props.buttonStyle]}
    {...props.otherProps}
  >
    <Text style={[{ textAlign: 'center' }, props.titleStyle]}>
      {props.title}
    </Text>
  </TouchyScale>
)

class QRDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: props.content,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.content) {
      this.setState({ content: newProps.content })
    } else {
      this.setState({ content: 'QR mu' })
    }
    this.forceUpdate()
  }

  render() {
    const { style, children } = this.props
    return (
      <View style={style}>
        {/* {this.state.content && (
          // <QRCode
          //   size={Metrics.screenWidth * 0.6}
          //   codeStyle="square"
          //   content={this.state.content}
          // />
        )} */}
        <Text>{this.state.content}</Text>
        {children}
      </View>
    )
  }
}

class BukaCarianScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusBarTransparent: false,
      visibleHeight: Metrics.screenHeight,
      qrMsg: '',
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
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      // this.props.navigation.goBack()
    }
  }

  handleQRMessageBoxInput = text => {
    this.setState({ qrMsg: text })
  }

  render() {
    return (
      // <View style={styles.backgroundContainer}>
      <ScrollView
        style={[styles.mainContainer, { height: this.state.visibleHeight }]}
      >
        <View style={styles.backgroundContainer}>
          <StatusBar
            barStyle="white-content"
            translucent={statusBarTransparent}
            backgroundColor={
              statusBarTransparent ? 'transparent' : Colors.night
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
            <QRDisplay
              style={{
                backgroundColor: Colors.fire,
                width: Metrics.screenWidth * 0.7,
                height: Metrics.screenWidth * 0.7,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              content={this.state.qrMsg}
            />
            <TextField
              style={{
                height: Metrics.screenWidth * 0.2,
                width: Metrics.screenWidth * 0.7,
                backgroundColor: Colors.snow,
                borderRadius: 10,
                padding: Metrics.screenWidth * 0.07,
              }}
              placeholderStyle={{
                textAlign: 'center',
              }}
              onChangeText={this.handleQRMessageBoxInput}
              value={this.state.qrMsg}
              placeholder="Info yang kamu berikan"
            />
            <TouchyButton
              buttonStyle={styles.authButton}
              titleStyle={styles.authText}
              title="OK"
              onPress={() => {
                this.handleQRMessageBoxInput(this.state.qrMsg)
              }}
            />
          </View>
        </View>
      </ScrollView>
      // </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BukaCarianScreen)
