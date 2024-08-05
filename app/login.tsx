import { StyleSheet, View, Image } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Button } from '../shared/Button/Button';
import { Alert } from '../shared/Alert/Alert';
import { Colors, Gaps } from '../shared/tokens';
import { useEffect, useState } from 'react';
import { CustomLink } from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';

export default function App() {
	const [localError, setLocalError] = useState<string | undefined>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [{ accessToken, isLoading, error }, login] = useAtom(loginAtom);

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
			<View style={styles.content}>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" onChangeText={setEmail} />
					<Input placeholder="Пароль" isPassword onChangeText={setPassword} />
					<Button text="Войти" onPress={submit} isLoading={isLoading} />
				</View>
				<CustomLink href="/restore" text="Восстановить пароль" />
			</View>
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
	},
	content: {
		alignItems: 'center',
		gap: Gaps.g50,
	},
	form: {
		rowGap: Gaps.g16,
		alignSelf: 'stretch',
	},

	logo: {
		width: 220,
	},
});
