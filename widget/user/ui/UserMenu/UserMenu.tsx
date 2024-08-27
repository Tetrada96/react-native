import { View, StyleSheet, Text } from 'react-native';
import { Colors, Fonst, Gaps } from '../../../../shared/tokens';
import { User } from '../../../../entities/user/model/user.model';
import { Avatar } from '../../../../entities/user/ui/Avatar/Avatar';

export function UserMenu({ user }: { user: User | null }) {
	if (!user) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Avatar image={user.photo ?? null} />
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
	nane: {
		fontSize: Fonst.f16,
		color: Colors.white,
	},
});
