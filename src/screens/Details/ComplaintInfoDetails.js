import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
import {widthPerc} from '../../helpers/styleHelper';
import {ReadmoreComponent} from '../../components/Shared/ReadMore';
import TextComponent from '../../components/Shared/TextComponent';
import {FontType} from '../../constants/AppConstants';
import NoData from '../NoData';
import {NavigationHeader} from '../OTP/lib';
import {GenericStyles} from '../OTP/styles/GenericStyles';

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

const ComplaintInfoDetails = ({ComplaintInfoD = [], navigation}) => {
  const [List, setList] = useState(
    // ComplaintInfoD,
    [
      {
        Name: 'Driving without License',
        Phone: '8012941249',
        Date: '20-06-2020',
        ComplaintDetails:
          'Forgot at home. since I have no time i forgot the license in my home',
        PoliceName: 'Saravanan',
      },
      {
        Name: 'Driving without License',
        Phone: '8012941249',
        Date: '20-06-2020',
        ComplaintDetails:
          'Forgot at home. since I have no time i forgot the license in my home',
        PoliceName: 'Saravanan',
      },
      {
        Name: 'Driving without License',
        Phone: '8012941249',
        Date: '20-06-2020',
        ComplaintDetails:
          'Forgot at home. since I have no time i forgot the license in my home',
        PoliceName: 'Saravanan',
      },
      {
        Name: 'Driving without License',
        Phone: '8012941249',
        Date: '20-06-2020',
        ComplaintDetails:
          'Forgot at home. since I have no time i forgot the license in my home',
        PoliceName: 'Saravanan',
      },
      {
        Name: 'Driving without License',
        Phone: '8012941249',
        Date: '20-06-2020',
        ComplaintDetails:
          'Forgot at home. since I have no time i forgot the license in my home',
        PoliceName: 'Saravanan',
      },
    ],
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <NavigationHeader
        title={'Complaints'}
        leftIconAction={() => navigation.goBack()}
        leftIconType={'back'}
        containerStyle={GenericStyles.navigationHeaderBorder}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.white,
          alignItems: 'center',
        }}>
        {List.length !== 0 ? (
          List.map((data, i) => (
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
              {data.active && (
                <View
                  style={{
                    height: '200%',
                    width: 5,
                    backgroundColor: Colors.yellow,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                  }}></View>
              )}
              <ComplaintCardText label="Name" value={data.Name} />
              <ComplaintCardText label="Phine No" value={data.Phone} />
              <ComplaintCardText label="Date" value={data.Date} />
              <ComplaintCardText
                label="Description"
                value={data.ComplaintDetails}
                isReadMore
              />
              <ComplaintCardText
                label="Police Station"
                value={data.PoliceName}
              />
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

export default ComplaintInfoDetails;
