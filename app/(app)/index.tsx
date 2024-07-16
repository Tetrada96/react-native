import { useAtom } from 'jotai';
import { Text, View } from 'react-native';
import { profileAtom } from '../../entities/user/model/user.state';
import axios from 'axios';

export default function MyCourses() {
	const [profile] = useAtom(profileAtom);

	const login = async () => {
		const { data } = axios.post('', {
			email: '',
			password: '',
		});
	}

	return (
		<View>
			<Text>{profile.profile?.name}</Text>
		</View>
	);
}
