import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import InfoText from '../../../components/Shared/InfoText';
import { Colors } from '../../../constants/ThemeConstants';
import { heightPerc } from '../../../helpers/styleHelper';
import ImageComponent from '../../../components/Shared/ImageComponent';
import { API_IP } from '../../../constants/AppConstants';

const Basic = ({
	OwnerInfo: {
		// aadharFileId = '',
		aadharNumber = '',
		address = '',
		dob = '',
		email = '',
		firstName = '',
		gender = '',
		lastName = '',
		licenseFileId = '',
		licenseNumber = '',
		ownerId = '',
		phCountryCode = '',
		phoneNumber = '',
		profileImageId = null,
	},
}) => (
	<ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
		{/* {console.log(
      aadharFileId,
      aadharNumber,
      address,
      dob,
      email,
      firstName,
      gender,
      lastName,
      licenseFileId,
      licenseNumber,
      ownerId,
      phCountryCode,
      phoneNumber,
      profileImageId,
    )} */}
		<View style={{ padding: 10, flexDirection: 'row' }}>
			<View style={{ flex: 5, justifyContent: 'center' }}>
				<View
					style={{
						height: heightPerc(15),
						width: heightPerc(15),
						elevation: 10,
						backgroundColor: Colors.white,
						borderRadius: 8,
						overflow: 'hidden',
					}}>
					<ImageComponent
						source={{
							uri: profileImageId
								? `${API_IP}file/download/${profileImageId}`
								: 'https://pickaface.net/gallery/avatar/66961165_171026_2019_co0p.png',
						}}
					/>
				</View>
			</View>
			<View style={{ flex: 5, paddingVertical: 10 }}>
				<InfoText label="First Name" value={firstName} />
				<InfoText label="Last Name" value={lastName} />
			</View>
		</View>
		<View style={{ flexDirection: 'row', padding: 10 }}>
			<InfoText label="Date of Birth" value={dob} />
			<InfoText label="Gender" value={gender} />
		</View>
		<View style={{ flexDirection: 'row', padding: 10 }}>
			<InfoText label="Phone Number" value={phoneNumber} />
			<InfoText label="Email" value={email} />
		</View>
		<View style={{ flexDirection: 'row', padding: 10 }}>
			<InfoText label="License Number" value={licenseNumber} />
			<InfoText label="Aadhar Number" value={aadharNumber} />
		</View>

		<View style={{ flexDirection: 'row', padding: 10 }}>
			<InfoText label="Address" value={`${address.addressLine},${address.city},${address.state},${address.country},${address.zipCode}.`} />
		</View>
	</ScrollView>
);

export default Basic;
