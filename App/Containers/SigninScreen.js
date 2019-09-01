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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin'

import AuthActions from '../Redux/AuthRedux'
import styles from './Styles/AuthScreenStyles'
import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

import AuthForm from '../Components/AuthForm'
import AuthModal from '../Components/AuthModal'
import NavBar from '../Components/NavBar'

const {
  set: { normal: Metrics },
} = MetricsTypes

class SigninScreen extends React.Component {
  isAttempting = false

  keyboardDidShowListener = {}

  keyboardDidHideListener = {}

  constructor(props) {
    super(props)
    this.state = {
      email: 'kharisma.azhari02@gmail.com',
      password: '123456',
      passwordVisible: true,
      visibleHeight: Metrics.screenHeight,
      buttonLoginHeight: Metrics.screenHeight * 0.5,
      inputRefs: [],
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

  handlePressLogin = () => {
    const { email, password } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(email, password)
  }

  handlePressRegister = () => {
    const { email, password } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptRegister(email, password)
  }

  handlePressGoogleLogin = () => {
    this.isAttempting = true
    this.props.attemptGoogleLogin()
  }

  handleLoginFailure = () => {
    this.isAttempting = false
    this.props.attemptFailure(null)
  }

  handleChangeEmail = text => {
    this.setState({ email: text })
  }

  handleChangePassword = text => {
    this.setState({ password: text })
  }

  handleSwitchPasswordView = oldVisibility => {
    this.setState({ passwordVisible: !oldVisibility })
  }

  // When the "next" button is pressed, focus the password
  changeInputFocus = index => () => {
    const { inputRefs } = this.state
    inputRefs[index].state.inputRef.focus()
  }

  render() {
    const {
      email,
      password,
      passwordVisible,
      buttonLoginHeight,
      inputRefs,
    } = this.state
    const { fetching, error } = this.props
    const editable = !fetching && !this.isAttempting
    const pushAble = editable && email !== '' && password !== ''
    const textInputStyle = editable
      ? styles.textInput
      : styles.textInputReadonly
    return (
      <View
        contentContainerStyle={{ justifyContent: 'center' }}
        style={[styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps="always"
      >
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <AuthModal error={error} handleCloseModal={this.handleLoginFailure} />

        <NavBar
          rightText="Sign Up"
          onPressRightText={() => {
            this.props.navigation.navigate('SignupScreen')
          }}
          onPressGoBack={() => {
            this.props.navigation.goBack()
          }}
        />

        <View style={styles.pageContent}>
          <View style={styles.form}>
            <View style={styles.row}>
              <AuthForm
                ref={ref => {
                  inputRefs.email = ref
                }}
                style={textInputStyle}
                value={email}
                editable={editable}
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.handleChangeEmail}
                underlineColorAndroid="transparent"
                changeFocus={this.changeInputFocus('password')}
                blurOnSubmit={false}
                placeholder="email / Email"
              />
            </View>

            <View style={styles.row}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <AuthForm
                  ref={ref => {
                    inputRefs.password = ref
                  }}
                  style={textInputStyle}
                  value={password}
                  editable={editable}
                  keyboardType="default"
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisible}
                  onChangeText={this.handleChangePassword}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={this.handlePressLogin}
                  placeholder="Password"
                />

                <TouchableOpacity
                  hitSlop={{ top: 20, left: 20, right: 25, bottom: 20 }}
                  style={{ right: Metrics.screenWidth * 0.07 }}
                  onPress={() => this.handleSwitchPasswordView(passwordVisible)}
                >
                  <Icon
                    name={passwordVisible ? 'ios-eye-off' : 'ios-eye'}
                    type="ionicon"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'bold',
                  color: Colors.bluish,
                  fontSize: Fonts.size.medium,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            raised
            loading={this.isAttempting}
            loadingProps={{ color: Colors.bluish }}
            disabled={!pushAble}
            disabledStyle={styles.AuthButtonDisable}
            disabledTitleStyle={styles.AuthTextDisable}
            buttonStyle={styles.AuthButtonEnable}
            titleStyle={styles.AuthTextEnable}
            containerStyle={{
              borderRadius: 25,
              position: 'absolute',
              marginTop: buttonLoginHeight,
            }}
            onPress={this.handlePressLogin}
            title="Log in"
          />

          <GoogleSigninButton
            style={styles.AuthGoogleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.handlePressGoogleLogin}
            disabled={this.state.isSigninInProgress}
          />
        </View>
      </View>
    )
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
    attemptLogin: (email, password) =>
      dispatch(AuthActions.loginRequest(email, password)),

    attemptGoogleLogin: () => dispatch(AuthActions.googleLoginRequest()),

    attemptRegister: (email, password) =>
      dispatch(AuthActions.registerRequest(email, password)),

    attemptFailure: error => dispatch(AuthActions.loginFailure(error)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreen)
