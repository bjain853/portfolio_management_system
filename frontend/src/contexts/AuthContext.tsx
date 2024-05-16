import { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext<any>(undefined);

const AuthContextProvider = ({ children }: any) => {
	const [cookies, removeCookie] = useCookies(['token']);
	return (
		<AuthContext.Provider value={{ cookies, removeCookie }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw Error(
			'useAuthContext has to be used within AdvisorContextProvider',
		);
	}
	return context;
}

export default AuthContextProvider;
