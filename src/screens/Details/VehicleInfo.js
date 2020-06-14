import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
import InfoText from '../../components/Shared/InfoText';
import {widthPerc} from '../../helpers/styleHelper';
import TextComponent from '../../components/Shared/TextComponent';
import {FontType} from '../../constants/AppConstants';

const VehicleInfo = ({
  VehicleInfo: {
    name,
    model,
    mileage,
    color,
    engineCC,
    engineModel,
    engineNumber,
    fuelType,
    insuranceEndDate,
    insuranceFileId,
    insuranceNumber,
    insuranceStartDate,
    isQrVerified,
    isVerified,
    maxRetailPrice,
    noOfSeats,
    pollutionCertificateEndDate,
    pollutionCertificateFileId,
    pollutionCertificateStartDate,
    qrCodeId,
    rcBookFileId,
    rcBookNumber,
    registrationDate,
    state,
    stateValue,
    vehicleId,
    vehicleIdentificationNumber,
    vehicleNumber,
    vehicleType,
    vehicleTypeValue,
    year,
  },
}) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{padding: 5, flexDirection: 'row', flexWrap: 'wrap'}}>
        {[
          {
            name: 'Insurance End Date',
            value: insuranceEndDate,
          },
          {
            name: 'Pol. Cerf. End Date',
            value: pollutionCertificateEndDate,
          },
          {
            name: 'Driving License End Date',
            value: insuranceEndDate,
          },
        ].map((data, i) => (
          <View
            key={i}
            style={{
              // height: 50,
              width: widthPerc(48),
              padding: 5,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                borderRadius: 5,
                elevation: 8,
                backgroundColor: Colors.white,
                padding: 10,
                borderBottomColor: Colors.red,
                borderBottomWidth: 1,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}>
              <TextComponent style={{fontSize: 10, color: Colors.textWhite}}>
                {data.name}
              </TextComponent>
              <TextComponent type={FontType.BOLD} style={{fontSize: 20, paddingTop:8}}>
                {data.value}
              </TextComponent>
            </View>
          </View>
        ))}
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Name" value={name} />
        <InfoText label="Model" value={model} />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Engine Model" value={engineModel} />
        <InfoText label="Engine Number" value={engineNumber} />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Vehicle Number" value={vehicleNumber} />
        <InfoText label="Insurance Number" value={insuranceNumber} />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="RC Book Number" value={rcBookNumber} />
        <InfoText label="Year" value={year} />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Fuel" value={fuelType} />
        <InfoText
          label="Vehicle Identification Number"
          value={vehicleIdentificationNumber}
        />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Mileage" value={mileage} />
        <InfoText label="Engine CC" value={engineCC} />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="No of Seats" value={noOfSeats} />
        <InfoText label="Max Retail Price" value={maxRetailPrice} />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Color" value={color} />
        <InfoText label="Vehicle Type" value={vehicleTypeValue} />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText
          label="Pol. Cerf. Start Date"
          value={pollutionCertificateStartDate}
        />
        <InfoText
          label="Pol. Cerf. End Date"
          value={pollutionCertificateEndDate}
        />
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <InfoText label="Insurance Start Date" value={insuranceStartDate} />
        <InfoText label="Insurance End Date" value={insuranceEndDate} />
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
