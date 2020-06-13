import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc} from '../helpers/styleHelper';
import IconComponent from '../components/Shared/IconComponent';
import {IconType} from '../constants/AppConstants';
import TextComponent from '../components/Shared/TextComponent';
import Ripple from 'react-native-material-ripple';

const BUTTON_HEIGHT = widthPerc(50);

const StartScan = (props) => {
  const renderButton = () => {
    return [
      {
        icon: 'scan1',
        name: 'Scan',
        route: 'scanner',
      },
      {
        icon: 'search1',
        name: 'Verify OTP',
        route: 'scanner',
      },
    ].map((data, i) => (
      <Ripple
        onPress={() => props.navigation.push('BarcodePage')}
        key={i}
        rippleContainerBorderRadius={BUTTON_HEIGHT}
        style={{
          elevation: 10,
          width: BUTTON_HEIGHT,
          height: BUTTON_HEIGHT,
          backgroundColor: Colors.primaryThemeColor,
          borderRadius: BUTTON_HEIGHT / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <IconComponent color={Colors.white} type={IconType.AntDesign} name={data.icon} size={50} />
          <TextComponent style={{fontSize: 25, marginTop: 5, color: Colors.white}}>
            {data.name}
          </TextComponent>
        </View>
      </Ripple>
    ));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      {renderButton()}
    </View>
  );
};

export default StartScan;
