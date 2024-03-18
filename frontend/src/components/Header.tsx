import { Center, Heading, Box } from '@chakra-ui/react';

import { MAIN_COLOR } from '../util/theme';
import { NavigateFunction } from 'react-router-dom';

interface IProps {
	navigate?: NavigateFunction;
}
function Header({ navigate }: Readonly<IProps>) {
	return (
		<Box
			bg={`${MAIN_COLOR}.600`}
			color='white'
			width={{ base: '100%', lg: '50%' }}
			ml={{ base: '0', lg: '1em' }}
		>
			<Center>
				<Heading
					my='1em'
					size='2xl'
					onClick={() => navigate && navigate('/')}
					cursor='pointer'
					ml='10px'
				>
					Wells Fargo Portfolio Management
				</Heading>
			</Center>
		</Box>
	);
}

export default Header;
