import React, { useState } from 'react';
import { useEffect } from 'react';
import { Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { Colors, Fonst } from '../tokens';

interface IAlertProps {
	message?: string;
}

export const Alert = ({ message }: IAlertProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const animatedValue = new Animated.Value(-100);

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		if (!message) return;
		setIsShow(true);
		const timerId = setTimeout(() => {
			setIsShow(false);
		}, 3000);
		return () => {
			clearTimeout(timerId);
		};
	}, [message]);

	if (!isShow) return null;
	return (
		<Animated.View
			style={{ ...styles.alert, transform: [{ translateY: animatedValue }] }}
			onLayout={onEnter}
		>
			<Text style={styles.text}>{message}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	alert: {
		backgroundColor: Colors.red,
		height: 50,
		fontSize: Fonst.f16,
		lineHeight: 1.2,
		color: Colors.white,
		position: 'absolute',
		width: Dimensions.get('screen').width,
		padding: 15,
		top: 50,
	},
	text: {
		textAlign: 'center',
		fontFamily: 'FiraSans',
	},
});
