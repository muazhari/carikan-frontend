import React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  NavigationActions,
  SafeAreaView,
} from 'react-navigation'

import {
  View,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Text, Image } from 'react-native-elements'

import AuthActions from '../Redux/AuthRedux'

// import styles from './Styles/ProfileDrawer'
import { ApplicationStyles, Colors, MetricsTypes, Fonts } from '../Themes'

const {
  set: { normal: Metrics },
} = MetricsTypes

class ProfileDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    const { fetching: isLoggingOut } = this.props
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            disabled={isLoggingOut}
            style={{ padding: Metrics.screenWidth * 0.04 }}
            onPress={() => {
              this.props.attemptLogOut()
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Icon
                size={Metrics.screenRatio * 30}
                name="ios-log-out"
                type="ionicon"
                color={isLoggingOut ? Colors.steel : Colors.fire}
              />
              <Text style={{ marginHorizontal: Metrics.screenWidth * 0.02 }}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.auth.fetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogOut: () => dispatch(AuthActions.logoutRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDrawer)
