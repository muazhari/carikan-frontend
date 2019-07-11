import React, { Component } from 'react'
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

import { Button, Icon, Text, Image } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import { connect } from 'react-redux'
import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

import StatusBar from './StatusBar'
import AppTitle from './AppTitle'
import TouchyScale from './TouchyScale'

const {
  set: { tabNav: Metrics },
} = MetricsTypes

class TabBarBottom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true,
      visibleHeight: Metrics.screenHeight,
    }
  }

  static defaultProps = {}

  keyboardDidShowListener = {}

  keyboardDidHideListener = {}

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
      isVisible: false,
    })
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      isVisible: true,
    })
  }

  renderItem = (route, index) => {
    // console.tron.log(route, this.props)
    const { navigation, jumpTo } = this.props

    const focused = index === navigation.state.index
    const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor

    const TabScene = {
      focused,
      route,
      tintColor: color,
    }

    return (
      <TouchableOpacity key={route.key} style={styles.tabItem} onPress={() => jumpTo(route.key)}>
        <View style={styles.tabItem}>
          {this.props.renderIcon(TabScene)}
          {this.props.getLabel && (
            <Text style={{ ...styles.tabText, marginTop: Metrics.screenHeight * 0.01, color }}>
              {this.props.getLabel(TabScene)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    // console.log('Tab this.props',this.props);
    const { navigation } = this.props
    const { isVisible } = this.state

    const { routes } = navigation.state
    return isVisible ? (
      <View style={[styles.tab]}>
        {routes && routes.map((route, index) => this.renderItem(route, index))}
      </View>
    ) : null
  }
}

const styles = {
  tab: {
    borderTopWidth: 1,
    borderTopColor: Colors.ricePaper,

    flexWrap: 'nowrap',
    width: Metrics.screenWidth,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    textAlign: 'center',
    fontSize: Fonts.size.tiny,
    color: Colors.coal,
  },
  tabTextChoose: {
    color: Colors.coal,
  },
  tabImage: {
    width: Metrics.screenWidth * 42,
    height: Metrics.screenHeight * 42,
  },
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
)(TabBarBottom)
