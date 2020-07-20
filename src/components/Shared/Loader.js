import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../../constants/ThemeConstants';

const Loader = ({ params }) => (
	<View style={{ flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' }}>
		<ActivityIndicator color={Colors.green} size="large" />
	</View>
);

export default Loader;
