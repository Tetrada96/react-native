import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { atom } from 'jotai';
import { createJSONStorage, atomWithStorage } from 'jotai/utils';
import { API } from '../api/api';
import { AuthResponse, LoginRequest } from './auth.interfaces';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

const INITIAL_STATE = {
	isLoading: false,
	accessToken: null,
	error: null,
};

export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage);

export const loginAtom = atom(
	(get) => get(authAtom),
	async (_get, set, { email, password }: LoginRequest) => {
		set(authAtom, {
			isLoading: true,
			accessToken: null,
			error: null,
		});
		try {
			const { data } = await axios.post<AuthResponse>(API.login, {
				email,
				password,
			});
			set(authAtom, {
				isLoading: false,
				accessToken: data.access_token,
				error: null,
			});
		} catch (e) {
			if (e instanceof AxiosError) {
				set(authAtom, {
					isLoading: false,
					accessToken: null,
					error: e.response?.data.message,
				});
			}
		}
	},
);

export const logoutAtom = atom(null, (_get, set) => {
	set(authAtom, INITIAL_STATE);
});

export interface AuthState {
	accessToken: string | null;
	isLoading: boolean;
	error: string | null;
}
