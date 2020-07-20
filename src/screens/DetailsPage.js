import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, View, Alert, BackHandler } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

import { Colors } from '../constants/ThemeConstants';
import TextComponent from '../components/Shared/TextComponent';
import VehicleInfo from './Details/VehicleInfo';
import OwnerInfo from './Details/OwnerInfo';
import ComplaintInfo from './Details/ComplaintInfo';
import ScannedInfo from './Details/ScannedInfo';
import LottieAnimation from '../components/Shared/LottieAnimation';
import { LottieFile } from '../assets/lottie';
import { heightPerc, widthPerc } from '../helpers/styleHelper';
import { FontType, IconType, GET } from '../constants/AppConstants';
import Ripple from 'react-native-material-ripple';
import IconComponent from '../components/Shared/IconComponent';
import NoData from './NoData';
import ButtonComponent from '../components/Shared/ButtonComponent';
import Services from '../services';
import { ReadmoreComponent } from '../components/Shared/ReadMore';
import PhoneCall from '../components/Shared/PhoneCall';
import NotificationService from '../../NotificationService';

const initialLayout = { width: Dimensions.get('window').width };

const ComplaintCardText = ({ label, value, isReadMore = false, rs = null, isPhoneNumber = false }) => (
	<View style={{ flexDirection: 'row', paddingVertical: 5 }}>
		<View style={{ flex: 4 }}>
			<TextComponent>{label}</TextComponent>
		</View>
		<View style={{ flex: 0.5 }}>
			<TextComponent>:</TextComponent>
		</View>
		<View style={{ flex: 7, flexDirection: 'row', justifyContent: 'space-between' }}>
			{isReadMore ? (
				<ReadmoreComponent style={{ fontWeight: 'bold' }} lines={1} text={value} />
			) : (
				<TextComponent onPress={() => isPhoneNumber && new PhoneCall().makeCall(value)} type={FontType.BOLD}>
					{value}
				</TextComponent>
			)}
		</View>
	</View>
);

