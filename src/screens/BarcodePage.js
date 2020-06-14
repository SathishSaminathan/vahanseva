import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

import {Colors} from '../constants/ThemeConstants';
import {heightPerc} from '../helpers/styleHelper';

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
      this.props.navigation.push('DetailsPage', {
        barcodeValue: barcode.data,
        positions: this.state.lastPosition,
      });
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
