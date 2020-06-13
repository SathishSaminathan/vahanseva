import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextComponent from './TextComponent';
import {FontType} from '../../constants/AppConstants';
import { Colors } from '../../constants/ThemeConstants';

const InfoText = ({label, value}) => (
  <View style={{flex: 5}}>
    <TextComponent style={styles.label}>{label}</TextComponent>
    <TextComponent type={FontType.BOLD} style={styles.value}>
      {value}
    </TextComponent>
  </View>
);

const styles = StyleSheet.create({
  label: {color: Colors.textWhite},
  value: {fontSize: 15},
});
export default InfoText;
