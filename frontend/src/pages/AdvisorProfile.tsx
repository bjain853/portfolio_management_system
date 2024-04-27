import { Flex, Heading, Text } from '@chakra-ui/react';

import { useAdvisorContext } from '../contexts/AdvisorContext';

function AdvisorProfile() {
	const { advisor } = useAdvisorContext();
	return (
		<Flex flexDir='column'>
			<Heading>
				{advisor.firstName} {advisor.lastName}
			</Heading>
			<Text> Email :{advisor.username}</Text>
		</Flex>
	);
}

export default AdvisorProfile;
