import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Colors} from '../../constants/ThemeConstants';
import {widthPerc} from '../../helpers/styleHelper';
import ButtonComponent from '../../components/Shared/ButtonComponent';
import ImageComponent from '../../components/Shared/ImageComponent';

export default class Login extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={{width: widthPerc(90), alignSelf: 'center'}}>
          <View
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              marginTop: '25%',
              marginBottom: '5%',
            }}>
            <ImageComponent
            resizeMode="contain"
              source={{
                uri:
                  'https://www.freepnglogos.com/uploads/cleveland-auto-show-car-logo-png-25.png',
              }}
            />
          </View>
          <TextField
            tintColor={Colors.themeBlack}
            label="Email/Mobile"
            style={{fontFamily: 'ProximaNova-Regular'}}
          />
          <TextField
            tintColor={Colors.themeBlack}
            label="Password"
            secureTextEntry
          />
          <ButtonComponent style={{marginTop: 10}}>Login</ButtonComponent>
        </View>
      </View>
    );
  }
}
