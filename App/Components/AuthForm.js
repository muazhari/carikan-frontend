import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

import { ApplicationStyles, MetricsTypes, Colors } from '../Themes'

const {
  set: { normal: Metrics },
} = MetricsTypes

const styles = StyleSheet.create({
  ...ApplicationStyles.shape,
})

export default class AuthForm extends React.Component {
  // Create a React ref that will be used to store the
  // TextInput reference

  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
    }
    this.inputRef = null
  }

  handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: true })
    // Remember to propagate the `onFocus` event to the
    // parent as well (if set)
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: false })
    // Remember to propagate the `onBlur` event to the
    // parent as well (if set)
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  render() {
    const { error, onFocus, onBlur, ...otherProps } = this.props
    const { isFocused } = this.state

    return (
      <View>
        <TextInput
          placeholderTextColor={error ? 'red' : 'grey'}
          ref={ref => {
            this.state.inputRef = ref
          }}
          onSubmitEditing={this.props.changeFocus}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          // ...and then spread all the other props
          {...otherProps}
        />

        <View style={[styles.lineStyle, { borderColor: isFocused ? 'blue' : Colors.oxford }]} />
      </View>
    )
  }
}
