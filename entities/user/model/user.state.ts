import axios, { AxiosError } from 'axios';
import { atom } from 'jotai';
import { authAtom } from '../../auth/model/auth.state';
import { API } from '../api/api';
import { Profile, User } from './user.model';

export const profileAtom = atom<UserState>({
	profile: null,
	isLoading: false,
	error: null,
});

export const updateProfileAtom = atom(
	async (get) => {
		return get(profileAtom);
	},
	async (get, set, { photo }: { photo: string }) => {
		try {
			const { accessToken } = await get(authAtom);
			const { data } = await axios.patch<Profile>(
				API.profile,
				{
					photo: photo,
				},
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				},
			);
			set(profileAtom, {
				isLoading: false,
				profile: data.profile,
				error: null,
			});
		} catch (e) {
			if (e instanceof AxiosError) {
				set(profileAtom, {
					isLoading: false,
					profile: null,
					error: e.response?.data.message,
				});
			}
		}
	},
);

export const loadProfileAtom = atom(
	async (get) => {
		return get(profileAtom);
	},
	async (get, set) => {
		const { accessToken } = await get(authAtom);
		set(profileAtom, {
			isLoading: true,
			profile: null,
			error: null,
		});
		try {
			const { data } = await axios.get<Profile>(API.profile, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			set(profileAtom, {
				isLoading: false,
				profile: data.profile,
				error: null,
			});
		} catch (e) {
			if (e instanceof AxiosError) {
				set(profileAtom, {
					isLoading: false,
					profile: null,
					error: e.response?.data.message,
				});
			}
		}
	},
);

export interface UserState {
	profile: User | null;
	isLoading: boolean;
	error: string | null;
}
