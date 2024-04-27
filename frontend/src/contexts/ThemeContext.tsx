import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext<any>(undefined);

const ThemeContextProvider = ({ children }: any) => {
	const [theme, setTheme] = useState<string>('blue');

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw Error(
			'useThemeContext has to be used within ThemeContextProvider',
		);
	}
	if (context.theme === null) {
		throw Error('No Theme Found');
	}
	return context;
}

export default ThemeContextProvider;
