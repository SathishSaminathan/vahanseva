import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';

import {GET, AppVariables} from '../constants/AppConstants';
import TextComponent from '../components/Shared/TextComponent';
import {ReadmoreComponent} from '../components/Shared/ReadMore';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc} from '../helpers/styleHelper';
import {FontType} from '../constants/AppConstants';
import Services from '../services';
import NoData from './NoData';
import ImageComponent from '../components/Shared/ImageComponent';
import Fines from './Fines';
import Scanned from './Scanned';
import {connect} from 'react-redux';

const ComplaintCardText = ({label, value, isReadMore = false, rs = null}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 3}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 1}}>
      <TextComponent>:</TextComponent>
    </View>
    <View
      style={{flex: 7, flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextComponent type={FontType.BOLD}>{value}</TextComponent>
      {rs && (
        <TextComponent
          type={FontType.BOLD}
          style={{color: Colors.green}}>{`Rs: ${rs}`}</TextComponent>
      )}
    </View>
  </View>
);

const CheckForStatus = (status) =>
  status === 'PENDING' ? Colors.red : Colors.green;

const History = (props) => {
  const getData = (type) => {
    setList([]);
    const {VehicleNo} = props;
    let url =
      type === 'Scanned' ? `vehicle/complaints/logs` : `vehicle/complaints`;
    new Services()
      .api(GET, url)
      .then((res) => {
        setList(type === 'Scanned' ? res.data.logs : res.data.complaints);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Service = new Services();
  useEffect(() => {
    Service.api(GET, 'police/complaint')
      .then((res) => {
        // console.log(res);
        // setList(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [Active, setActive] = useState('Fines');
  const [List, setList] = useState([
    // {
    //   VehicleNo: 'TN 39 BT 4863',
    //   Name: 'Driving without License',
    //   FineAmount: '1000',
    //   ScannedAt: '20-06-2020 1.30PM',
    // },
  ]);

  useEffect(() => {
    getData(Active);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}>
        <View style={{flex: 8}}>
          <TextComponent type={FontType.BOLD} style={{fontSize: 25}}>
            Hi, Saravanan
          </TextComponent>
          <TextComponent type={FontType.BOLD} style={{color: Colors.textWhite}}>
            Sub Inspector - Madurai
          </TextComponent>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              type={FontType.BOLD}
              style={{color: Colors.green, fontSize: 14}}>
              Scanned: 100
            </TextComponent>
            <TextComponent
              type={FontType.BOLD}
              style={{color: Colors.green, fontSize: 14}}>
              Amount Charged: 100
            </TextComponent>
          </View>
        </View>
        <View
          style={{flex: 2, alignItems: 'flex-end', justifyContent: 'center'}}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: Colors.white,
              elevation: 20,
              overflow: 'hidden',
            }}>
            <ImageComponent
              source={{
                uri:
                  'https://pickaface.net/gallery/avatar/66961165_171026_2019_co0p.png',
              }}
            />
          </View>
        </View>
      </View>
      <TextComponent style={{margin: 10, fontSize: 20}} type={FontType.BOLD}>
        History
      </TextComponent>
      {List && List.length === 0 ? (
        <NoData text="No Complaints..." />
      ) : (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
          <View
            style={{flexDirection: 'row', marginVertical: 20, marginTop: 5}}>
            {['Fines', 'Scanned'].map((data, i) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setActive(data);
                  getData(data);
                }}
                key={i}
                style={{
                  backgroundColor: Active === data ? Colors.red : Colors.white,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  marginHorizontal: 5,
                  elevation: 5,
                }}>
                <TextComponent
                  style={{
                    color: Active === data ? Colors.white : Colors.red,
                  }}>
                  {data}
                </TextComponent>
              </TouchableOpacity>
            ))}
          </View>
          {Active === 'Fines' ? (
            <Fines {...props} List={List} />
          ) : (
            <Scanned {...props} List={List} />
          )}
          {/* <ScrollView
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
                  value={`${data.VehicleNo}`}
                  rs={data.FineAmount}
                />
                <ComplaintCardText label="Fine Name" value={data.Name} />

                <ComplaintCardText label="Scanned at" value={data.ScannedAt} />
              </View>
            ))}
          </ScrollView> */}
        </View>
      )}
    </View>
  );
};

const mapStateToProps = ({
  user: {
    current_user: {VehicleNo},
    isLoading,
  },
}) => {
  return {
    VehicleNo,
  };
};

export default connect(mapStateToProps, null)(History);
