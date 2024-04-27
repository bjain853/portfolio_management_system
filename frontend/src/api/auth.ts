import { LoginInfo, SignUpInfo } from '../types/auth';
import { get, post } from './api';

export async function loginHandler(
	loginInfo: LoginInfo,
): Promise<string | null> {
	try {
		const response = await post(`/auth/login`, { ...loginInfo }, false);
		const advisorId = response.data;
		return advisorId;
	} catch (e: any) {
		console.error('Invalid credentials');
		return null;
	}
}

export async function signUpHandler(
	signUpInfo: SignUpInfo,
): Promise<string | null> {
	try {
		const response = await post(`/auth/signup`, { ...signUpInfo }, false);
		const advisorProfile = response.data;
		return advisorProfile;
	} catch (e: any) {
		console.error(e);
	}
	return null;
}

export async function checkAuthenticated() {
	try {
		const response = await get('/auth/isAuthenticated');
		return response.status;
	} catch (e: any) {
		throw Error('Not authenticated user');
	}
}
