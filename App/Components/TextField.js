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

import { Button, Icon, Text, Image } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

import TouchyScale from './TouchyScale'

const { set: {normal: Metrics} } = MetricsTypes

export default class TextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
    }
  }

  handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: true })
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: false })
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  render() {
    const { placeholder, placeholderStyle, style, ...otherProps } = this.props
    const { isFocused } = this.state

    return (
      <TextInput
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        placeholder={!isFocused ? placeholder : ''}
        style={isFocused ? style : [style, placeholderStyle]}
        {...otherProps}
      />
    )
  }
}
