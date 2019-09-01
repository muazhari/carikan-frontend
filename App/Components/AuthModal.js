import React from 'react'

import Modal from 'react-native-modal'
import { View, StyleSheet } from 'react-native'
import { Button, Icon, Text } from 'react-native-elements'

import { MetricsTypes, Colors, Fonts } from '../Themes'

const {
  set: { normal: Metrics },
} = MetricsTypes

export default class AuthModal extends React.Component {
  // Create a React ref that will be used to store the
  // TextInput reference

  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  render() {
    const { error, handleCloseModal, ...otherProps } = this.props

    return (
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        isVisible={!!error}
        style={{
          backgroundColor: Colors.snow,
          marginHorizontal: Metrics.screenWidth * 0.1,
          marginVertical: Metrics.screenHeight * 0.33,
          borderRadius: 15,
        }}
        {...otherProps}>
        <View
          style={{
            alignItems: 'center',
            // paddingHorizontal: Metrics.screenWidth * 0.,
            // paddingVertical: Metrics.screenHeight * 0.05,
          }}>
          <View
            style={{
              alignItems: 'center',
              paddingBottom: Metrics.screenHeight * 0.02,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: Fonts.size.regular,
                width: Metrics.screenWidth * 0.65,
                height: Metrics.screenHeight * 0.13,
              }}>
              {error && error.message}
            </Text>
          </View>
          <Button
            raised
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: Colors.bluish,
              width: Metrics.screenWidth * 0.65,
              height: Metrics.screenHeight * 0.065,
            }}
            title="OK"
            onPress={handleCloseModal}
          />
        </View>
      </Modal>
    )
  }
}
