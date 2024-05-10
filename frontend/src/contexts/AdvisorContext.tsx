import { createContext, useContext, useEffect, useState } from 'react';
import { Advisor } from '../types/advisor';
import { getAdvisorProfile } from '../api/advisor';

const AdvisorContext = createContext<any>(undefined);

const AdvisorContextProvider = ({ children }: any) => {
	const [advisor, setAdvisor] = useState<Advisor | undefined>(undefined);

	useEffect(() => {
		if (!advisor) {
			getAdvisorProfile().then((response) => setAdvisor(response.data));
		}
	}, [advisor?.id]);

	return (
		<AdvisorContext.Provider value={{ advisor, setAdvisor }}>
			{children}
		</AdvisorContext.Provider>
	);
};

export function useAdvisorContext() {
	const context = useContext(AdvisorContext);
	if (context === undefined) {
		throw Error(
			'useAdvisorContext has to be used within AdvisorContextProvider',
		);
	}
	return context;
}

export default AdvisorContextProvider;
