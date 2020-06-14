import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../constants/ThemeConstants';
import TextComponent from '../components/Shared/TextComponent';

export default class ComingSoon extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextComponent style={{fontSize: 20}}>Coming Soon..</TextComponent>
      </View>
    );
  }
}
