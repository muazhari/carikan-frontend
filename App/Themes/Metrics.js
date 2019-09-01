import { Dimensions, Platform } from 'react-native'
import React from 'react'

class MetricsTypes {
  constructor() {
    this.set = {}
    this.updateMetrics()
  }

  updateMetrics = () => {
    this.set = { normal: this.normalMetrics(), tabNav: this.tabNavMetrics() }
    // console.tron.log('Metrics Updated', this.set)
    // console.tron.log({ width, height }, { sw_Normal, sh_Normal, sr_Normal })
  }

  getSet = () => {
    return this.set
  }

  getScreen = () => {
    const { width, height } = Dimensions.get('window')
    const sr_Normal = (width + height) / 1000
    const sw_Normal = width
    const sh_Normal = height
    // const sw_Normal = width < height ? width : height
    // const sh_Normal = width < height ? height : width

    return { sw_Normal, sh_Normal, sr_Normal }
  }

  // Used via Metrics.baseMargin
  getMetrics = tabnavHeight => {
    const { sw_Normal, sh_Normal, sr_Normal } = this.getScreen()

    const sh = sh_Normal - tabnavHeight
    const sw = sw_Normal
    const sr = sw < sh ? sr_Normal : (tabnavHeight + sw) / 1000

    const specificMetrics = {
      screenWidth: sw,
      screenHeight: sh,
      screenRatio: sr,
      marginHorizontal: 10,
      marginVertical: 10,
      section: 25,
      baseMargin: sr * 10, // 10
      doubleBaseMargin: sr * 20, // 20
      smallMargin: sr * 5,
      doubleSection: sr * 50,
      horizontalLineHeight: 1,
      navBarHeight: tabnavHeight,
      // navBarRatio: ,
      buttonRadius: sr * 4,
      icons: {
        tiny: sr * 15,
        small: sr * 20,
        medium: sr * 30,
        large: sr * 45,
        xl: sr * 50,
      },
      images: {
        small: sr * 20,
        medium: sr * 40,
        large: sr * 60,
        logo: sr * 200,
      },
    }

    return specificMetrics
  }

  normalMetrics = () => this.getMetrics(0)

  tabNavMetrics = () => {
    const { sh_Normal } = this.getScreen()
    const tabnavHeight = Platform.OS === 'ios' ? sh_Normal * 0.07 : sh_Normal * 0.08
    return this.getMetrics(tabnavHeight)
  }
}

export default new MetricsTypes()
