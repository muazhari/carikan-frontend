import React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'

import {
  View,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Button, Icon, Text, Image } from 'react-native-elements'
import ProfileScreen from '../Containers/ProfileScreen'
import BukaCarianScreen from '../Containers/BukaCarianScreen'
import CarianPediaScreen from '../Containers/CarianPediaScreen'

import UploadPostScreen from '../Containers/UploadPostScreen'

import ProfileDrawer from '../Components/ProfileDrawer'

import TabIcon from '../Components/TabIcon'
import TabAddButton from '../Components/TabAddButton'
import TabBarBottom from '../Components/TabBarBottom'

import styles from './Styles/NavigationStyles'
import { ApplicationStyles, Colors, MetricsTypes, Fonts } from '../Themes'

const {
  set: { normal: Metrics },
} = MetricsTypes

BukaCarianScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <TabIcon color={tintColor} label="Buka" />,
  // tabBarIcon: <TabAddButton />,
}

CarianPediaScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <TabIcon color={tintColor} label="Carian" />,
}

ProfileScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <TabIcon color={tintColor} label="Profile" />,
}

const tabBarOptions = {
  activeTintColor: Colors.sky,
  inactiveTintColor: Colors.steel,
  showIcon: true,
  showLabel: false,
  keyboardHidesTabBar: true,
  // style: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: Colors.snow,
  // },
  // indicatorStyle: {
  //   opacity: 0,
  // },
  // pressColor: Colors.fire,
  //      tabStyle: styles.tab,
  //      indicatorStyle: styles.indicator,
  //      labelStyle: styles.label,
  //      iconStyle: styles.icon,
  //      style: styles.tabBar,
  //    },
  // iconStyle: {
  //   paddingBottom: 0,
  //   paddingTop: 0,
  //   padding: 0,
  //   marginTop: 0,
  //   marginBottom: 0,
  //   width: Metrics.screenWidth * 0.4,
  //   height: Metrics.screenHeight * 0.4,
  // },
  // labelStyle: {
  //   paddingTop: 0,
  //   paddingBottom: Metrics.screenHeight * 0.1,
  //   marginTop: 0,
  //   padding: 0,
  //   fontSize: Fonts.size.tiny,
  //   color: Colors.ember,
  // },
  // tabStyle: {
  //   height: Metrics.screenHeight * 0.09,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
}

const LoggedInStackNavigator = createMaterialTopTabNavigator(
  {
    Buka: {
      screen: createStackNavigator(
        {
          Home: {
            screen: BukaCarianScreen,
          },
          Upload: {
            screen: UploadPostScreen,
          },
        },
        {
          headerMode: 'none',
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabIcon color={tintColor} label="Buka" />
        ),
      },
    },
    Carian: {
      screen: CarianPediaScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabIcon color={tintColor} label="Carian" />
        ),
      },
    },
    Profile: {
      screen: createDrawerNavigator(
        {
          Home: {
            screen: ProfileScreen,
          },
        },
        {
          drawerWidth: Metrics.screenWidth * 0.5,
          drawerPosition: 'right',
          contentComponent: props => <ProfileDrawer {...props} />,
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabIcon color={tintColor} label="Profile" />
        ),
      },
    },
  },
  {
    initialRouteName: 'Carian',
    order: ['Buka', 'Carian', 'Profile'],
    backBehavior: 'Carian',
    lazy: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    keyboardHidesTabBar: true,
    tabBarOptions,
    tabBarComponent: props => <TabBarBottom {...props} />,
  }
)

export default LoggedInStackNavigator

