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

const {
  set: { normal: Metrics },
} = MetricsTypes

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

  handleSize = e => {
    // this.setState({ height: e.nativeEvent.contentSize.height })
    if (this.props.onContentSizeChange) {
      this.props.onContentSizeChange(e)
    }
  }

  render() {
    const { placeholder, placeholderStyle, style, value, ...otherProps } = this.props
    const { isFocused } = this.state

    return (
      <TextInput
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onContentSizeChange={this.handleSize}
        placeholder={isFocused || value.length > 0 ? '' : placeholder}
        style={isFocused || value.length > 0 ? style : [style, placeholderStyle]}
        {...otherProps}
      />
    )
  }
}
