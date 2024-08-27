import { SplashScreen, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../entities/auth/model/auth.state';
import { CustomDrawer } from '../../widget/layout/ui/CustomDrawer/CustomDrawer';
import { MenuButton } from '../../features/layout/ui/MenuButton/MenuButton';
import { Colors, Fonst } from '../../shared/tokens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { accessToken } = useAtomValue(authAtom);

	if (!accessToken) {
		return <Redirect href="/login" />;
	}

	return (
		<GestureHandlerRootView style={styles.wrapper}>
			<Drawer
				drawerContent={(props) => <CustomDrawer {...props} />}
				screenOptions={({ navigation }) => ({
					headerStyle: {
						backgroundColor: Colors.blackLight,
						shadowOpacity: 0,
						shadowColor: Colors.blackLight,
					},
					headerTitleStyle: {
						color: Colors.white,
						fontFamily: 'FiraSans',
						fontSize: Fonst.f20,
					},
					headerTitleAlign: 'center',
					sceneContainerStyle: {
						backgroundColor: Colors.black,
					},
					headerLeft: () => {
						return <MenuButton navigation={navigation} />;
					},
				})}
			>
				<Drawer.Screen
					name="index"
					options={{
						title: 'Мои курсы',
					}}
				/>
				<Drawer.Screen
					name="profile"
					options={{
						title: 'Профиль',
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});
