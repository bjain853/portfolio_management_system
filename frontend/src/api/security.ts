import { ISecurityCategoryRecord } from '../types/security';
import { api } from './api';

const dashboardCache: any = (() => {
	const storedCache = sessionStorage.getItem('dashboardCache');
	if (!storedCache) return {};
	return JSON.parse(storedCache);
})();

export async function getTotalSecurityByCategoryForAdvisor(advisorId: string) {
	if (!dashboardCache['security-by-category']) {
		const response = await api.get(`/security/${advisorId}/total-category`);
		const dataArray: ISecurityCategoryRecord[] = [];
		for (const [key, value] of Object.entries(response.data)) {
			dataArray.push({
				security_type: key,
				total_value: parseFloat(`${value}`),
			});
		}
		dashboardCache['security-by-category'] = dataArray;
	}
	return dashboardCache['security-by-category'];
}

export async function getTotalSecurityForAdvisor(
	advisorId: string,
): Promise<number> {
	const cachedTotalValue = dashboardCache['total-security'];
	if (!cachedTotalValue) {
		const response = await api.get(`/security/${advisorId}/total`);
		dashboardCache['total-security'] = response.data;
	}
	return dashboardCache['total-security'];
}

export async function getDailyTotalSecurityForAdvisor(advisorId: string) {
	const cachedDailyTotal = dashboardCache['daily-total'];
	if (!cachedDailyTotal) {
		const response = await api.get(`/security/${advisorId}/weekly-total`);
		const labels: string[] = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
		];

		const data = labels.map((label) =>
			parseFloat(response.data[label.toUpperCase()]),
		);
		dashboardCache['daily-total'] = { labels, data };
	}
	return dashboardCache['daily-total'];
}

export async function addNewSecurity(
	newSecurityInformation: any,
	portfolioId: string,
) {
	console.log(
		`POST: portoflio/${portfolioId} with content: ${JSON.stringify(
			newSecurityInformation,
		)}`,
	);
}

export async function getSecurityCategories(): Promise<string[]> {
	const response = await api.get(`/security/categories`);
	return response.data;
}

export function writeDashboardCache() {
	sessionStorage.setItem('dashboardCache', JSON.stringify(dashboardCache));
}
