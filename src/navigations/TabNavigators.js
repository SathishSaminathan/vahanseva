import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconType} from '../constants/AppConstants';
import Home from '../screens/Home';
import TabBarButton from '../components/Shared/TabBarButton';
import StartScan from '../screens/StartScan';
import History from '../screens/History';
import {View} from 'react-native';
import IconComponent from '../components/Shared/IconComponent';
import {Colors} from '../constants/ThemeConstants';
import {BarcodeStack} from './StackNavigators';
import ComingSoon from '../screens/ComingSoon';

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({})}
      //   tabBar={props => <TabBarButton {...props} />}
      tabBarOptions={{
        activeTintColor: Colors.red,
        inactiveTintColor: Colors.themeBlack,
        keyboardHidesTabBar: true,
        showLabel: false,
      }}>
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconComponent
              color={color}
              size={20}
              type={IconType.MaterialCommunityIcons}
              name="history"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={BarcodeStack}
        options={{
          tabBarVisible: false,
          tabBarIcon: ({tintColor, focused}) => (
            <View
              style={{
                position: 'absolute',
                bottom: focused ? 0 : 10, // space from bottombar
                height: 50,
                width: 50,
                borderRadius: 58,
                backgroundColor: Colors.primaryThemeColor,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 10,
              }}>
              <IconComponent
                color={Colors.white}
                size={20}
                type={IconType.AntDesign}
                name="scan1"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ComingSoon"
        component={ComingSoon}
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconComponent
              color={color}
              size={20}
              type={IconType.AntDesign}
              name="bulb1"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export {HomeTabNavigator};
