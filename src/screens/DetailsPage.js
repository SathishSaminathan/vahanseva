import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../constants/ThemeConstants';

export default class DetailsPage extends Component {
  render() {
    const {barcodeValue, lastPosition} = this.props.route.params;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <Text>
          {barcodeValue}
          {lastPosition}
        </Text>
      </View>
    );
  }
}
