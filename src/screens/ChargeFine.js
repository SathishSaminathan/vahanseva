import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableNativeFeedback,
  FlatList,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import {CommonActions} from '@react-navigation/native';

import {Colors} from '../constants/ThemeConstants';
import Ripple from 'react-native-material-ripple';
import {widthPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import {FontType, IconType, GET} from '../constants/AppConstants';
import ButtonComponent from '../components/Shared/ButtonComponent';
import IconComponent from '../components/Shared/IconComponent';
import {TextInput} from 'react-native-gesture-handler';
import Services from '../services';

let list = [
  {
    fineId: 16,
    fineType: 'General traffic rule violations',
    fineCost: 500,
    punishment: 'Bike Ceased',
  },
  {
    fineId: 1,
    fineType: 'Drunk driving/riding',
    fineCost: 10000,
    punishment: '6 months prison or 2 years jail for repetitive violation',
  },
  {
    fineId: 2,
    fineType: 'General traffic rule violations',
    fineCost: 500,
    punishment: null,
  },
  {
    fineId: 3,
    fineType: 'Violations of road rules and regulations',
    fineCost: 500,
    punishment: null,
  },
  {
    fineId: 4,
    fineType: 'Driving vehicle without valid registration certificate',
    fineCost: 5000,
    punishment: null,
  },
  {
    fineId: 5,
    fineType: 'Driving without licence',
    fineCost: 5000,
    punishment: null,
  },
  {
    fineId: 6,
    fineType: 'Disobeying orders of traffic police',
    fineCost: 2000,
    punishment: null,
  },
  {
    fineId: 7,
    fineType: 'Driving an oversized vehicle',
    fineCost: 5000,
    punishment: null,
  },
  {
    fineId: 8,
    fineType: 'Riding without a helmet',
    fineCost: 1000,
    punishment: 'ban of riding licence for 3 months',
  },
  {
    fineId: 9,
    fineType: 'Rash and negligent driving',
    fineCost: 5000,
    punishment: null,
  },
];
export default class ChargeFine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlertVisible: false,
      SelectedFines: [],
      Fines: [],
      arrayholder: list,
      SearchText: '',
      Loading: true,
    };
    this.Service = new Services();
  }

  getFineList = () => {
    this.Service.api(GET, `fines?dataLength=100`)
      .then((res) => {
        this.setState({
          Fines: res.data.fineResponseDTOs,
          arrayholder: res.data.fineResponseDTOs,
          Loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getFineList();
    const backAction = () => {
      if (this.state.SearchText) {
        this.setState({
          SearchText: '',
          Fines: this.state.arrayholder,
        });
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }

  handleChange = (fineData, Fines) => {
    const {SelectedFines} = this.state;
    let selectedfines = SelectedFines;
    let IsSelected = SelectedFines.filter(
      (selectedfines) => selectedfines.fineId === fineData.fineId,
    );
    if (IsSelected.length > 0) {
      selectedfines = SelectedFines.filter(
        (selectedfines) => selectedfines.fineId !== fineData.fineId,
      );
    } else {
      selectedfines.push(fineData);
    }
    this.setState(
      {
        SelectedFines: selectedfines,
      },
      () => console.log(this.state.SelectedFines),
    );
    // let Fine = Fines.map((fine) => {
    //   if (fine.fineType === fineType) {
    //     return {
    //       ...fine,
    //       selected,
    //     };
    //   } else return fine;
    // });
    // this.setState({
    //   Fines: Fine,
    // });
  };

  checkForSelected = (fineId) =>
    Object.keys(
      this.state.SelectedFines.find((fine) => fine.fineId === fineId) || false,
    ).length;

  renderHeader = () => {
    const {SearchText} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 8,
          borderWidth: 3,
          margin: 5,
        }}>
        <View style={{flex: 9}}>
          <TextInput
            style={{fontFamily: 'ProximaNova-Regular', fontSize: 18}}
            placeholder="Search Violation"
            onChangeText={(SearchText) =>
              this.setState(
                {
                  SearchText,
                },
                () => this.searchFilterFunction(SearchText),
              )
            }
            value={SearchText}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              SearchText: '',
              Fines: this.state.arrayholder,
            })
          }
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <IconComponent
            type={IconType.AntDesign}
            name={SearchText ? 'closecircleo' : 'search1'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    );
  };

  searchFilterFunction = (text) => {
    const newData = this.state.arrayholder.filter((item) => {
      const itemData = `${item.fineType.toUpperCase()}   
      ${item.fineType.toUpperCase()} ${item.fineType.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({Fines: newData});
  };

  render() {
    const {Fines, SelectedFines, AlertVisible, Loading} = this.state;
    const TotalAmount = SelectedFines.reduce(
      (sum, {fineCost}) => sum + fineCost,
      0,
    );
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <SCLAlert
          show={AlertVisible}
          onRequestClose={() =>
            this.setState({
              AlertVisible: false,
            })
          }
          theme="success"
          title="Payment"
          subtitle={`Your total fine cost ${TotalAmount}`}
          headerIconComponent={
            <IconComponent
              type={IconType.Ionicons}
              name="ios-thumbs-up"
              size={32}
              color="white"
            />
          }>
          <SCLAlertButton
            onPress={() => this.props.navigation.navigate('PaymentSuccess')}
            theme="success">
            Pay Now
          </SCLAlertButton>
          <SCLAlertButton
            onPress={() =>
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'History'}],
                }),
              )
            }
            theme="default">
            Pay Later
          </SCLAlertButton>
        </SCLAlert>
        <TextComponent type={FontType.BOLD} style={{fontSize: 30, padding: 10}}>
          Select the Violation
        </TextComponent>

        {/* <ScrollView
          contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}>
          {Fines.map((data, i) => (
            <TouchableNativeFeedback
              key={i}
              onPress={() => this.handleChange(data, Fines)}>
              <View
                style={{
                  width: widthPerc(100),
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  height: 70,
                }}>
                <View style={{flex: 7, paddingRight: 10}}>
                  <TextComponent style={styles.label}>
                    {data.fineType}
                  </TextComponent>
                </View>
                <View style={{flex: 2}}>
                  <TextComponent style={[styles.label]} type={FontType.BOLD}>
                    {data.fineCost}
                  </TextComponent>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                  <CheckBox
                    isChecked={this.checkForSelected(data.fineId)}
                    onClick={(e) => console.log(e)}
                    // style={{marginRight: 20, marginLeft: 10}}
                  />
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </ScrollView> */}
        {Loading ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator color={Colors.themeBlack} size="large" />
          </View>
        ) : (
          <FlatList
            data={Fines}
            renderItem={({item}) => (
              <TouchableNativeFeedback
                onPress={() => this.handleChange(item, Fines)}>
                <View
                  style={{
                    width: widthPerc(100),
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    height: 70,
                  }}>
                  <View style={{flex: 7, paddingRight: 10}}>
                    <TextComponent style={styles.label}>
                      {item.fineType}
                    </TextComponent>
                  </View>
                  <View style={{flex: 2}}>
                    <TextComponent style={[styles.label]} type={FontType.BOLD}>
                      {item.fineCost}
                    </TextComponent>
                  </View>
                  <View style={{flex: 2, alignItems: 'center'}}>
                    <CheckBox
                      isChecked={this.checkForSelected(item.fineId)}
                      onClick={(e) => console.log(e)}
                      // style={{marginRight: 20, marginLeft: 10}}
                    />
                  </View>
                </View>
              </TouchableNativeFeedback>
            )}
            keyExtractor={(item) => item.fineId}
            // ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        )}
        <ButtonComponent
          disabled={TotalAmount === 0}
          onPress={() =>
            this.setState({
              AlertVisible: true,
            })
          }>
          {`Pay  ${TotalAmount !== 0 ? TotalAmount : ''}`}
        </ButtonComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  label: {
    fontSize: 18,
  },
});
