import React, { Component } from 'react'
import { View, StatusBar, Dimensions, Platform } from 'react-native'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/StartupRedux'

import ReduxPersist from '../Config/ReduxPersist'

import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

// Styles
import styles from './Styles/RootContainerStyles'

const {
  set: { normal: Metrics },
} = MetricsTypes

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  // componentWillMount() {
  //   Orientation.addOrientationListener(this.handleOnRotate)
  // }
  //
  // componentWillUnmount() {
  //   Orientation.removeOrientationListener(this.handleOnRotate)
  // }

  handleOnRotate = e => {
    MetricsTypes.updateMetrics()
    this.forceUpdate()
    console.tron.log(
      `Seharusnya -> ${JSON.stringify({
        height: MetricsTypes.set.normal.screenHeight,
        width: MetricsTypes.set.normal.screenWidth,
      })} (Tanpa Destructuring)`
    )
    console.tron.log(
      `Tapi -> ${JSON.stringify({
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
      })} (Dengan Destructuring)`
    )
  }

  render() {
    return (
      <View style={styles.applicationView} onLayout={this.handleOnRotate}>
        <StatusBar barStyle="light-content" />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  null,
  mapDispatchToProps
)(RootContainer)
