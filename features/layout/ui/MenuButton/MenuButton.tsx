import React, { useState } from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import MenuIcon from '../../../../assets/icons/menu';
import { Colors } from '../../../../shared/tokens';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MenuButton({ navigation, ...props }: PressableProps & { navigation: any }) {
	const [clicked, setCkicked] = useState<boolean>(false);
	return (
		<Pressable
			{...props}
			onPressIn={() => setCkicked(true)}
			onPressOut={() => setCkicked(false)}
			onPress={() => navigation.toggleDrawer()}
		>
			<View
				style={{
					...styles.button,
					backgroundColor: clicked ? Colors.violetDark : Colors.blackLight,
				}}
			>
				<MenuIcon />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		paddingHorizontal: 20,
	},
});
