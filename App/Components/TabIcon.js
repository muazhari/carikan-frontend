import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Icon, Text } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'

import TouchyScale from './TouchyScale'

import { ApplicationStyles, Colors, MetricsTypes, Fonts } from '../Themes'

const {
  set: { normal: Metrics },
} = MetricsTypes

const iconMap = {
  Buka: { name: 'logo-google', type: 'ionicon', color: Colors.silver },
  Carian: { name: 'logo-facebook', type: 'ionicon', color: Colors.silver },
  Profile: { name: 'logo-octocat', type: 'ionicon', color: Colors.silver },
}

const TabIcon = props => {
  const { label, ...otherProps } = props
  const { name, type, color, size } = iconMap[label]

  return (
    // <TouchyScale>
    <Icon
      color={props.color ? props.color : color}
      size={Metrics.screenRatio * 30 || size}
      name={name}
      type={type || null}
      {...otherProps}
    />
    // {/* </TouchyScale> */}
  )
}

export default TabIcon
