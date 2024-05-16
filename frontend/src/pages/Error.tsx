import { AbsoluteCenter, Heading, Text } from '@chakra-ui/react';
import { Link, useRouteError } from 'react-router-dom';

export default function Error() {
	const error: any = useRouteError();
	return (
		<AbsoluteCenter>
			<Heading>Oops.. we are still working on that feature !</Heading>
			<Text>{error.message}</Text>
			<Link to='/'>Go back to Dashboard</Link>
		</AbsoluteCenter>
	);
}
