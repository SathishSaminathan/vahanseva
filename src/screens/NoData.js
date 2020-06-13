import React from 'react';
import {Text, View} from 'react-native';
import LottieAnimation from '../components/Shared/LottieAnimation';
import {LottieFile} from '../assets/lottie';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import Ripple from 'react-native-material-ripple';
import IconComponent from '../components/Shared/IconComponent';
import {Colors} from '../constants/ThemeConstants';
import {IconType, FontType} from '../constants/AppConstants';

const BUTTON_HEIGHT = 50;

const NoData = ({navigation}) => (
  <View style={{flex: 1, alignItems: 'center'}}>
    <View style={{height: heightPerc(50), width: widthPerc(100)}}>
      <LottieAnimation file={LottieFile.ThiefHiding} />
    </View>
    <TextComponent style={{fontSize: 30}} type={FontType.BOLD}>
      Sorry no data found
    </TextComponent>
    <Ripple
      onPress={() => navigation.navigate('BarcodePage')}
      rippleContainerBorderRadius={BUTTON_HEIGHT}
      style={{
        elevation: 10,
        width: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        backgroundColor: Colors.primaryThemeColor,
        borderRadius: BUTTON_HEIGHT / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <IconComponent
          color={Colors.white}
          type={IconType.AntDesign}
          name={'reload1'}
          size={30}
        />
      </View>
    </Ripple>
  </View>
);

export default NoData;
