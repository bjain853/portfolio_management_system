import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import BaseLayout from './Layouts/AppLayout';
import CacheContextProvider from '../contexts/CacheContext';
import { useAdvisorContext } from '../contexts/AdvisorContext';

interface IProps {
	Component: () => JSX.Element;
}

export default function ProtectedRoute({ Component, ...rest }: IProps) {
	const { advisor } = useAdvisorContext();

	return advisor?.id ? (
		<CacheContextProvider>
			<BaseLayout>
				<Component {...rest} />
			</BaseLayout>
		</CacheContextProvider>
	) : (
		<Navigate to='/login' replace />
	);
}
