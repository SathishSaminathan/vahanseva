import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {Colors} from '../constants/ThemeConstants';
import {NavigationHeader, CustomButton} from './OTP/lib';
import {GenericStyles} from './OTP/styles/GenericStyles';
import TextComponent from '../components/Shared/TextComponent';
import {FontType} from '../constants/AppConstants';
import {widthPerc} from '../helpers/styleHelper';
import TimerText from './OTP/components/otp/TimerText';
import ButtonComponent from '../components/Shared/ButtonComponent';
import {ScrollView} from 'react-native-gesture-handler';

const RESEND_OTP_TIME_LIMIT = 3; // 30 secs

let resendOtpTimerInterval;

export default class VerifyVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VehicleNo: '',
      resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT,
      OTP: '',
    };
  }

  startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (this.state.resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
        this.setState({
          resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT,
        });
      } else {
        this.setState({
          resendButtonDisabledTime: this.state.resendButtonDisabledTime - 1,
        });
      }
    }, 1000);
  };

  render() {
    const {VehicleNo, resendButtonDisabledTime, OTP} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <NavigationHeader
          title={'Go back'}
          leftIconAction={() => alert('hai')}
          leftIconType={'back'}
          containerStyle={GenericStyles.navigationHeaderBorder}
        />
        <ScrollView contentContainerStyle={{alignItems: 'center', flexGrow: 1}}>
          <TextComponent
            style={{fontSize: 25, alignSelf: 'center', paddingVertical: 10}}
            type={FontType.BOLD}>
            Verify Vehicle
          </TextComponent>

          <View
            style={{
              width: widthPerc(80),
              borderWidth: 3,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <TextInputMask
              autoCapitalize="characters"
              autoFocus
              type={'custom'}
              options={{
                /**
                 * mask: (String | required | default '')
                 * the mask pattern
                 * 9 - accept digit.
                 * A - accept alpha.
                 * S - accept alphanumeric.
                 * * - accept all, EXCEPT white space.
                 */
                mask: 'AA 99 AA 9999',
              }}
              style={{fontSize: 30}}
              value={VehicleNo}
              onChangeText={(VehicleNo) => {
                this.setState({
                  VehicleNo,
                });
              }}
            />
          </View>
          <View style={{height: 90}}>
            {resendButtonDisabledTime === RESEND_OTP_TIME_LIMIT && (
              <ButtonComponent
                style={{width: widthPerc(80), borderRadius: 10, marginTop: 10}}
                onPress={() => this.startResendOtpTimer()}>
                Send OTP
              </ButtonComponent>
            )}
            {resendButtonDisabledTime > 0 &&
              resendButtonDisabledTime !== RESEND_OTP_TIME_LIMIT && (
                <TimerText
                  text={'Resend OTP in'}
                  time={resendButtonDisabledTime}
                />
              )}
          </View>

          <OTPInputView
            style={{width: '80%', height: 80}}
            pinCount={4}
            autoFocusOnLoad={false}
            code={OTP} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={(OTP) => {
              this.setState({OTP});
            }}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // onCodeFilled={(OTP) => {
            //   this.setState({OTP});
            // }}
          />
        </ScrollView>
        {OTP.length === 4 && (
          <ButtonComponent
            style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
            onPress={() => this.props.navigation.navigate('DetailsPage')}>
            Submit OTP
          </ButtonComponent>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 45,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderWidth: 1,
    fontWeight: 'bold',
    color: Colors.themeBlack,
  },
});
