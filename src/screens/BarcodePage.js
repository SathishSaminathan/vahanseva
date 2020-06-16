import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

import {Colors} from '../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import {IconType} from '../constants/AppConstants';
import IconComponent from '../components/Shared/IconComponent';
import Ripple from 'react-native-material-ripple';

const BUTTON_HEIGHT = widthPerc(13);

export default class BarcodePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedScreen: true,
    };
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => this.setState({focusedScreen: true}));
    navigation.addListener('blur', () => this.setState({focusedScreen: false}));

    Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      // (error) => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach((barcode) => {
      if (this.state.lastPosition) {
        this.props.navigation.push('DetailsPage', {
          barcodeValue: barcode.data,
          positions: this.state.lastPosition,
        });
      }
    });
  };

  renderCamera() {
    return (
      <RNCamera
        onGoogleVisionBarcodesDetected={this.barcodeRecognized}
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          //   height: heightPerc(20),
          justifyContent: 'space-between',
        }}>
        <Ripple
          onPress={() => this.props.navigation.navigate('VerifyVehicle')}
          rippleContainerBorderRadius={BUTTON_HEIGHT}
          style={{
            elevation: 10,
            alignSelf: 'center',
            position: 'absolute',
            top: '10%',
            zIndex: 100,
            width: widthPerc(60),
            height: BUTTON_HEIGHT,
            backgroundColor: Colors.primaryThemeColor,
            borderRadius: BUTTON_HEIGHT / 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 3,
                alignItems: 'center',
                position: 'absolute',
                left: '10%',
              }}>
              <IconComponent
                color={Colors.white}
                type={IconType.AntDesign}
                name={'search1'}
                size={18}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent style={{fontSize: 15, color: Colors.white}}>
                Vehicle Number
              </TextComponent>
            </View>
          </View>
        </Ripple>
        <BarcodeMask />
      </RNCamera>
    );
  }

  render() {
    const {focusedScreen, lastPosition} = this.state;
    // console.log('focusedScreen..', lastPosition);
    return (
      <View style={styles.container}>
        {focusedScreen && this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
