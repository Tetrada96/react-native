import { View, StyleSheet, Text } from 'react-native';
import { Colors, Fonst } from '../../../../shared/tokens';

export function CourseProgress({
	lolatLessons,
	passedLessons,
}: {
	lolatLessons: number;
	passedLessons: number;
}) {
	const percent = Math.round((passedLessons / lolatLessons) * 100);
	return (
		<View style={styles.wrapper}>
			<View style={styles.head}>
				<Text style={styles.textPercent}>{percent}%</Text>
				<Text style={styles.textCount}>
					{passedLessons}/{lolatLessons}
				</Text>
			</View>
			<View style={styles.bar}>
				<View
					style={{
						...styles.progress,
						width: `${percent}%`,
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: { marginBottom: 18 },
	bar: {
		height: 5,
		borderRadius: 20,
		backgroundColor: Colors.border,
	},
	head: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
	},
	progress: {
		height: 5,
		borderRadius: 20,
		backgroundColor: Colors.secondary,
	},
	textPercent: {
		color: Colors.secondary,
		fontSize: Fonst.f16,
	},
	textCount: {
		fontSize: 12,
		color: Colors.grayLight,
	},
});
