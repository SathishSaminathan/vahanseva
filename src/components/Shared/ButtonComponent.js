import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Feather from 'react-native-vector-icons/Feather';

import TextComponent from './TextComponent';
import {Colors} from '../../constants/ThemeConstants';

const ButtonComponent = (props) => {
  const {
    children,
    style,
    loading,
    onPress,
    icon,
    round,
    borderRadius = 0,
    fontColor = Colors.white,
    fontSize = 20,
    disabled = false,
  } = props;
  return (
    <Ripple
      disabled={disabled}
      rippleContainerBorderRadius={borderRadius}
      rippleColor={Colors.white}
      rippleSize={180}
      onPress={onPress}
      style={[
        {
          backgroundColor: (style && style.backgroundColor) || Colors.primaryThemeColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: borderRadius,
          elevation: (style && style.elevation) || 10,
          height: (style && style.height) || 46,
        },
        {...style},
      ]}>
      <View
        style={[
          {
            backgroundColor: Colors.transparent,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingVertical: 15,
            // paddingHorizontal: 20,
            backgroundColor: `${
              loading ? Colors.transparent : Colors.transparent
            }`,
            borderRadius: round ? 20 : 0,
          },
          // style,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextComponent
            style={{
              fontSize: (style && style.fontSize) || 20,
              color: (style && style.color) || Colors.white,
              fontFamily: style && style.fontFamily,
            }}>
            {children}
          </TextComponent>
          {!loading && icon && (
            <Feather style={{fontSize: 25}} name="arrow-right" />
          )}
        </View>
        {loading && (
          <ActivityIndicator
            style={{paddingLeft: 10}}
            color={Colors.white}
            size="small"></ActivityIndicator>
        )}
      </View>
    </Ripple>
  );
};

export default ButtonComponent;
