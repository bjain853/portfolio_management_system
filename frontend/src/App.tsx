import { Box } from '@chakra-ui/react';
import CustomRouter from './components/ProtectedRoute';
import ContextProvider from './contexts';

function App() {
	return (
		<ContextProvider>
			<Box minW='100vw' minH='100vh' overflow='hidden'>
				<CustomRouter />
			</Box>
		</ContextProvider>
	);
}

export default App;