const DetailsPage = (props) => {
	const [index, setIndex] = React.useState(0);
	const [LogId, setLogId] = useState(null);
	const [Loading, setLoading] = useState(true);
	const [Details, setDetails] = useState(null);
	const [VehicleInfoD, setVehicleInfo] = useState(null);
	const [OwnerInfoD, setOwnerInfo] = useState(null);
	const [ComplaintInfoD, setComplaintInfo] = useState(null);
	const [ComplaintData, setComplaintData] = useState(null);
	const [VehicleId, setVehicleId] = useState(null);
	const [Attachments, setAttachments] = useState([]);
	const [TrafficFines, setTrafficFines] = useState([]);
	const [AlertVisible, setAlertVisible] = useState(false);
	const Service = new Services();
	const notification = new NotificationService();

	const getDetails = (VehicleNo = null) => {
		// console.log('getDetails....', props.route.params);
		if (!VehicleNo) {
			let { barcodeValue, positions } = props.route.params;
			if (positions) {
				positions = JSON.parse(positions);
				const {
					coords: { latitude, longitude },
				} = positions;
				let url = `vehicle/info?latitude=${latitude}&longitude=${longitude}&labelNumber=${encodeURIComponent(barcodeValue)}`;

				Service.api(GET, url)
					.then((res) => {
						console.log('vehicle/info/complaints...', res.data);
						setDetails(res.data);
						setOwnerInfo(res.data.ownerInfo);
						setVehicleInfo(res.data.vehicleInfo);
						setVehicleId(res.data.vehicleInfo.vehicleId);
						setComplaintInfo(res.data.policeComplaints);
						setAttachments(res.data.attachments);
						setTrafficFines(res.data.trafficFines);
						setLogId(res.data.logId);
						if (res.data.policeComplaints.length > 0) {
							// alert('ha');
							setComplaintData(res.data.policeComplaints[0]);
							setAlertVisible(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		} else {
			let { positions } = props.route.params;
			if (positions) {
				positions = JSON.parse(positions);
				const {
					coords: { latitude, longitude },
				} = positions;
				let url = `vehicle?latitude=${latitude}&longitude=${longitude}&vehicleNumber=${encodeURIComponent(VehicleNo)}`;
				Service.api(GET, url)
					.then((res) => {
						console.log('vehicle/info/complaints...', res.data);
						setDetails(res.data);
						setOwnerInfo(res.data.ownerInfo || null);
						setVehicleInfo(res.data.vehicleInfo || null);
						setVehicleId(VehicleNo || null);
						setComplaintInfo(res.data.policeComplaints || []);
						setAttachments(res.data.attachments || []);
						setTrafficFines(res.data.trafficFines || []);
						setLogId(res.data.logId);
						if (res.data.policeComplaints.length > 0) {
							// alert('ha');
							setComplaintData(res.data.policeComplaints[0]);
							setAlertVisible(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
		let { VehicleNo } = props.route.params;
		getDetails(VehicleNo);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (Details && LogId) {
				new Services()
					.api(GET, `check/owner/confirmation/${LogId}`)
					.then((res) => {
						if (res.data.alert === 'ALERT') {
							notification.localNotification({
								title: 'VIN',
								message: `The Vehicle Number ${VehicleInfoD.vehicleNumber} is found to be an theft vehicle.`,
								playSound: true,
								soundName: 'default',
								//   actions: '["Yes", "No"]',
							});
							clearInterval(interval);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
			console.log('This will run every second!');
		}, 2000);

		setTimeout(() => {
			clearInterval(interval);
		}, 60000);
	}, [LogId]);

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				Alert.alert('Hold on!', 'Are you sure you want to go back?', [
					{
						text: 'Cancel',
						onPress: () => null,
						style: 'cancel',
					},
					{ text: 'YES', onPress: () => props.navigation.goBack() },
				]);
				return true;
			};

			const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

			return () => backHandler.remove();
		}, [])
	);

	const [routes] = React.useState([
		// { key: 'VehicleInfo', title: 'Vehicle' },
		// { key: 'OwnerInfo', title: 'Owner' },
		{ key: 'ComplaintInfo', title: 'Complaint' },
	]);

	const renderScene = SceneMap({
		VehicleInfo: () => <VehicleInfo VehicleInfo={VehicleInfoD} {...props} />,
		OwnerInfo: () => <OwnerInfo Attachments={Attachments} OwnerInfo={OwnerInfoD} {...props} />,
		ComplaintInfo: () => <ComplaintInfo TrafficFines={TrafficFines} ComplaintInfo={ComplaintInfoD} ComplaintData={ComplaintData} {...props} />,
	});

	const renderLabel = ({ route }) => (
		<TextComponent
			style={{
				fontFamily: 'ProximaNova-Bold',
				fontSize: 15,
				color: Colors.tabText,
			}}>
			{route.title}
		</TextComponent>
	);

	const renderHeader = (props) => (
		<TabBar
			indicatorStyle={{
				backgroundColor: Colors.primaryLightThemeColor,
				height: 1.5,
			}}
			style={{ backgroundColor: Colors.white }}
			renderLabel={renderLabel}
			{...props}
		/>
	);

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<SCLAlert
				show={AlertVisible}
				onRequestClose={() => setAlertVisible(false)}
				theme="danger"
				title="Complaint Registered"
				subtitle={`This Vehicle has an complaint`}
				headerIconComponent={<IconComponent type={IconType.Feather} name="alert-triangle" size={32} color="white" />}>
				{ComplaintData && (
					<>
						<ComplaintCardText label="Vehicle No" value={ComplaintData.vehicleNumber} />
						<ComplaintCardText label="Complaint by" value={ComplaintData.complaintBy} />
						<ComplaintCardText label="Station name" value={ComplaintData.policeStationName} />
						<ComplaintCardText label="Description" isReadMore value={ComplaintData.complaintDetail} />
						<ComplaintCardText label="Status" value={ComplaintData.state} />
						{ComplaintData.phoneNumber && <ComplaintCardText label="Phone Number" value={ComplaintData.phoneNumber} isPhoneNumber />}
					</>
				)}
				<SCLAlertButton onPress={() => setAlertVisible(false)} theme="danger">
					Understood
				</SCLAlertButton>
				{/* <SCLAlertButton
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
        </SCLAlertButton> */}
			</SCLAlert>
			{Loading ? (
				<LottieAnimation />
			) : Details ? (
				<>
					<TabView
						navigationState={{ index, routes }}
						renderTabBar={renderHeader}
						renderScene={renderScene}
						onIndexChange={setIndex}
						initialLayout={initialLayout}
					/>
					<View
						style={{
							flexDirection: 'row',
							width: widthPerc(100),
							paddingBottom: 5,
							backgroundColor: Colors.transparent,
						}}>
						<View style={{ flex: 1, alignItems: 'center' }}>
							<ButtonComponent
								style={{ width: '90%', borderRadius: 8 }}
								onPress={() =>
									props.navigation.navigate('OtpVerification', {
										VehicleId,
									})
								}>
								Verify OTP
							</ButtonComponent>
						</View>
						<View style={{ flex: 1, alignItems: 'center' }}>
							<ButtonComponent
								onPress={() => props.navigation.navigate('ChooseDriver', { VehicleId })}
								style={{
									backgroundColor: Colors.red,
									width: '90%',
									borderRadius: 8,
								}}>
								Charge Fine
							</ButtonComponent>
						</View>
					</View>
				</>
			) : (
				<NoData hasRoute {...props} text="User is not Registered with VIN" />
			)}
		</View>
	);
};

export default DetailsPage;
