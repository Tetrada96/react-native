import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CoursesIcon from '../../../../assets/menu/cources';
import ProfileIcon from '../../../../assets/menu/profile';
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer';
import { CustomLink } from '../../../../shared/CustomLink/CustomLink';
import { Colors } from '../../../../shared/tokens';
import { logoutAtom } from '../../../../entities/auth/model/auth.state';
import { loadProfileAtom } from '../../../../entities/user/model/user.state';
import { MenuItem } from '../../../../entities/layout/ui/MenuItem/MenuItem';
import { UserMenu } from '../../../user/ui/UserMenu/UserMenu';

const MENU = [
	{ text: 'Курсы', icon: <CoursesIcon />, path: 'index' },
	{ text: 'Профиль', icon: <ProfileIcon />, path: 'profile' },
];

export function CustomDrawer(props: DrawerContentComponentProps) {
	const logout = useSetAtom(logoutAtom);
	const [profile, loadProfile] = useAtom(loadProfileAtom);

	useEffect(() => {
		loadProfile();
	}, []);
	return (
		<DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
			<View style={styles.content}>
				<CloseDrawer {...props.navigation} />
				<UserMenu user={profile.profile} />
				{MENU.map((menu) => (
					<MenuItem key={menu.path} {...menu} drawer={props} />
				))}
			</View>
			<View style={styles.footer}>
				<CustomLink text="Выход" onPress={() => logout()} href="/login" />
				<Image
					style={styles.logo}
					source={require('../../../../assets/logo.png')}
					resizeMode="contain"
				/>
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	content: {
		flex: 1,
	},
	footer: {
		gap: 50,
		marginBottom: 40,
		alignItems: 'center',
	},
	logo: {
		width: 160,
	},
});
