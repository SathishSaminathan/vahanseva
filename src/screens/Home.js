import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import TextComponent from '../components/Shared/TextComponent';
import {ReadmoreComponent} from '../components/Shared/ReadMore';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc} from '../helpers/styleHelper';
import {FontType} from '../constants/AppConstants';

const ComplaintCardText = ({label, value, isReadMore = false}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 3}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 1}}>
      <TextComponent>:</TextComponent>
    </View>
    <View style={{flex: 7}}>
      <TextComponent type={FontType.BOLD}>{value}</TextComponent>
    </View>
  </View>
);

const CheckForStatus = (status) =>
  status === 'PENDING' ? Colors.red : Colors.green;

const Home = () => {
  const [List, setList] = useState([
    {
      VehicleNo: 'TN 39 BT 4863',
      Name: 'Driving without License',
      FineAmount: '1000',
      PayType: 'Pay Now',
      FineStatus: 'PENDING',
      ScannedAt: '20-06-2020 1.30PM',
    },
    {
      VehicleNo: 'TN 39 BT 4863',
      Name: 'Driving without License',
      FineAmount: '1000',
      PayType: 'Pay Now',
      FineStatus: 'SUCCESS',
      ScannedAt: '20-06-2020 1.30PM',
    },
  ]);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <TextComponent style={{margin:10, fontSize:20}} type={FontType.BOLD}>History</TextComponent>
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
                width: 5,
                backgroundColor: CheckForStatus(data.FineStatus),
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
              }}></View>
            <ComplaintCardText label="Vehicle No" value={data.VehicleNo} />
            <ComplaintCardText label="Name" value={data.Name} />
            <ComplaintCardText label="Fine Amount" value={data.FineAmount} />
            <ComplaintCardText label="Pay Type" value={data.PayType} />
            <ComplaintCardText label="Fine Status" value={data.FineStatus} />
            <ComplaintCardText label="Scanned at" value={data.ScannedAt} />
            {/* <ReadmoreComponent
          style={{fontSize: 17}}
          lines={1}
          text={data.ComplaintDetails}
        /> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
