import React from 'react';

const IconComponent = ({style, type, name, size, color, onPress}) => {
  const renderIcons = () => {
    let Icon = null;
    Icon = type;
    return (
      <Icon
        onPress={onPress}
        style={style}
        name={name}
        size={size}
        color={color}
      />
    );
  };

  return <>{renderIcons()}</>;
};

export default IconComponent;
