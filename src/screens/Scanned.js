import React from 'react';
import {ScrollView, View} from 'react-native';
import {Colors} from '../constants/ThemeConstants';
import Ripple from 'react-native-material-ripple';
import {widthPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import {FontType} from '../constants/AppConstants';

const CheckForStatus = (status) =>
  status === 'PENDING' ? Colors.red : Colors.green;

const ComplaintCardText = ({label, value, isReadMore = false, rs = null}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 2.5}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 0.5, alignItems: 'center'}}>
      <TextComponent>:</TextComponent>
    </View>
    <View
      style={{flex: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextComponent type={FontType.BOLD}>{value}</TextComponent>
      {rs && (
        <TextComponent
          //   type={FontType.BOLD}
          style={{color: Colors.green}}>{`Rs: ${rs}`}</TextComponent>
      )}
    </View>
  </View>
);

const Scanned = ({VehicleNo, List = [], navigation}) => (
  <View style={{flex: 1, backgroundColor: Colors.white}}>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
      }}>
      {List.map((data, i) => (
        <View
          key={i}
          style={{
            width: widthPerc(97),
            marginVertical: 10,
            elevation: 10,
            backgroundColor: Colors.white,
            padding: 10,
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          <View
            style={{
              height: '200%',
              width: 3,
              backgroundColor: CheckForStatus(data.FineStatus),
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
            }}></View>
          <ComplaintCardText
            label="Vehicle No"
            value={`${data.vehicleNumber}`}
            rs={data.fineAmount}
          />
          <ComplaintCardText label="Vehicle Name" value={data.name} />
          <ComplaintCardText label="Scanned at" value={data.actionAt} />
        </View>
      ))}
    </ScrollView>
  </View>
);

export default Scanned;
