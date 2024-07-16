import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../shared/tokens';

export default function Restore() {
	return (
		<View>
			<Link href={'/'}>
				<Text style={{ color: Colors.white }}>Restore</Text>
			</Link>
		</View>
	);
}
