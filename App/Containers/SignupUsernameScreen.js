import React from 'react'
import {
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  LayoutAnimation,
  StatusBar,
  // Button,
  // Text
} from 'react-native'

import { Button, Icon, Text } from 'react-native-elements'

import { connect } from 'react-redux'

import AuthActions from '../Redux/AuthRedux'
// import ProfileActions from '../Redux/ProfileRedux'
import styles from './Styles/AuthScreenStyles'
import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

import AuthForm from '../Components/AuthForm'
import AuthModal from '../Components/AuthModal'
import NavBar from '../Components/NavBar'

const { set: {normal: Metrics} } = MetricsTypes

class SignupUsernameScreen extends React.Component {
  isAttempting = false

  keyboardDidShowListener = {}

  keyboardDidHideListener = {}

  constructor(props) {
    super(props)
    this.state = {
      username: 'muazhari',
      visibleHeight: Metrics.screenHeight,
      buttonLoginHeight: Metrics.screenHeight * 0.5,
      inputRefs: [],
      registerPath: 0,
    }
    this.isAttempting = false
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      // this.props.navigation.goBack()
    }
  }

  componentDidMount() {
    //
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
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
      buttonLoginHeight: newSize * 0.5,
    })
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      buttonLoginHeight: Metrics.screenHeight * 0.5,
    })
  }

  handlePressSetUsername = () => {
    const { username } = this.state
    this.isAttempting = true

    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptSetUsername(username)
  }

  handleRegisterFailure = () => {
    this.isAttempting = false
    this.props.attemptFailure(null)
  }

  handleChangeUsername = text => {
    this.setState({ username: text })
  }

  // When the "next" button is pressed, focus the password
  changeInputFocus = index => () => {
    const { inputRefs } = this.state
    inputRefs[index].state.inputRef.focus()
  }

  registerRenderPath0 = () => {
    const { username, email, password, buttonLoginHeight, inputRefs } = this.state
    const { fetching, error } = this.props
    const editable = !fetching && !this.isAttempting
    const pushable = editable && username !== ''
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <View
        contentContainerStyle={{ justifyContent: 'center' }}
        style={[styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps="always">
        <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
        <AuthModal error={error} handleCloseModal={this.handleRegisterFailure} />

        <NavBar
          rightText="Skip"
          onPressRightText={() => this.props.attemptAUTH_SUCCESS()}
          onPressGoBack={() => {
            this.props.navigation.goBack()
          }}
        />

        <View style={styles.pageContent}>
          <View style={styles.h1TextContent}>
            <Text style={styles.h1Text}>Register</Text>
            <Text style={styles.h1Text}>your Username</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.row}>
              <AuthForm
                ref={ref => {
                  inputRefs.username = ref
                }}
                style={textInputStyle}
                value={username}
                editable={editable}
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.handleChangeUsername}
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
                placeholder="Username"
              />
            </View>
          </View>
          <Button
            raised
            loading={this.isAttempting}
            loadingProps={{ color: Colors.bluish }}
            disabled={!pushable}
            disabledStyle={styles.AuthButtonDisable}
            disabledTitleStyle={styles.AuthTextDisable}
            buttonStyle={styles.AuthButtonEnable}
            titleStyle={styles.AuthTextEnable}
            containerStyle={{ position: 'absolute', marginTop: buttonLoginHeight }}
            onPress={this.handlePressSetUsername}
            title="Continue"
          />
        </View>
      </View>
    )
  }

  render() {
    switch (this.state.registerPath) {
      default:
        return this.registerRenderPath0()
    }
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.auth.fetching,
    error: state.auth.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptSetUsername: username => {
      // dispatch(ProfileActions.requestSetUsername(username))
    },

    attemptAUTH_SUCCESS: () => dispatch({ type: 'AUTH_SUCCESS' }),

    attemptFailure: error => dispatch(AuthActions.registerFailure(error)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupUsernameScreen)
