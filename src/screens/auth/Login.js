import React, {Component} from 'react';
import {Text, View, TextInput, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import {Colors} from '../../constants/ThemeConstants';
import {widthPerc, heightPerc} from '../../helpers/styleHelper';
import ButtonComponent from '../../components/Shared/ButtonComponent';
import ImageComponent from '../../components/Shared/ImageComponent';
import {Images} from '../../assets/images/Images';
import Services from '../../services';
import {POST, AppVariables} from '../../constants/AppConstants';
import {setUser} from '../../store/actions';
import {storeData} from '../../helpers/utils';
import Toast from 'react-native-tiny-toast';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'police@example.com',
      password: 'MTIzNDU2',
    };
    this.Service = new Services();
  }

  login = () => {
    const {toggleLoading, setUser} = this.props;
    this.Service.api(POST, 'users/authenticate', {
      ...this.state,
    })
      .then((res) => {
        setUser({accessToken: res.data.accessToken});
        storeData(AppVariables.USER, {
          accessToken: res.data.accessToken,
        });
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(JSON.stringify(err) );
        Toast.show(JSON.stringify(err), {
          position: Toast.position.CENTER,
          containerStyle: {backgroundColor: Colors.red},
          textStyle: {},
          // imgSource: require('xxx'),
          imgStyle: {},
          // mask: true,
          maskStyle: {},
        });
      });
  };

  render() {
    const {userName, password} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <View style={{width: widthPerc(90), alignSelf: 'center'}}>
          <View
            style={{
              width: '100%',
              height: heightPerc(20),
              alignSelf: 'center',
              marginTop: '25%',
              marginBottom: '5%',
            }}>
            <ImageComponent resizeMode="contain" source={Images.vehicle} />
          </View>
          <TextInput
            tintColor={Colors.themeBlack}
            label="Email/Mobile"
            style={{fontFamily: 'ProximaNova-Regular'}}
            value={userName}
          />
          <TextInput
            tintColor={Colors.themeBlack}
            label="Password"
            secureTextEntry
            value={password}
          />
          <ButtonComponent onPress={() => this.login()} style={{marginTop: 10}}>
            Login
          </ButtonComponent>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (value) => dispatch(setUser(value)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
