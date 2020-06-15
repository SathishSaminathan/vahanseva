import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
import {widthPerc} from '../../helpers/styleHelper';
import {ReadmoreComponent} from '../../components/Shared/ReadMore';
import TextComponent from '../../components/Shared/TextComponent';
import {FontType} from '../../constants/AppConstants';
import NoData from '../NoData';
import Ripple from 'react-native-material-ripple';

const ComplaintCardText = ({label, value, isReadMore = false}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 3}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 1}}>
      <TextComponent>:</TextComponent>
    </View>
    <View style={{flex: 7}}>
      {isReadMore ? (
        <ReadmoreComponent
          style={{fontWeight: 'bold'}}
          lines={1}
          text={value}
        />
      ) : (
        <TextComponent type={FontType.BOLD}>{value}</TextComponent>
      )}
    </View>
  </View>
);

const ComplaintInfo = ({
  ComplaintInfoD = [],
  navigation,
  TrafficFines,
  ComplaintData,
}) => {
  const [List, setList] = useState(
    // ComplaintInfoD,
    [
      {
        Name: 'Helmet',
        Count: 10,
      },
      {
        Name: 'Fast Driving',
        Count: 3,
      },
      {
        Name: 'Drunk & Drive',
        Count: 2,
      },
      {
        Name: 'Driving without License',
        Count: 5,
      },
    ],
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.white,
          // alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent:'center'
        }}>
        {ComplaintData && (
          <View
            style={{
              width: widthPerc(97),
              marginVertical: 10,
              elevation: 10,
              backgroundColor: Colors.white,
              padding: 10,
              borderRadius: 8,
              overflow: 'hidden',
              alignSelf: 'center',
            }}>
            {true && (
              <View
                style={{
                  height: '200%',
                  width: 5,
                  backgroundColor: Colors.red,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                }}></View>
            )}
            <ComplaintCardText
              label="Vehicle No"
              value={ComplaintData.vehicleNumber}
            />
            <ComplaintCardText
              label="Complaint by"
              value={ComplaintData.complaintBy}
            />
            <ComplaintCardText
              label="Station name"
              value={ComplaintData.policeStationName}
            />
            <ComplaintCardText
              label="Description"
              isReadMore
              value={ComplaintData.complaintDetail}
            />
            <ComplaintCardText label="Status" value={ComplaintData.state} />
          </View>
        )}
        {TrafficFines.length !== 0 ? (
          TrafficFines.map((data, i) => (
            <View
              key={i}
              style={{
                width: widthPerc(50),
                // height: 100,
                // marginVertical: 10,
                padding: 10,
                borderRadius: 8,
                overflow: 'hidden',
              }}>
              <Ripple
                onPress={() => navigation.navigate('ComplaintInfoDetails')}
                style={{
                  elevation: 5,
                  backgroundColor: Colors.white,
                  padding: 10,
                  alignItems: 'flex-start',
                  borderRadius: 8,
                }}>
                <View style={{height: 40}}>
                  <TextComponent
                    style={{fontSize: 13, color: Colors.themeBlack}}
                    type={FontType.BOLD}>
                    {data.fineType}
                  </TextComponent>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <TextComponent
                    style={{
                      fontSize: 30,
                      color: true ? Colors.red : Colors.green,
                    }}
                    type={FontType.BOLD}>
                    {data.fineCount}
                  </TextComponent>
                </View>
              </Ripple>
              {/* <ReadmoreComponent
          style={{fontSize: 17}}
          lines={1}
          text={data.ComplaintDetails}
        /> */}
            </View>
          ))
        ) : (
          <NoData text="No Complaints..." />
        )}
      </ScrollView>
    </View>
  );
};

export default ComplaintInfo;
