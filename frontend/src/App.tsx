import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import SignUp from './pages/SignUp';
import ClientPortfolio from './pages/ClientPortfolio';
import ClientList from './pages/ClientList';
import AdvisorProfile from './pages/AdvisorProfile';
import Error from './pages/Error';

const router = createBrowserRouter([
	{
		path: '/error',
		element: <ProtectedRoute Component={Error} />,
	},
	{
		path: '/',
		element: <ProtectedRoute Component={Dashboard} />,
	},
	{
		path: '/clients',
		element: <ProtectedRoute Component={ClientList} />,
	},
	{
		path: '/clients/:clientId',
		element: <ProtectedRoute Component={ClientPortfolio} />,
		loader: async function LoaderFunction({ params }) {
			return params.clientId;
		},
	},
	{
		path: '/profile',
		element: <ProtectedRoute Component={AdvisorProfile} />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

function App() {
	return (
		<ChakraProvider>
			<Box minW='100vw' minH='100vh' overflow='hidden'>
				<RouterProvider router={router} />
			</Box>
		</ChakraProvider>
	);
}

export default App;
