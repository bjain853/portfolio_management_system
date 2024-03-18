import { useContext } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

import { AdvisorContext } from '../AdvisorContext';

function AdvisorProfile() {
	const advisor = useContext(AdvisorContext);
	return (
		<Flex flexDir='column'>
			<Heading>
				{advisor?.firstName} {advisor?.lastName}
			</Heading>
			<Text> Email :{advisor?.username}</Text>
		</Flex>
	);
}

export default AdvisorProfile;
