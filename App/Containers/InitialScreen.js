import React from 'react'
import { View, Keyboard, LayoutAnimation } from 'react-native'

import { Button, Icon, Text, Image } from 'react-native-elements'

import { connect } from 'react-redux'
import styles from './Styles/InitialScreenStyles'
import { Images, MetricsTypes, Colors } from '../Themes'

import StatusBar from '../Components/StatusBar'
import AppTitle from '../Components/AppTitle'

const { set: {normal: Metrics} } = MetricsTypes

class InitialScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  render() {
    const {} = this.state
    const {} = this.props
    return (
      <View style={styles.backgroundContainer}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <AppTitle />

        <View style={styles.authButtonContainer}>
          <View style={styles.row}>
            <Button
              raised
              containerStyle={{}}
              buttonStyle={styles.authButton}
              titleStyle={styles.authText}
              onPress={() => {
                this.props.navigation.navigate('SigninScreen')
              }}
              title="Sign in"
            />
          </View>
          <View style={styles.row}>
            <Button
              raised
              buttonStyle={styles.authButton}
              titleStyle={styles.authText}
              onPress={() => {
                this.props.navigation.navigate('SignupScreen')
              }}
              title="Sign up"
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialScreen)
