import { Navigate } from 'react-router-dom';
import BaseLayout from './Layouts/BaseLayout';

interface IProps {
	Component: () => JSX.Element;
}

export default function ProtectedRoute({ Component, ...rest }: IProps) {
	const advisorId = sessionStorage.getItem('advisorId');
	return advisorId ? (
		<BaseLayout>
			<Component {...rest} />
		</BaseLayout>
	) : (
		<Navigate to='/login' replace />
	);
}
