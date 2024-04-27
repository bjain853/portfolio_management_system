import { useEffect, useState } from 'react';

import { useAdvisorContext } from '../contexts/AdvisorContext';
import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Heading,
	List,
	ListItem,
	Flex,
	Text,
	AbsoluteCenter,
	Spinner,
} from '@chakra-ui/react';
import { Client } from '../types/client';
import { Advisor } from '../types/advisor';
import { useNavigate } from 'react-router-dom';
import AddClientModal from '../components/Modals/AddClientModal';
import { getClients } from '../api/client';
import { useThemeContext } from '../contexts/ThemeContext';

export default function ClientList() {
	const { advisor } = useAdvisorContext();
	const { theme } = useThemeContext();
	const [clients, setClients] = useState<Client[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setError] = useState<string>('');

	const navigate = useNavigate();

	useEffect(() => {
		if (advisor && !clients) {
			(async () => {
				try {
					const clients = await getClients(advisor);
					setClients(clients);
				} catch (e: any) {
					setError(e.message);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [advisor?.id]);

	return isLoading || hasError !== '' ? (
		<AbsoluteCenter>
			{isLoading ? (
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color={`${theme}.500`}
					size='xl'
				/>
			) : (
				<Heading>Something went wrong</Heading>
			)}
		</AbsoluteCenter>
	) : (
		<Box m='3em' minW='100%'>
			<Center>
				<Heading my='2rem' size='2xl'>
					Clients
				</Heading>
			</Center>
			<Center>
				<List spacing={3} width='50%'>
					{!clients ? (
						<Center>
							<Heading>No Data Available</Heading>
						</Center>
					) : (
						clients.map((client) => (
							<ListItem key={client.id} py='2em' px='1em'>
								<Card
									zIndex='3'
									onClick={() => navigate(`${client.id}`)}
									cursor='pointer'
								>
									<CardHeader>
										<Flex
											alignItems='center'
											justifyContent='center'
										>
											{/* <Circle pr='0.5em'>
												<Image
													src='https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
													alt='Green double couch with wooden legs'
													height='40px'
													width='40px'
												/>
											</Circle> */}
											<Heading>
												{client.firstName}{' '}
												{client.lastName}
											</Heading>
											<Text>
												{client?.clientEnrollmentDate}
											</Text>
										</Flex>
									</CardHeader>
									<CardBody></CardBody>
								</Card>
							</ListItem>
						))
					)}
				</List>
			</Center>
			<AddClientModal />
		</Box>
	);
}
