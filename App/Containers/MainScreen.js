import React from 'react'
import { View, Keyboard, LayoutAnimation, ActivityIndicator } from 'react-native'

import { Button, Icon, Text, Image } from 'react-native-elements'

import { connect } from 'react-redux'
import styles from './Styles/ProfileScreenStyles'
import { Images, MetricsTypes, Colors } from '../Themes'

import StatusBar from '../Components/StatusBar'
import AppTitle from '../Components/AppTitle'

import AuthActions from '../Redux/AuthRedux'

const {
  set: { normal: Metrics },
} = MetricsTypes

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  render() {
    const {} = this.state
    const { credential } = this.props
    return (
      <View style={styles.backgroundContainer}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <AppTitle
          subMessages={[
            { id: 0, msg: 'Nice To Meet You :)' },
            { id: 1, msg: credential.displayName },
          ]}
        />

        <Image
          source={{ uri: credential.photoURL }}
          style={{
            width: Metrics.screenWidth * 0.3,
            height: Metrics.screenWidth * 0.3,
            marginVertical: Metrics.screenHeight * 0.05,
            borderRadius: 100,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View style={styles.authButtonContainer}>
          <View style={styles.row}>
            <Button
              raised
              containerStyle={{}}
              buttonStyle={styles.authButton}
              titleStyle={styles.authText}
              onPress={() => {
                this.props.navigation.navigate('BukaCarianScreen')
              }}
              title="Buka Carian"
            />
          </View>
          <View style={styles.row}>
            <Button
              raised
              buttonStyle={styles.authButton}
              titleStyle={styles.authText}
              onPress={() => {
                this.props.navigation.navigate('CarianPediaScreen')
              }}
              title="Carian Pedia"
            />
          </View>
          <View style={styles.row}>
            <Button
              raised
              buttonStyle={styles.authButton}
              titleStyle={styles.authText}
              onPress={this.props.attemptLogout}
              title="Logout"
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.auth.fetching,
    error: state.auth.error,
    credential: state.auth.credential,
  }
}

const mapDispatchToProps = dispatch => {
  return { attemptLogout: () => dispatch(AuthActions.logoutRequest()) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)
