import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, MetricsTypes, Fonts } from '../../Themes'

const { set: {normal: Metrics} } = MetricsTypes

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.shape,
  container: {
    paddingTop: Metrics.screenHeight * 0.08,
    backgroundColor: Colors.snow,
  },
  pageContent: {
    // backgroundColor: 'yellow',
    alignItems: 'center',
    paddingHorizontal: Metrics.screenWidth * 0.15,
    paddingBottom: Metrics.screenWidth * 0.8,
  },
  form: {
    // backgroundColor: 'yellow',
    width: Metrics.screenWidth * 0.75,
    borderRadius: 4,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    // paddingHorizontal: Metrics.doubleBaseMargin,
  },
  rowLabel: {
    color: Colors.charcoal,
  },
  textInput: {
    height: Metrics.screenHeight * 0.06,
    width: Metrics.screenWidth * 0.75,
    color: Colors.coal,
  },
  textInputReadonly: {
    height: Metrics.screenHeight * 0.06,
    width: Metrics.screenWidth * 0.75,
    color: Colors.steel,
  },
  AuthRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
  },
  AuthGoogleButton: {
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.08,
    marginTop: Metrics.screenHeight * 0.6,
    position: 'absolute',
  },
  AuthButtonEnable: {
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.075,
    borderRadius: 25,
    backgroundColor: Colors.bluish,
    padding: 6,
  },
  AuthButtonDisable: {
    borderWidth: 1,
    borderColor: Colors.bluish,
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.075,
    borderRadius: 25,
    backgroundColor: Colors.white,
    padding: 6,
  },
  AuthTextEnable: {
    // textAlign: 'center',
    marginBottom: Metrics.screenHeight * 0.007,
    fontWeight: 'bold',
    fontSize: Fonts.size.h5,
    color: Colors.silver,
  },
  AuthTextDisable: {
    // textAlign: 'center',
    marginBottom: Metrics.screenHeight * 0.007,
    fontWeight: 'bold',
    fontSize: Fonts.size.h5,
    color: Colors.bluish,
  },
  topLogo: {
    position: 'absolute',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  h1TextContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // marginBottom: Metrics.doubleBaseMargin,
  },
  h1Text: {
    color: 'black',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h2,
  },
})
