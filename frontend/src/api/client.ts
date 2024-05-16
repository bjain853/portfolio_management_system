import { Advisor } from '../types/advisor';
import { Client } from '../types/client';
import { Portfolio } from '../types/portfolio';
import { get, post } from './api';

export async function addNewClient(
	newClient: Partial<Client>,
	advisor: Advisor,
): Promise<Client> {
	if (advisor) {
		const response = await post(`/clients`, {
			...newClient,
			advisorId: advisor.id,
		});
		return response.data;
	}
	throw Error('No advisor found');
}

export async function getClients(advisor: Advisor): Promise<Client[]> {
	const response = await get(`/advisors/${advisor.id}/clients`);
	return response.data;
}

export async function getClientPortfolio(clientId: string): Promise<Portfolio> {
	const response = await get(`/portfolio/client/${clientId}`);
	return response.data;
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
