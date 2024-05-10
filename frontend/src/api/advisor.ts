import { ChartingData } from '../types/advisor';
import { convertMapToJSONArray } from '../util/dataProcessing';
import { get } from './api';

const BASE_PATH = '/advisors';

export async function getAdvisorProfile() {
	try {
		const response = await get(BASE_PATH);
		return response.data;
	} catch (error) {
		throw Error(`Advisor not logged in`);
	}
}

export async function getTotalSecurityByCategoryForAdvisor(advisorId: string) {
	const response = await get(`${BASE_PATH}/${advisorId}/total-category`);
	const mapppedData: ChartingData = convertMapToJSONArray(response.data);
	return mapppedData;
}

export async function getProfitLossForAdvisor(
	advisorId: string,
): Promise<number> {
	const response = await get(`${BASE_PATH}/${advisorId}/profit-loss`);
	return response.data;
}

export async function getDailyTotalSecurityForAdvisor(
	advisorId: string,
): Promise<{ labels: string[]; data: number[] }> {
	const response = await get(`${BASE_PATH}/${advisorId}/weekly-summary`);
	const mapppedData: ChartingData = convertMapToJSONArray(response.data);
	return mapppedData;
}
