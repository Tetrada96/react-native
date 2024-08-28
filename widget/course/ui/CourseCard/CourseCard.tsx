import { View, StyleSheet, Image, Text, Linking } from 'react-native';
import { Button } from '../../../../shared/Button/Button';
import { Chip } from '../../../../shared/Chip/Chip';
import { Colors, Fonst, Gaps, Radius } from '../../../../shared/tokens';
import { StudentCourseDescription } from '../../../../entities/course/model/course.model';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { CourseProgress } from '../../../../entities/course/ui/CourseProgress/CourseProgress';

export function CourseCard({
	image,
	shortTitle,
	courseOnDirection,
	alias,
	tariff,
}: StudentCourseDescription) {
	return (
		<View style={styles.card}>
			<Image style={styles.image} source={{ uri: image }} height={200} />
			<View style={styles.header}>
				<CourseProgress lolatLessons={120} passedLessons={100} />
				<Text style={styles.title}>{shortTitle}</Text>
				<View style={styles.chips}>
					{courseOnDirection.length > 0 &&
						courseOnDirection.map((c) => <Chip key={c.direction.name} text={c.direction.name} />)}
				</View>
				<MaskedView maskElement={<Text style={styles.tariff}>Тариф &laquo;{tariff}&raquo;</Text>}>
					<LinearGradient
						colors={['#D77BE5', '#6C38CC']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
					>
						<Text style={{ ...styles.tariff, ...styles.tariffWithOpacity }}>
							Тариф &laquo;{tariff}&raquo;
						</Text>
					</LinearGradient>
				</MaskedView>
			</View>
			<View style={styles.footer}>
				<Button
					text="Купить"
					onPress={() => Linking.openURL(`https://purpleschool.ru/course/${alias}`)}
				></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		borderRadius: Radius.r10,
		backgroundColor: Colors.blackLight,
	},
	image: {
		borderRadius: 10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	title: {
		fontSize: Fonst.f20,
		color: Colors.white,
		marginBottom: 12,
	},
	chips: {
		flexDirection: 'row',
		gap: Gaps.g10,
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 18,
	},
	footer: {
		backgroundColor: Colors.violetDark,
		paddingHorizontal: 24,
		paddingVertical: 20,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	tariffWithOpacity: {
		opacity: 0,
	},
	tariff: {
		fontSize: Fonst.f16,
		marginTop: 10,
	},
});
