import axios, { AxiosError } from 'axios';
import { atom } from 'jotai';
import { authAtom } from '../../auth/model/auth.state';
import { API } from '../api/api';
import { Courses, StudentCourseDescription } from './course.model';

export const courseAtom = atom<CourseState>({
	courses: [],
	isLoading: false,
	error: null,
});

export const loadCourseAtom = atom(
	async (get) => {
		return get(courseAtom);
	},
	async (get, set) => {
		try {
			const { accessToken } = await get(authAtom);
			set(courseAtom, {
				isLoading: true,
				courses: [],
				error: null,
			});
			const { data } = await axios.get<Courses>(
				API.my,

				{
					headers: { Authorization: `Bearer ${accessToken}` },
				},
			);
			set(courseAtom, {
				isLoading: false,
				courses: data.my,
				error: null,
			});
		} catch (e) {
			if (e instanceof AxiosError) {
				set(courseAtom, {
					isLoading: false,
					courses: [],
					error: e.response?.data.message,
				});
			}
		}
	},
);

export interface CourseState {
	courses: StudentCourseDescription[];
	isLoading: boolean;
	error: string | null;
}
