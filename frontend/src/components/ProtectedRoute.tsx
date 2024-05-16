import {
	RouterProvider,
	createBrowserRouter,
	redirect,
} from 'react-router-dom';

import { getAdvisorProfile } from '../api/advisor';
import { sessionExists } from '../api/auth';
import AdvisorContextProvider from '../contexts/AdvisorContext';
import AdvisorProfile from '../pages/AdvisorProfile';
import ClientList, { ClientsLoader } from '../pages/ClientList';
import ClientPortfolio from '../pages/ClientPortfolio';
import Dashboard, { DashboardLoader } from '../pages/Dashboard';
import Error from '../pages/Error';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import BaseLayout from './Layouts/AppLayout';

async function checkAuthentication() {
	try {
		const loggedInPrev: Boolean = await sessionExists();
		if (loggedInPrev) {
			const advisorProfile = await getAdvisorProfile();
			if (advisorProfile !== null) return advisorProfile;
		}
	} catch (e: any) {
		console.log(e.message);
		throw redirect('/login');
	}
}

export default function CustomRouter() {
	const router = createBrowserRouter([
		{
			path: '/signup',
			element: <SignUp />,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/',
			loader: checkAuthentication,
			element: (
				<AdvisorContextProvider>
					<BaseLayout />
				</AdvisorContextProvider>
			),
			errorElement: <Error />,
			children: [
				{
					path: '/',
					element: <Dashboard />,
					loader: DashboardLoader,
				},
				{
					path: '/advisor',
					element: <AdvisorProfile />,
				},
				{
					path: '/clients',
					element: <ClientList />,
					loader: ClientsLoader,
					children: [
						{
							path: '/clients/:clientId',
							element: <ClientPortfolio />,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
