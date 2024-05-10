import { createContext, useState, useContext, useEffect } from 'react';
import { useAdvisorContext } from './AdvisorContext';
import {
	getDailyTotalSecurityForAdvisor,
	getProfitLossForAdvisor,
	getTotalSecurityByCategoryForAdvisor,
} from '../api/advisor';

const CacheContext = createContext<any>(undefined);

const keysToFetchFunctions = {
	totalProfitLoss: getProfitLossForAdvisor,
	totalSecurityByCategory: getTotalSecurityByCategoryForAdvisor,
	totalSecurity: getDailyTotalSecurityForAdvisor,
};

const CacheContextProvider = ({ children }: any) => {
	const { advisor } = useAdvisorContext();
	const [cache, setCache] = useState<any>(null);
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		(async () => {
			if (advisor) {
				try {
					let updatedCache: any = {};
					setLoading(true);
					for (const [key, fetchFn] of Object.entries(
						keysToFetchFunctions,
					)) {
						updatedCache[`${key}`] = await fetchFn(advisor.id);
					}
					updatedCache['updatedAt'] = Date.now();
					sessionStorage.setItem(
						'cache',
						JSON.stringify(updatedCache),
					);
					setLoading(false);
					setCache(updatedCache);
				} catch (e: any) {
					setErrorMessage(e.message);
					setLoading(false);
				}
			}
		})();
	}, [Date.now() - cache?.updatedAt >= 15000]);

	return (
		<CacheContext.Provider value={{ cache, isLoading, errorMessage }}>
			{children}
		</CacheContext.Provider>
	);
};

export function useCacheContext() {
	const context = useContext(CacheContext);
	if (!context) {
		throw Error(
			'useCacheContext has to be used within CacheContextProvider',
		);
	}
	return context;
}

export default CacheContextProvider;
