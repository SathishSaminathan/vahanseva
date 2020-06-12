import React from 'react';
import {Text} from 'react-native';

import {FontType} from '../../constants/AppConstants';

const TextComponent = (props) => {
  const {children, style, type, onPress} = props;
  const getFontFamily = (type) => {
    switch (type) {
      case FontType.REGULAR:
        return 'ProximaNova-Regular';
      // case FontType.LIGHT:
      //   return 'Proxima Nova Alt Light';
      case FontType.SEMIBOLD:
        return 'ProximaNova-Extrabld';
      case FontType.BOLD:
      default:
        return 'ProximaNova-Bold';
    }
  };
  return (
    <Text
      // onPress={() => onPress && onPress()}
      {...props}
      style={[
        {
          fontFamily: getFontFamily(type),
          fontSize: 12,
          // fontWeight: '100',
          // color: colors.primaryColor,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextComponent;

TextComponent.defaultProps = {
  type: FontType.REGULAR,
};
