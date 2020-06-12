import React from "react";
import { View, TouchableNativeFeedback, TouchableOpacity } from "react-native";

import TextComponent from "./TextComponent";
import { Colors } from "../../constants/ThemeConstants";
import IconComponent from "./IconComponent";
import { IconType } from "../../constants/AppConstants";

const TabBarButton = ({ state, descriptors, navigation }) => {
  //   console.log(props, 'props');
  //   const {routeName, onPress, focused} = props;
  const iconMap = {
    Home: "home",
    Profile: "account-circle-outline",
    Wishlist: "heart",
    MapView: "map",
    Stays: "briefcase-outline",
    Offers: "tag-outline",
    Settings: "settings",
    Fashion: "layout",
    Beauty: "instagram",
    Bookings: "message-square",
    Notifications: "bell",
  };
  return (
    <View style={{ flexDirection: "row", height: 60 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        if (label !== "PaymentSuccess" && label !== "AddCardStack") {
          return (
            <View style={{ flex: 1 }} key={index}>
              {isFocused && (
                <View
                  style={{
                    height: 1.3,
                    backgroundColor: Colors.darkGrey,
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    right: "20%",
                    zIndex: 1,
                  }}
                />
              )}
              {/* <TouchableNativeFeedback
                // background={TouchableNativeFeedback.Ripple('red')}
                // containerStyle={{
                //   backgroundColor: Colors.red,
                // }}
                delayPressIn={0}
                onPress={onPress}> */}
              <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={[
                  {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.white,
                  },
                ]}
              >
                <IconComponent
                  type={IconType.MaterialCommunityIcons}
                  name={iconMap[label]}
                  size={isFocused ? 20 : 20}
                  style={[
                    isFocused && {
                      // backgroundColor: Colors.primaryThemeColor,
                      // padding: 8,
                      borderRadius: 10,
                      // elevation: 10,
                    },
                    { alignSelf: "center" },
                  ]}
                  color={isFocused ? Colors.darkGrey : Colors.lightGrey}
                />
                <TextComponent
                  style={{
                    color: isFocused ? Colors.darkGrey : Colors.lightGrey,
                    fontSize: 12,
                    // fontWeight: isFocused ? 'bold' : 'normal',
                  }}
                >
                  {label}
                </TextComponent>
              </TouchableOpacity>
              {/* </TouchableNativeFeedback> */}
            </View>
          );
        }
      })}
    </View>
  );
};

export default TabBarButton;
