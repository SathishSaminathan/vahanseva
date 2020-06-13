import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import InfoText from '../../../components/Shared/InfoText';
import {Colors} from '../../../constants/ThemeConstants';

const Basic = ({params}) => (
  <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText label="First Name" value="Sathish" />
      <InfoText label="Last Name" value="Saminathan" />
    </View>
    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText label="Date of Birth" value="2020-05-21" />
      <InfoText label="Gender" value="MALE" />
    </View>
    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText label="Phone Number" value="801291249" />
      <InfoText label="Vehicle Number" value="TN 60 CB 0258" />
    </View>
    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText label="Insurance Number" value="QQ123456C" />
      <InfoText label="Registration Date" value="2020-05-21" />
    </View>

    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText
        label="Address"
        value="1141, Mettupalayam Road, Saibaba Colony"
      />
    </View>
    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText label="City" value="Coimbatore" />
      <InfoText label="State" value="Tamil Nadu" />
    </View>
    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText label="Country" value="India" />
      <InfoText label="Landmark" value="Near police station" />
    </View>
    <View style={{flexDirection: 'row', padding: 10}}>
      <InfoText label="Zip Code" value="641034" />
    </View>
  </ScrollView>
);

export default Basic;
