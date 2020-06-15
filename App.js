/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {check, PERMISSIONS} from 'react-native-permissions';
import {connect} from 'react-redux';

import Login from './src/screens/auth/Login';
import {Colors} from './src/constants/ThemeConstants';
import {HomeTabNavigator} from './src/navigations/TabNavigators';
import {NavigationContainer} from '@react-navigation/native';
import PermissionPage from './src/screens/PermissionPage';
import {setUser, toggleLoading} from './src/store/actions';
import {getData} from './src/helpers/utils';
import { AppVariables } from './src/constants/AppConstants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CameraPermission: true,
      LocationPermission: true,
      User: null,
    };
  }

  checkForUser = async () => {
    const {setUser} = this.props;
    const user = await getData(AppVariables.USER);
    console.log("user user user", user)
    if (user) {
      setUser(user);
    }
  };

  componentDidMount() {
    this.checkForUser();
    setTimeout(() => {
      this.props.toggleLoading(false);
    }, 1500);
    this.checkForPermission(PERMISSIONS.ANDROID.CAMERA, 'CameraPermission');
    this.checkForPermission(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      'LocationPermission',
    );
  }

  grantPermission = () => {
    this.setState({
      CameraPermission: true,
      LocationPermission: true,
    });
  };

  checkForPermission = (value, label) => {
    check(value).then((result) => {
      this.setState({
        [label]: result !== 'denied' ? true : false,
      });
    });
  };

  render() {
    const {CameraPermission, LocationPermission, User} = this.state;

    const {current_user} = this.props;

    console.log('current_user...', current_user);

    if (!CameraPermission || !LocationPermission) {
      return <PermissionPage grantPermission={this.grantPermission} />;
    }

    if (!current_user) return <Login />;

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <NavigationContainer>
          <HomeTabNavigator />
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const mapStateToProps = ({user: {current_user, isLoading}}) => {
  return {
    current_user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (value) => dispatch(setUser(value)),
    toggleLoading: (value) => dispatch(toggleLoading(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
