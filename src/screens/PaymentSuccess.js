import React from 'react';
import {Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import {Colors} from '../constants/ThemeConstants';
import ImageComponent from '../components/Shared/ImageComponent';
import {Images} from '../assets/images/Images';
import TextComponent from '../components/Shared/TextComponent';
import {FontType} from '../constants/AppConstants';
import ButtonComponent from '../components/Shared/ButtonComponent';
import {widthPerc} from '../helpers/styleHelper';

const PaymentSuccess = ({navigation}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View style={{height: 150, width: 200}}>
      <ImageComponent resizeMode="contain" source={Images.payment} />
    </View>
    <TextComponent style={{fontSize: 30, marginTop: 10}} type={FontType.BOLD}>
      Paid Successfully
    </TextComponent>
    <ButtonComponent
      onPress={() =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'History'}],
          }),
        )
      }
      style={{width: widthPerc(90), position: 'absolute', bottom: 10}}>
      Done
    </ButtonComponent>
  </View>
);

export default PaymentSuccess;
