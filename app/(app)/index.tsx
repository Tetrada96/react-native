import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { StudentCourseDescription } from '../../entities/course/model/course.model';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { CourseCard } from '../../widget/course/ui/CourseCard/CourseCard';
import { Colors } from '../../shared/tokens';
import { Button } from '../../shared/Button/Button';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export default function MyCourses() {
	const { courses, isLoading } = useAtomValue(courseAtom);
	const loadCourses = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourses();
	}, []);

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
		return (
			<View style={styles.item}>
				<CourseCard {...item} />
			</View>
		);
	};

	const allowsNotification = async () => {
		const settings = await Notifications.getPermissionsAsync();
		return (
			settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
		);
	};

	const requestPermissions = async () => {
		return Notifications.requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true,
			},
		});
	};

	const scheduleNotification = async () => {
		const granted = await allowsNotification();
		if (!granted) {
			await requestPermissions();
		}
		if (Device.isDevice) {
			const token = await Notifications.getExpoPushTokenAsync({
				projectId: Constants.expoConfig?.extra?.eas.projectId,
			});
			console.log(token);
		}
		// Notifications.scheduleNotificationAsync({
		// 	content: {
		// 		title: 'Новый курс typescript',
		// 		body: 'Не забывай учиться каждый день!',
		// 		data: { alias: 'typescript' },
		// 	},
		// 	trigger: {
		// 		seconds: 5,
		// 	},
		// });
	};

	return (
		<>
			{isLoading && (
				<ActivityIndicator size="large" color={Colors.primary} style={styles.activity} />
			)}
			<Button text="Напомнить" onPress={scheduleNotification} />
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
