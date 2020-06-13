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

import Login from './src/screens/auth/Login';
import {Colors} from './src/constants/ThemeConstants';
import {HomeTabNavigator} from './src/navigations/TabNavigators';
import {NavigationContainer} from '@react-navigation/native';
import PermissionPage from './src/screens/PermissionPage';
import ChargeFine from './src/screens/ChargeFine';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CameraPermission: true,
      LocationPermission: true,
      User: true,
    };
  }

  componentDidMount() {
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

    if (!CameraPermission || !LocationPermission) {
      return <PermissionPage grantPermission={this.grantPermission} />;
    }

    if (!User) return <Login />;

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <NavigationContainer>
          <HomeTabNavigator />
          {/* <ChargeFine/> */}
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

export default App;
