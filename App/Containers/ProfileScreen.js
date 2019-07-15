import React from 'react'
import {
  View,
  Keyboard,
  ScrollView,
  LayoutAnimation,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
} from 'react-native'

import { Button, Icon, Text, Image } from 'react-native-elements'

import { connect } from 'react-redux'
import TouchableScale from 'react-native-touchable-scale'
import Swiper from 'react-native-swiper'

import styles from './Styles/ProfileScreenStyles'
import { Images, MetricsTypes, Colors, Fonts } from '../Themes'

import TouchyScale from '../Components/TouchyScale'
import StatusBar from '../Components/StatusBar'

import ProfileImages from '../Components/ProfileImages'
import ProfileImagesNavBar from '../Components/ProfileImagesNavBar'
import ProfileContent from '../Components/ProfileContent'
import ProfileContentPost from '../Components/ProfileContentPost'
import ProfileCredential from '../Components/ProfileCredential'
import ProfileCredentialBar from '../Components/ProfileCredentialBar'

import AuthActions from '../Redux/AuthRedux'

const {
  set: { tabNav: Metrics },
} = MetricsTypes

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postText: '',
      contentData: [
        {
          photoURL: 'a',
          displayName: 'Ragilaaaaaaaaaaaaaaaaaaaaaaaaaa',
          message:
            'halo karr halo karr halo karr halo karr halo karr halo karr halo karr halo karr ',
          timeStamp: Date.now(),
        },
        {
          photoURL: 'a',
          displayName: 'Ragilaaaaaaaaaaaaaaaaaaaaaaaaaa',
          message:
            'halo karr halo karr halo karr halo karr halo karr halo karr halo karr halo karrhalo karr halo karr halo karr halo karr halo karr halo karr halo karr halo karrhalo karr halo karr halo karr halo karr halo karr halo karr halo karr halo karrhalo karr halo karr halo karr halo karr halo karr halo karr halo karr halo karr ',
          timeStamp: Date.now() + 1,
        },
      ],
    }
  }

  componentWillMount() {
    this.forceUpdate()
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      // this.props.navigation.goBack()
    }
  }

  handlePostText = text => {
    this.setState({ postText: text })
  }

  handlePostTextSubmit = () => {
    const { postText } = this.state
    const { photoURL, displayName } = this.props.credential
    if (postText) {
      this.setState(prevState => ({
        contentData: [
          { photoURL, displayName, message: postText, timeStamp: Date.now() },
          ...prevState.contentData,
        ],
      }))
    }
  }

  render() {
    const { contentData } = this.state
    const { credential } = this.props
    const profileData = credential
    profileData.message = credential.email

    return (
      <View>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
          <ProfileImagesNavBar />
          <ProfileImages
            // containerStyle={{ width: Metrics.screenWidth, height: Metrics.screenHeight * 0.2 }}
            photos={credential.photoURL}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ProfileCredentialBar />
            <ProfileCredential onPress={null} profileData={profileData} />

            {contentData &&
              contentData.map(item => <ProfileContent key={item.timeStamp} contentData={item} />)}
          </View>
          <View
            style={{
              borderTopWidth: Metrics.screenRatio * 1,
              borderColor: Colors.haze,
              height: Metrics.screenHeight * 0.25,
              width: Metrics.screenWidth,
              alignItems: 'center',
              paddingTop: Metrics.screenHeight * 0.03,
            }}>
            <Text>Let him know you are care!</Text>
          </View>
        </ScrollView>
        <ProfileContentPost
          containerStyle={{}}
          textFieldStyle={{}}
          placeholderStyle={{}}
          imageStyle={{}}
          profilePhoto={credential.photoURL}
          onChangeText={this.handlePostText}
          onSubmitEditing={this.handlePostTextSubmit}
          value={this.state.postText}
          returnKeyType="done"
          placeholder="Add to post"
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.auth.fetching,
    error: state.auth.error,
    credential: state.auth.credential,
  }
}

const mapDispatchToProps = dispatch => {
  return { attemptLogout: () => dispatch(AuthActions.logoutRequest()) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)
