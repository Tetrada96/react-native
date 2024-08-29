import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../shared/tokens';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Notification } from '../shared/Notification/Notification';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const insets = useSafeAreaInsets();
	const [loaded, error] = useFonts({
		FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
		FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		if (error) {
			throw error;
		}
	}, [error]);

	if (!loaded) return null;

	return (
		<SafeAreaProvider>
			<Notification />
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					statusBarColor: Colors.black,
					headerShown: false,
					contentStyle: {
						backgroundColor: Colors.black,
						paddingTop: insets.top,
					},
				}}
			>
				<Stack.Screen name="login" />
				<Stack.Screen
					name="restore"
					options={{
						presentation: 'modal',
					}}
				/>
			</Stack>
		</SafeAreaProvider>
	);
}
