/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Button } from '../shared/Button/Button';
import { Alert } from '../shared/Alert/Alert';
import { Colors, Gaps } from '../shared/tokens';
import { useEffect, useState } from 'react';
import { CustomLink } from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';
import { useScreenOrientation } from '../shared/hooks';
import { Orientation } from 'expo-screen-orientation';

export default function App() {
	const [localError, setLocalError] = useState<string | undefined>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [{ accessToken, isLoading, error }, login] = useAtom(loginAtom);

	const orientation = useScreenOrientation();

	const submit = () => {
		if (!email) {
			setLocalError('Не введен email');
			return;
		}
		if (!password) {
			setLocalError('Не введен password');
			return;
		}
		console.log(email, password);
		login({ email, password });
	};

	useEffect(() => {
		if (error) {
			setLocalError(error);
		}
	}, [localError]);

	useEffect(() => {
		if (accessToken) {
			router.replace('/(app)');
		}
	}, [accessToken]);

	return (
		<View style={styles.container}>
			<Alert message={localError}></Alert>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.content}
			>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<View
						style={{
							...styles.inputs,
							flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row',
						}}
					>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48,
							}}
							placeholder="Email"
							onChangeText={setEmail}
						/>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48,
							}}
							placeholder="Пароль"
							isPassword
							onChangeText={setPassword}
						/>
					</View>
					<Button text="Войти" onPress={submit} isLoading={isLoading} />
				</View>
				<CustomLink href="/restore" text="Восстановить пароль" />
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		paddingLeft: 55,
		paddingRight: 55,
		backgroundColor: Colors.black,
		flex: 1,
		alignItems: 'center',
	},
	content: {
		alignItems: 'center',
		gap: Gaps.g50,
		maxWidth: 400,
		minWidth: '50%',
	},
	form: {
		rowGap: Gaps.g16,
		alignSelf: 'stretch',
	},
	inputs: {
		gap: Gaps.g16,
	},
	logo: {
		width: Platform.select({ ios: 220, android: 300 }),
	},
});
