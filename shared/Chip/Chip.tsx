import { Text, View, StyleSheet } from 'react-native';
import { Colors, Fonst, Radius } from '../tokens';

export function Chip({ text }: { text: string }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: Colors.border,
		borderRadius: Radius.r17,
		borderWidth: 1,
	},
	text: {
		fontSize: Fonst.f14,
		color: Colors.white,
	},
});
