import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, View, Alert, BackHandler} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';

import {Colors} from '../constants/ThemeConstants';
import TextComponent from '../components/Shared/TextComponent';
import VehicleInfo from './Details/VehicleInfo';
import OwnerInfo from './Details/OwnerInfo';
import ComplaintInfo from './Details/ComplaintInfo';
import ScannedInfo from './Details/ScannedInfo';
import LottieAnimation from '../components/Shared/LottieAnimation';
import {LottieFile} from '../assets/lottie';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import {FontType, IconType} from '../constants/AppConstants';
import Ripple from 'react-native-material-ripple';
import IconComponent from '../components/Shared/IconComponent';
import NoData from './NoData';
import ButtonComponent from '../components/Shared/ButtonComponent';

const initialLayout = {width: Dimensions.get('window').width};

const DetailsPage = (props) => {
  // const {barcodeValue, lastPosition} = props.route.params;
  const [index, setIndex] = React.useState(0);
  const [Loading, setLoading] = useState(true);
  const [Details, setDetails] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => props.navigation.goBack()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const [routes] = React.useState([
    {key: 'VehicleInfo', title: 'Vehicle'},
    {key: 'OwnerInfo', title: 'Owner'},
    {key: 'ComplaintInfo', title: 'Complaint'},
  ]);

  const renderScene = SceneMap({
    VehicleInfo: () => <VehicleInfo {...props} />,
    OwnerInfo: () => <OwnerInfo {...props} />,
    ComplaintInfo: () => <ComplaintInfo {...props} />,
  });

  const renderLabel = ({route}) => (
    <TextComponent
      style={{
        fontFamily: 'ProximaNova-Bold',
        fontSize: 15,
        color: Colors.tabText,
      }}>
      {route.title}
    </TextComponent>
  );

  const renderHeader = (props) => (
    <TabBar
      indicatorStyle={{
        backgroundColor: Colors.primaryLightThemeColor,
        height: 1.5,
      }}
      style={{backgroundColor: Colors.white}}
      renderLabel={renderLabel}
      {...props}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {Loading ? (
        <LottieAnimation />
      ) : Details ? (
        <>
          <TabView
            navigationState={{index, routes}}
            renderTabBar={renderHeader}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
          <View style={{flexDirection: 'row', width: widthPerc(100)}}>
            <View style={{flex: 1}}>
              <ButtonComponent
                onPress={() => props.navigation.navigate('OtpVerification')}>Verify OTP</ButtonComponent>
            </View>
            <View style={{flex: 1}}>
              <ButtonComponent
                onPress={() => props.navigation.navigate('ChargeFine')}
                style={{backgroundColor: Colors.red}}>
                Charge Fine
              </ButtonComponent>
            </View>
          </View>
        </>
      ) : (
        <NoData {...props} />
      )}
    </View>
  );
};

export default DetailsPage;
