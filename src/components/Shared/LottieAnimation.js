import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import {LottieFile} from '../../assets/lottie';

// import AppConstants from "../../../constants/AppConstants.js";

export default function LottieAnimation({file = LottieFile.Scanning}) {
  return (
    <View style={{flex: 1}}>
      <LottieView source={file} autoPlay loop />
    </View>
  );
}
