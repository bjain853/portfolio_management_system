import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import BaseLayout from './Layouts/AppLayout';
import CacheContextProvider from '../contexts/CacheContext';
import { useAdvisorContext } from '../contexts/AdvisorContext';

interface IProps {
	Component: () => JSX.Element;
}

export default function ProtectedRoute({ Component, ...rest }: IProps) {
	const { advisor } = useAdvisorContext();
	if (advisor)
		return (
			<CacheContextProvider>
				<BaseLayout>
					<Component {...rest} />
				</BaseLayout>
			</CacheContextProvider>
		);
	else return <Navigate to='/login' replace />;
}
