import MetricsTypes from './Metrics'

const { set: {normal: Metrics} } = MetricsTypes

const type = {
  // base: 'Avenir-Book',
  // bold: 'Avenir-Black',
  // emphasis: 'HelveticaNeue-Italic',
  base: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: Metrics.screenRatio * 38,
  h2: Metrics.screenRatio * 34,
  h3: Metrics.screenRatio * 30,
  h4: Metrics.screenRatio * 26,
  h5: Metrics.screenRatio * 20,
  h6: Metrics.screenRatio * 19,
  input: Metrics.screenRatio * 18,
  regular: Metrics.screenRatio * 17,
  medium: Metrics.screenRatio * 14,
  small: Metrics.screenRatio * 12,
  tiny: Metrics.screenRatio * 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
