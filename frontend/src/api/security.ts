import { get } from './api';

export async function getSecurityCategories(): Promise<string[]> {
	const response = await get(`/security/categories`);
	return response.data;
}
