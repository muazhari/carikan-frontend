import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const sw = width < height ? width : height
const sh = width < height ? height : width

// Used via Metrics.baseMargin
const metrics = {
  screenWidth: sw,
  screenHeight: sh,
  screenRatio: (sw + sh) / 1000,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: sh * 0.013, // 10
  doubleBaseMargin: sh * 0.013 * 2, // 20
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
}

export default metrics
