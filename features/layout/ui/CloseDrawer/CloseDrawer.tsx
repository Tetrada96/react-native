import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import CloseIcon from '../../../../assets/icons/close';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CloseDrawer(navigation: DrawerNavigationHelpers) {
	return (
		<Pressable onPress={() => navigation.closeDrawer()}>
			<View
				style={{
					...styles.button,
				}}
			>
				<CloseIcon />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 20,
		right: 20,
	},
});
