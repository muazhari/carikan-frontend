import React from 'react'

import TouchableScale from 'react-native-touchable-scale'

export default props => {
  return (
    <TouchableScale
      style={props.style}
      defaultScale={props.defaultScale || 1}
      activeScale={props.activeScale || 0.97}
      tension={props.tension || 500}
      friction={props.friction || 10}>
      {props.children}
    </TouchableScale>
  )
}
