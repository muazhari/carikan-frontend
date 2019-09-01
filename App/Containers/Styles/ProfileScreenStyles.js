import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, MetricsTypes, Fonts } from '../../Themes'

const { set: {tabNav: Metrics} } = MetricsTypes

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.shape,
  backgroundContainer: {
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Metrics.screenHeight,
    width: Metrics.screenWidth
  },
  row: {
    padding: Metrics.doubleBaseMargin
  },
  authButtonContainer: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: Colors.snow,
    shadowOpacity: 10,
    elevation: 1,
    backgroundColor: Colors.ricePaper,
    borderRadius: 15
    // marginTop: Metrics.screenHeight * 0.1,
  },
  authButton: {
    width: Metrics.screenWidth * 0.79,
    height: Metrics.screenHeight * 0.075,
    borderRadius: 15,
    backgroundColor: Colors.snow
  },
  authText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.bold,
    color: Colors.background
  }
})
