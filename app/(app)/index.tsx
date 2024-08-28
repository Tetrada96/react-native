import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { StudentCourseDescription } from '../../entities/course/model/course.model';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { CourseCard } from '../../widget/course/ui/CourseCard/CourseCard';
import { Colors } from '../../shared/tokens';

export default function MyCourses() {
	const { courses, error, isLoading } = useAtomValue(courseAtom);
	const loadCourses = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourses();
	}, []);

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
		console.log(item)
		return (
			<View style={styles.item}>
				<CourseCard {...item} />
			</View>
		);
	};

	return (
		<>
			{isLoading && (
				<ActivityIndicator size="large" color={Colors.primary} style={styles.activity} />
			)}
			{courses.length > 0 && (
				<FlatList
					data={courses}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderCourse}
					refreshControl={
						<RefreshControl
							tintColor={Colors.primary}
							titleColor={Colors.primary}
							refreshing={isLoading}
							onRefresh={loadCourses}
						/>
					}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 20,
	},
	activity: {
		marginTop: 30,
	},
});
