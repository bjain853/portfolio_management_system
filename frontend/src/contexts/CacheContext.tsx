import { createContext, useState, useContext } from 'react';

const CacheContext = createContext<any>(undefined);

const CacheContextProvider = ({ children }: any) => {
	const [cache, setCache] = useState<any>({});

	async function storeInCache(
		key: string,
		apiFetchFunction: () => Promise<void>,
	) {
		let val: any = undefined;
		try {
			val = await apiFetchFunction();
		} catch (e: any) {
			console.log(e.message);
			throw Error(
				'Something went wrong when fetching the data from cache',
			);
		} finally {
			if (val)
				setCache((prev: any) => {
					const newCache = {
						...prev,
						key: val,
					};
					sessionStorage.setItem('cache', JSON.stringify(newCache));
					return newCache;
				});
		}
	}
	return (
		<CacheContext.Provider value={{ cache, storeInCache }}>
			{children}
		</CacheContext.Provider>
	);
};

export function useCacheContext() {
	const context = useContext(CacheContext);
	if (context === undefined) {
		throw Error(
			'useCacheContext has to be used within CacheContextProvider',
		);
	}
	return context;
}

export default CacheContextProvider;
