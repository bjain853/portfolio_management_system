import { Advisor } from '../types/advisor';
import { LoginInfo, SignUpInfo } from '../types/auth';
import { get, post } from './api';

export async function loginHandler(loginInfo: LoginInfo): Promise<Advisor> {
	try {
		const response = await post(`/auth/login`, loginInfo);
		const advisor = response.data;
		return advisor;
	} catch (e: any) {
		console.error(e.message);
		throw Error('Unable to authenticate user');
	}
}

export async function signUpHandler(signUpInfo: SignUpInfo): Promise<boolean> {
	try {
		const response = await post(`/auth/signup`, { ...signUpInfo });
		const responseStatus = response.status;
		return responseStatus === 201;
	} catch (e: any) {
		console.error(e);
	}
	return false;
}

export async function sessionExists(): Promise<boolean> {
	try {
		const response = await get('/auth/isAuthenticated');
		return response.status === 200;
	} catch (e: any) {
		throw Error('Not authenticated user');
	}
}

export async function logout() {
	try {
		const response = await get('/auth/logout');
		return response.status === 200;
	} catch (e: any) {
		throw Error('Not logged out properly');
	}
}
