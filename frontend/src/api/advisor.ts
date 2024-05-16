import { Advisor, ChartingData } from '../types/advisor';
import { convertMapToJSONArray } from '../util/dataProcessing';
import { get } from './api';

const BASE_PATH = '/advisors';

export async function getAdvisorProfile(): Promise<Advisor> {
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

export async function getPortfolioCurrentValueForAdvisor(
	advisorId: string,
): Promise<number> {
	const response = await get(`${BASE_PATH}/${advisorId}/current-value`);
	return response.data;
}

export async function getWeeklySecuritySummary(
	advisorId: string,
): Promise<{ labels: string[]; data: number[] }> {
	const response = await get(`${BASE_PATH}/${advisorId}/weekly-summary`);
	const mapppedData: ChartingData = convertMapToJSONArray(response.data);
	return mapppedData;
}
