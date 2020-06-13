import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
import InfoText from '../../components/Shared/InfoText';

const VehicleInfo = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Name" value="Pulsar standard" />
        <InfoText label="Model" value="standard" />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Engine Model" value="TESD32424" />
        <InfoText label="Engine Number" value="TNSL0944KSDFLK9454K" />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Color" value="BLACK" />
        <InfoText label="Year" value="2013" />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Fuel" value="Petrol" />
        <InfoText
          label="Vehicle Identification Number"
          value="LSDFJKSD324324DSF3DS"
        />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Mileage" value="50" />
        <InfoText label="Engine CC" value="150" />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="No of Seats" value="2" />
        <InfoText label="Max Retail Price" value="80000" />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Show Room Name" value="Aadhi Cars" />
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
        <InfoText label="Landmark" value="Old Muthu Theatre" />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Zip Code" value="641034" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {color: Colors.textWhite},
  value: {fontSize: 20},
});
export default VehicleInfo;
