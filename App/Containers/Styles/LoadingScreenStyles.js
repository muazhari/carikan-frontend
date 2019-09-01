import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
  },
})
