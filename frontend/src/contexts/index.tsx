import { ChakraProvider } from '@chakra-ui/react';
import AdvisorContextProvider from './AdvisorContext';
import ThemeContextProvider from './ThemeContext';

export default function ContextProvider({ children }: any) {
	return (
		<ChakraProvider>
			<AdvisorContextProvider>
				<ThemeContextProvider>{children}</ThemeContextProvider>
			</AdvisorContextProvider>
		</ChakraProvider>
	);
}
