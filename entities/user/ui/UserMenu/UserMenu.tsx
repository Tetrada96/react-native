import { View, Image, StyleSheet, Text } from 'react-native';
import { Colors, Fonst, Gaps } from '../../../../shared/tokens';
import { User } from '../../model/user.model';

export function UserMenu({ user }: { user: User | null }) {
	if (!user) {
		return null;
	}

	return (
		<View style={styles.container}>
			{user.photo ? (
				<Image style={styles.image} source={{ uri: user.photo }} />
			) : (
				<Image style={styles.image} source={require('../../../../assets/images/avatar.png')} />
			)}
			<Text style={styles.nane}>
				{user.name} {user.surname}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: Gaps.g8,
		marginTop: 30,
		marginBottom: 40,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
	nane: {
		fontSize: Fonst.f16,
		color: Colors.white,
	},
});
