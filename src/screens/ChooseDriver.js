import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../constants/ThemeConstants';
import {NavigationHeader} from './OTP/lib';
import {GenericStyles} from './OTP/styles/GenericStyles';
import ButtonComponent from '../components/Shared/ButtonComponent';
import {widthPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import Divider from '../components/Shared/Divider';
import {FontType} from '../constants/AppConstants';

const ComplaintCardText = ({
  label,
  value,
  isReadMore = false,
  index,
  count,
}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 1}}>
      <TextComponent>{index}.</TextComponent>
    </View>
    <View style={{flex: 3}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 0.5}}>
      <TextComponent>:</TextComponent>
    </View>
    <View style={{flex: 7}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <TextComponent type={FontType.BOLD} style={{marginRight: 5}}>
          {value}({count})
        </TextComponent>
        <TouchableOpacity onPress={() => alert('hai')} activeOpacity={0.7}>
          <TextComponent type={FontType.BOLD} style={{color: Colors.blue}}>
            (View in detail)
          </TextComponent>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const ChooseDriver = ({navigation}) => {
  const phoneNumberRef = useRef(null);
  const licenseNumberRef = useRef(null);
  const [Name, setName] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [LicenseNumber, setLicenseNumber] = useState(null);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView style={{flexGrow: 1}}>
        <NavigationHeader
          title={'Choose Driver'}
          leftIconAction={() => navigation.goBack()}
          leftIconType={'back'}
          containerStyle={GenericStyles.navigationHeaderBorder}
        />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <ButtonComponent style={{width: widthPerc(60), borderRadius: 8}}>
            Owner as Driver
          </ButtonComponent>
          <Divider />
          <View style={{}}>
            <TextComponent
              style={{fontSize: 20, alignSelf: 'center'}}
              type={FontType.BOLD}>
              Driver Details
            </TextComponent>
            <View style={{width: widthPerc(90)}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View style={{flex: 3}}>
                  <TextComponent style={styles.label} type={FontType.BOLD}>
                    Name
                  </TextComponent>
                </View>
                <View style={{flex: 1}}>
                  <TextComponent>:</TextComponent>
                </View>
                <TextInput
                  style={[
                    {
                      margin: 0,
                      flex: 6,
                      minHeight: 30,
                      padding: 0,
                      borderBottomWidth: 2,
                      paddingHorizontal: 5,
                      fontFamily: 'ProximaNova-Regular',
                    },
                    styles.value,
                  ]}
                  value={Name}
                  onChangeText={(e) => {
                    setName(e);
                  }}
                  onSubmitEditing={() => phoneNumberRef.current.focus()}
                  blurOnSubmit={false}
                  //   value="sathish"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View style={{flex: 3}}>
                  <TextComponent style={styles.label} type={FontType.BOLD}>
                    Phone Number
                  </TextComponent>
                </View>
                <View style={{flex: 1}}>
                  <TextComponent>:</TextComponent>
                </View>
                <TextInput
                  ref={phoneNumberRef}
                  keyboardType="phone-pad"
                  style={[
                    {
                      margin: 0,
                      flex: 6,
                      minHeight: 30,
                      padding: 0,
                      borderBottomWidth: 2,
                      paddingHorizontal: 5,
                      fontFamily: 'ProximaNova-Regular',
                    },
                    styles.value,
                  ]}
                  value={PhoneNumber}
                  onChangeText={(e) => setPhoneNumber(e)}
                  onSubmitEditing={() => licenseNumberRef.current.focus()}
                  blurOnSubmit={false}
                  //   value="sathish"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View style={{flex: 3}}>
                  <TextComponent style={styles.label} type={FontType.BOLD}>
                    Lic. Number
                  </TextComponent>
                </View>
                <View style={{flex: 1}}>
                  <TextComponent>:</TextComponent>
                </View>
                <TextInput
                  ref={licenseNumberRef}
                  style={[
                    {
                      margin: 0,
                      flex: 6,
                      minHeight: 30,
                      padding: 0,
                      borderBottomWidth: 2,
                      paddingHorizontal: 5,
                      fontFamily: 'ProximaNova-Regular',
                    },
                    styles.value,
                  ]}
                  value={LicenseNumber}
                  onChangeText={(e) => setLicenseNumber(e)}
                  //   value="sathish"
                />
              </View>
              {LicenseNumber ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View style={{flex: 3}}></View>
                  <View style={{flex: 1}}></View>
                  <View
                    style={[
                      {
                        margin: 0,
                        flex: 6,
                        minHeight: 30,
                        padding: 0,
                      },
                    ]}>
                    <ButtonComponent
                      style={{
                        elevation: 6,
                        backgroundColor: Colors.red,
                        borderRadius: 8,
                      }}>
                      Get Fines
                    </ButtonComponent>
                  </View>
                </View>
              ) : null}
            </View>
            <View
              style={{
                width: widthPerc(90),
                backgroundColor: Colors.accDividerColor,
                padding: 10,
                flex: 1,
              }}>
              <TextComponent style={[styles.label]} type={FontType.BOLD}>
                Fine List
              </TextComponent>
              <View style={{}}>
                <ComplaintCardText
                  index="1"
                  label="Fine name"
                  count="10"
                  value={'Drunk & Drive'}
                />
                <ComplaintCardText
                  index="2"
                  label="Fine name"
                  value={'Over speed'}
                  count="3"
                />
                <ComplaintCardText
                  count="1"
                  index="3"
                  label="Fine name"
                  value={'Traffic light violations'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      {Name && PhoneNumber && LicenseNumber && (
        <ButtonComponent>Fine the Driver</ButtonComponent>
      )}
    </KeyboardAvoidingView>
  );
};

export default ChooseDriver;

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 15,
  },
});
