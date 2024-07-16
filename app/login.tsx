import { StyleSheet, View, Image } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Button } from '../shared/Button/Button';
import { Alert } from '../shared/Alert/Alert';
import { Colors, Gaps } from '../shared/tokens';
import { useState } from 'react';
import { CustomLink } from '../shared/CustomLink/CustomLink';

export default function App() {
	const [error, setError] = useState<string | undefined>();

	const alert = () => {
		setError('Неверный логин и/или пароль');
		setTimeout(() => {
			setError(undefined);
		}, 4000);
	};

	return (
		<View style={styles.container}>
			<Alert message={error}></Alert>
			<View style={styles.content}>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<Input placeholder="Email" />
					<Input placeholder="Пароль" isPassword />
					<Button text="Войти" onPress={alert} />
				</View>
				<CustomLink href="/course/typescript" text="Восстановить пароль" />
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
