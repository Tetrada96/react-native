import React from 'react';
import {
	Pressable,
	Text,
	PressableProps,
	StyleSheet,
	Animated,
	GestureResponderEvent,
	ActivityIndicator,
} from 'react-native';
import { Colors, Fonst } from '../tokens';

export function Button(props: PressableProps & { text: string; isLoading?: boolean }) {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, Colors.primary],
	});

	const fadeIn = (event: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 10,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressIn && props.onPressIn(event);
	};

	const fadeOut = (event: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressOut && props.onPressOut(event);
	};

	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
			<Animated.View
				style={{
					...styles.button,
					backgroundColor: color,
				}}
			>
				{props.isLoading ? (
					<ActivityIndicator size="large" color={Colors.white} />
				) : (
					<Text style={styles.text}>{props.text}</Text>
				)}
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 18,
		alignItems: 'center',
		height: 58,
		justifyContent: 'center',
		borderRadius: 10,
	},
	text: {
		fontSize: Fonst.f16,
		color: Colors.white,
		fontFamily: 'FiraSans',
	},
});
