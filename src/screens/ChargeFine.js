import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

import {Colors} from '../constants/ThemeConstants';
import Ripple from 'react-native-material-ripple';
import {widthPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import {FontType, IconType} from '../constants/AppConstants';
import ButtonComponent from '../components/Shared/ButtonComponent';
import IconComponent from '../components/Shared/IconComponent';

export default class ChargeFine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlertVisible: false,
      SelectedFines: [],
      Fines: [
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
          punishment:
            '6 months prison or 2 years jail for repetitive violation',
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
      ],
    };
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

  render() {
    const {Fines, SelectedFines, AlertVisible} = this.state;
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
          <SCLAlertButton theme="success">Pay Now</SCLAlertButton>
          <SCLAlertButton theme="default">Pay Later</SCLAlertButton>
        </SCLAlert>
        <TextComponent type={FontType.BOLD} style={{fontSize: 30, padding: 10}}>
          Select the Violation
        </TextComponent>
        <ScrollView
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
        </ScrollView>
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
