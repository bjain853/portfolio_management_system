import { Center, Heading, Box } from '@chakra-ui/react';

import { NavigateFunction } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';

interface IProps {
	navigate?: NavigateFunction;
}
function Header({ navigate }: Readonly<IProps>) {
	const { theme } = useThemeContext();
	return (
		<Box
			bg={`${theme}.600`}
			color='white'
			width={{ base: '100%', lg: '50%' }}
			ml={{ base: '0px', lg: '1em' }}
		>
			<Center>
				<Heading
					my='1em'
					size={{ base: 'lg', lg: '2xl' }}
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
