import { createContext, useContext, useState } from 'react';
import { Advisor } from '../types/advisor';

const AdvisorContext = createContext<any>(undefined);

const AdvisorContextProvider = ({ children }: any) => {
	const [advisor, setAdvisor] = useState<Advisor | undefined>(undefined);
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
