import { api } from './api';

export interface LoginInfo {
	username: string;
	password: string;
}

export interface SignUpInfo {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export async function loginHandler(
	loginInfo: LoginInfo,
): Promise<string | null> {
	if (import.meta.env.DEV) {
		const testId = 'fef0e0e2-8c7e-463a-af86-651eac2a71fe';
		sessionStorage.setItem('advisorId', testId);
		return testId;
	}
	try {
		const response = await api.post(`/auth/login`, { loginInfo });
		if (response.status === 200) {
			const advisorProfile = response.data;
			sessionStorage.setItem(
				'advisorId',
				JSON.stringify(advisorProfile.id),
			);
			return advisorProfile.id;
		} else {
			console.error(response.status);
		}
	} catch (e: any) {
		console.error(e);
	}
	return null;
}

export async function signUpHandler(
	signUpInfo: SignUpInfo,
): Promise<string | null> {
	try {
		const response = await api.post(`/auth/signup`, signUpInfo);
		if (response.status === 200) {
			const advisorProfile = response.data;
			sessionStorage.setItem(
				'advisorId',
				JSON.stringify(advisorProfile.id),
			);
			return advisorProfile.id;
		} else {
			console.error(response.status);
		}
	} catch (e: any) {
		console.error(e);
	}
	return null;
}
