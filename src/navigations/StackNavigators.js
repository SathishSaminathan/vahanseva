import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import BarcodePage from '../screens/BarcodePage';
import DetailsPage from '../screens/DetailsPage';
import StartScan from '../screens/StartScan';
import ChargeFine from '../screens/ChargeFine';
import OtpVerification from '../screens/OTP/components/otp/OtpVerification';
import VerifyVehicle from '../screens/VerifyVehicle';

const Stack = createStackNavigator();

function BarcodeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          // overlayStyle: {
          //   opacity: progress.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: [0, 0.5],
          //     extrapolate: 'clamp',
          //   }),
          // },
        }),
      }}
      initialRouteName="StartScan"
      headerMode="none">
      <Stack.Screen
        name="StartScan"
        component={StartScan}
      />
      <Stack.Screen
        name="BarcodePage"
        component={BarcodePage}
      />
      <Stack.Screen
        name="ChargeFine"
        component={ChargeFine}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{
          // title: 'Notifications',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="VerifyVehicle"
        component={VerifyVehicle}
        options={{
          // title: 'Notifications',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="DetailsPage"
        component={DetailsPage}
        // options={{
        //   // title: 'Notifications',
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // }}
      />
    </Stack.Navigator>
  );
}

export {BarcodeStack};
