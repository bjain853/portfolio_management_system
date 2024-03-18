import { createContext, useEffect, useState } from 'react';
import { api } from './api/api';
import { Advisor } from './types/advisor';

export const AdvisorContext = createContext<Advisor | undefined>(undefined);

const AdvisorContextProvider = ({ children }: any) => {
	const [advisor, setAdvisor] = useState<Advisor | undefined>(undefined);
	const advisorId = sessionStorage.getItem('advisorId');

	async function fetchAdvisorProfile() {
		try {
			const response = await api.get(`/advisors/${advisorId}`);
			setAdvisor(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (!advisor) fetchAdvisorProfile();
	}, [advisorId]);

	return (
		<AdvisorContext.Provider value={advisor}>
			{children}
		</AdvisorContext.Provider>
	);
};

export default AdvisorContextProvider;
