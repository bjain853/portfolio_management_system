import { createContext, useContext, useEffect, useState } from 'react';
import { getAdvisorProfile } from '../api/advisor';
import { sessionExists } from '../api/auth';
import { Advisor } from '../types/advisor';

type AdvisorContext = {
	advisor: Advisor | null;
	setAdvisor: React.Dispatch<React.SetStateAction<Advisor | null>>;
};

const AdvisorContext = createContext<AdvisorContext | undefined>(undefined);

const AdvisorContextProvider = ({ children }: any) => {
	const [advisor, setAdvisor] = useState<Advisor | null>(null);
	const signedIn = advisor !== null;

	useEffect(() => {
		sessionExists().then((loggedInPrev) => {
			if (loggedInPrev) {
				getAdvisorProfile().then((profile) => setAdvisor(profile));
			}
		});
	}, [signedIn]);

	return (
		<AdvisorContext.Provider value={{ advisor, setAdvisor }}>
			{children}
		</AdvisorContext.Provider>
	);
};

export function useAdvisorContext(): AdvisorContext {
	const context = useContext(AdvisorContext);
	if (context === undefined) {
		throw Error(
			'useAdvisorContext has to be used within AdvisorContextProvider',
		);
	}
	return context;
}

export default AdvisorContextProvider;
