import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import ButtonComponent from '../components/Shared/ButtonComponent';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import {FontType, IconType} from '../constants/AppConstants';
import IconComponent from '../components/Shared/IconComponent';

export default class PermissionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CameraPermission: false,
      LocationPermission: false,
    };
  }

  componentDidMount() {
    new Promise((resolve) => {
      this.checkForPermission(PERMISSIONS.ANDROID.CAMERA, 'CameraPermission');
      this.checkForPermission(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        'LocationPermission',
      );
      resolve();
    }).then(() => {
      setTimeout(() => {
        this.state.CameraPermission &&
          this.scroll.scrollTo({x: widthPerc(100)});
      }, 0);
    });
  }

  checkForPermission = (value, label) => {
    check(value).then((result) => {
      this.setState(
        {
          [label]: RESULTS.GRANTED === result,
        },
        () => console.log('The permission is granted'),
      );
    });
  };

  requestPermission = (value, label) => {
    const {grantPermission} = this.props;
    request(value).then((result) => {
      console.log('result....', result);
      this.setState(
        {
          [label]: result !== 'denied' ? true : false,
        },
        () => {
          if (this.state.CameraPermission) {
            if (!this.state.LocationPermission) {
              this.scroll.scrollTo({x: widthPerc(100)});
            } else {
              grantPermission();
            }
          }
          if (label === 'LocationPermission' && this.state.LocationPermission)
            grantPermission();
        },
      );
    });
  };

  render() {
    const {CameraPermission, LocationPermission} = this.state;
    console.log('CameraPermission,LocationPermission', this.state);
    return (
      <View style={{flex: 1}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          ref={(node) => (this.scroll = node)}
          scrollEnabled={false}
          pagingEnabled
          horizontal
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View
            style={{
              flex: 1,
              width: widthPerc(100),
              backgroundColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <IconComponent
                type={IconType.MaterialCommunityIcons}
                name="camera"
                size={80}
                style={{marginBottom: '40%'}}
              />
              <TextComponent type={FontType.BOLD} style={{fontSize: 30}}>
                Enable Camera
              </TextComponent>
              <TextComponent
                style={{padding: 30, fontSize: 18, textAlign: 'center'}}>
                Please provide us access to your camera, which is required for
                Scanning QR
              </TextComponent>
              {!CameraPermission && (
                <ButtonComponent
                  style={{width: widthPerc(60), height: 40}}
                  borderRadius={50}
                  onPress={() =>
                    this.requestPermission(
                      PERMISSIONS.ANDROID.CAMERA,
                      'CameraPermission',
                    )
                  }>
                  Grant
                </ButtonComponent>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              width: widthPerc(100),
              backgroundColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <IconComponent
                type={IconType.MaterialCommunityIcons}
                name="map-marker"
                size={80}
                style={{marginBottom: '40%'}}
              />
              <TextComponent type={FontType.BOLD} style={{fontSize: 30}}>
                Enable Geolocation
              </TextComponent>
              <TextComponent
                style={{padding: 30, fontSize: 18, textAlign: 'center'}}>
                By allowing geolocation you are allowing us to get the current
                location while using the app
              </TextComponent>
              {!LocationPermission && (
                <ButtonComponent
                  style={{width: widthPerc(60), height: 40}}
                  borderRadius={50}
                  onPress={() =>
                    this.requestPermission(
                      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                      'LocationPermission',
                    )
                  }>
                  Grant
                </ButtonComponent>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
