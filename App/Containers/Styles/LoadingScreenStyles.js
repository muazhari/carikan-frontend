import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.night,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1Text: {
    color: Colors.accenty,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h1,
  },
  subText: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
  },
})
