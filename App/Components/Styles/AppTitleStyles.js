import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1Text: {
    color: Colors.sky,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h1,
  },
  subText: {
    color: Colors.ink,
    fontFamily: Fonts.type.base,
  },
})