//
// class a extends React.Component {
//   handleOnRotate = e => {
//     MetricsTypes.updateMetrics()
//     this.forceUpdate()
//     console.tron.log(
//       `Seharusnya -> ${JSON.stringify({
//         height: MetricsTypes.set.normal.screenHeight,
//         width: MetricsTypes.set.normal.screenWidth,
//       })} (Tanpa Destructuring)`
//     )
//     console.tron.log(
//       `Tapi -> ${JSON.stringify({
//         height: Metrics.screenHeight,
//         width: Metrics.screenWidth,
//       })} (Dengan Destructuring)`
//     )
//   }
//
//   componentWillReceiveProps(prevProps, nextProps) {
//     MetricsTypes.updateMetrics()
//     this.forceUpdate()
//     console.tron.log(`${prevProps}, ${nextProps}`)
//   }
//
//   render() {
//     return (
//       <ScrollView style={{ flex: 1 }}>
//         <View
//           onLayout={this.handleOnRotate}
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'red',
//             height: MetricsTypes.set.normal.screenHeight,
//             width: MetricsTypes.set.normal.screenWidth,
//           }}>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Screen A</Text>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             Dengan / Tanpa Destructuring, style tidak merefresh pada component, kecuali awal
//             terload, di forceUpdate tidak berpengaruh
//           </Text>
//
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             {`${JSON.stringify({
//               height: MetricsTypes.set.normal.screenHeight,
//               width: MetricsTypes.set.normal.screenWidth,
//             })} (Tanpa Destructuring)`}
//           </Text>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             {` ${JSON.stringify({
//               height: Metrics.screenHeight,
//               width: Metrics.screenWidth,
//             })} (Dengan Destructuring)`}
//           </Text>
//         </View>
//       </ScrollView>
//     )
//   }
// }
//
// class b extends React.Component {
//   handleOnRotate = e => {
//     // MetricsTypes.updateMetrics()
//     this.forceUpdate()
//     console.tron.log(
//       `Seharusnya -> ${JSON.stringify({
//         height: MetricsTypes.set.normal.screenHeight,
//         width: MetricsTypes.set.normal.screenWidth,
//       })} (Tanpa Destructuring)`
//     )
//     console.tron.log(
//       `Tapi -> ${JSON.stringify({
//         height: Metrics.screenHeight,
//         width: Metrics.screenWidth,
//       })} (Dengan Destructuring)`
//     )
//   }
//
//   render() {
//     return (
//       <ScrollView style={{ flex: 1 }}>
//         <View
//           onLayout={this.handleOnRotate}
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'green',
//             height: MetricsTypes.set.normal.screenHeight,
//             width: MetricsTypes.set.normal.screenWidth,
//           }}>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Screen B</Text>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             Dengan / Tanpa Destructuring, style tidak merefresh pada component, kecuali awal
//             terload, di forceUpdate tidak berpengaruh
//           </Text>
//
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             {`${JSON.stringify({
//               height: MetricsTypes.set.normal.screenHeight,
//               width: MetricsTypes.set.normal.screenWidth,
//             })} (Tanpa Destructuring)`}
//           </Text>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             {` ${JSON.stringify({
//               height: Metrics.screenHeight,
//               width: Metrics.screenWidth,
//             })} (Dengan Destructuring)`}
//           </Text>
//           <Button
//             onPress={e => {
//               this.handleOnRotate()
//             }}
//           />
//         </View>
//       </ScrollView>
//     )
//   }
// }
//
// class c extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { color: 'blue' }
//   }
//
//   handleOnRotate = e => {
//     // MetricsTypes.updateMetrics()
//     this.forceUpdate()
//     console.tron.log(
//       `Seharusnya -> ${JSON.stringify({
//         height: MetricsTypes.set.normal.screenHeight,
//         width: MetricsTypes.set.normal.screenWidth,
//       })} (Tanpa Destructuring)`
//     )
//     console.tron.log(
//       `Tapi -> ${JSON.stringify({
//         height: Metrics.screenHeight,
//         width: Metrics.screenWidth,
//       })} (Dengan Destructuring)`
//     )
//   }
//
//   render() {
//     return (
//       <ScrollView style={{ flex: 1 }}>
//         <View
//           onLayout={this.handleOnRotate}
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: this.state.color,
//             height: MetricsTypes.set.normal.screenHeight,
//             width: MetricsTypes.set.normal.screenWidth,
//           }}>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Screen C</Text>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             Dengan / Tanpa Destructuring, style tidak merefresh pada component, kecuali awal
//             terload, di forceUpdate tidak berpengaruh
//           </Text>
//
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             {`${JSON.stringify({
//               height: MetricsTypes.set.normal.screenHeight,
//               width: MetricsTypes.set.normal.screenWidth,
//             })} (Tanpa Destructuring)`}
//           </Text>
//           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
//             {` ${JSON.stringify({
//               height: Metrics.screenHeight,
//               width: Metrics.screenWidth,
//             })} (Dengan Destructuring)`}
//           </Text>
//           <Button
//             onPress={e => {
//               this.setState({ color: 'yellow' })
//               this.handleOnRotate()
//             }}
//           />
//         </View>
//       </ScrollView>
//     )
//   }
// }

// const LoggedInStackNavigator = createBottomTabNavigator(
//   {
//     Buka: {
//       screen: BukaCarianScreen,
//     },
//     Carian: {
//       screen: CarianPediaScreen,
//     },
//     Profile: {
//       screen: ProfileScreen,
//     },
//   },
//   {
//     // Default config for all screens
//     headerMode: 'none',
//     initialRouteName: 'Profile',
//     tabBarPosition: 'bottom',
//     swipeEnabled: true,
//     animationEnabled: true,
//     lazy: false,
//     order: ['Buka', 'Carian', 'Profile'],
//     backBehavior: 'Carian',
//     tabBarOptions: {
//       showLabel: false,
//       showIcon: true,
//       scrollEnabled: true,
//       upperCaseLabel: true,
//       // activeTintColor: '#F8F8F8',
//       inactiveTintColor: '#586589',
//       style: {
//         backgroundColor: Colors.snow,
//       },
//       // activeTintColor: Colors.snow,
//       // inactiveTintColor: Colors.transparentWhite,
//       pressColor: Colors.fire,
//       // tabStyle: styles.tab,
//       // indicatorStyle: styles.indicator,
//       // labelStyle: styles.label,
//       // iconStyle: styles.icon,
//       // style: styles.tabBar,
//     },
//     // navigationOptions: {
//     //   headerStyle: styles.header,
//     // },
//   }
// )
