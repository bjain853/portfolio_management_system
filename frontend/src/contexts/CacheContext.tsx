import { createContext, useContext, useEffect, useState } from 'react';
import { useAdvisorContext } from './AdvisorContext';

const CacheContext = createContext<any>(undefined);

const CacheContextProvider = ({ children }: any) => {
	const { advisor } = useAdvisorContext();
	const [cache, setCache] = useState<any>(null);
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (advisor !== null) (async () => {})();
	}, []);

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
