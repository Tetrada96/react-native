import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, Pressable, View } from 'react-native';
import { Colors } from '../tokens';
import EyeClosedIcon from '../../assets/icons/eyeClosed';
import EyeOpenIcon from '../../assets/icons/eyeOpened';

export function Input({ isPassword, style, ...props }: TextInputProps & { isPassword?: boolean }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	return (
		<View style={style}>
			<TextInput
				style={styles.input}
				placeholderTextColor={Colors.gray}
				secureTextEntry={isPassword && !isPasswordVisible}
				{...props}
			/>
			{isPassword && (
				<Pressable onPress={() => setIsPasswordVisible((state) => !state)} style={styles.eyeIcon}>
					{isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: Colors.violetDark,
		paddingHorizontal: 24,
		height: 58,
		borderRadius: 10,
		fontSize: 16,
		lineHeight: 1.2,
		color: Colors.gray,
		fontFamily: 'FiraSans',
	},
	eyeIcon: {
		position: 'absolute',
		right: 0,
		paddingHorizontal: 20,
		paddingVertical: 18,
	},
});
