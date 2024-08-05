import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { ReactNode, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pressable, PressableProps } from 'react-native';
import { Colors, Fonst, Gaps } from '../../../../shared/tokens';

interface IMenuItemProps {
	drawer: DrawerContentComponentProps;
	icon: ReactNode;
	text: string;
	path: string;
}

export function MenuItem({ icon, drawer, path, text, ...props }: IMenuItemProps & PressableProps) {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const isActive = drawer.state.routes[drawer.state.index].name === path;
	return (
		<Pressable
			{...props}
			onPress={() => drawer.navigation.navigate(path)}
			onPressIn={() => {
				setIsClicked(true);
			}}
			onPressOut={() => setIsClicked(false)}
		>
			<View
				style={{
					...styles.menu,
					backgroundColor: isClicked || isActive ? Colors.violetDark : Colors.black,
					borderColor: isActive ? Colors.primary : Colors.black,
				}}
			>
				{icon}
				<Text style={styles.text}>{text}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	menu: {
		flexDirection: 'row',
		gap: Gaps.g20,
		paddingHorizontal: 24,
		paddingVertical: 16,
		alignItems: 'center',
		borderRightWidth: 5,
	},
	text: {
		color: Colors.white,
		fontSize: Fonst.f16,
	},
});
