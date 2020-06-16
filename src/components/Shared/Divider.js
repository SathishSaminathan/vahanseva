import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
import {widthPerc} from '../../helpers/styleHelper';
import TextComponent from './TextComponent';

const Divider = ({params}) => (
  <View style={{marginVertical: 20}}>
    <View
      style={{
        height: 1,
        width: widthPerc(90),
        backgroundColor: Colors.accDividerColor,
      }}></View>
    <View
      style={{
        padding: 10,
        position: 'absolute',
        left: widthPerc(90) / 2 - 20,
        width: 30,
        bottom: -15,
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}>
      <TextComponent style={{fontSize: 9}}>Or</TextComponent>
    </View>
  </View>
);

export default Divider;
