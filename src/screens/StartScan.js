import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc, heightPerc} from '../helpers/styleHelper';
import IconComponent from '../components/Shared/IconComponent';
import {IconType} from '../constants/AppConstants';
import TextComponent from '../components/Shared/TextComponent';
import Ripple from 'react-native-material-ripple';
import ImageComponent from '../components/Shared/ImageComponent';
import {Images} from '../assets/images/Images';

const BUTTON_HEIGHT = widthPerc(13);

const StartScan = (props) => {
  const renderButton = () => {
    return [
      {
        icon: 'scan1',
        name: 'Scan',
        route: 'BarcodePage',
      },
      {
        icon: 'search1',
        name: 'Vehicle Number',
        route: 'VerifyVehicle',
      },
    ].map((data, i) => (
      <Ripple
        onPress={() => props.navigation.push(data.route)}
        key={i}
        rippleContainerBorderRadius={BUTTON_HEIGHT}
        style={{
          elevation: 10,
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
          <View style={{flex: 3, alignItems: 'center', position:'absolute', left: "10%"}}>
            <IconComponent
              color={Colors.white}
              type={IconType.AntDesign}
              name={data.icon}
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
              {data.name}
            </TextComponent>
          </View>
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
      <View style={{height: heightPerc(60), width: '100%'}}>
        <ImageComponent source={Images.govLogo} resizeMode="contain" />
      </View>
      <View style={{flex: 1}}>{renderButton()}</View>
    </View>
  );
};

export default StartScan;
