import { get } from './api';

const BASE_PATH = '/security';

export async function getSecurityCategories(): Promise<string[]> {
	const response = await get(`${BASE_PATH}/categories`);
	return response.data;
}

export async function getSecurityNamesByCategory(
	category: string,
): Promise<string[]> {
	const response = await get(`${BASE_PATH}/${category}/names`);
	return response.data;
}

export async function getSecurityLatestPrice(
	securityName: string,
): Promise<number> {
	const response = await get(`${BASE_PATH}/latest-price/${securityName}`);
	return response.data;
}
