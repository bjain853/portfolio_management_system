import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Flex,
	Heading,
	List,
	ListItem,
	Text,
} from '@chakra-ui/react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { getAdvisorProfile } from '../api/advisor';
import { getClients } from '../api/client';
import AddClientModal from '../components/Modals/AddClientModal';
import { Client } from '../types/client';

export async function ClientsLoader() {
	const advisor = await getAdvisorProfile();
	const clients: Client[] = await getClients(advisor);
	return clients;
}

export default function ClientList() {
	const clients = useLoaderData() as Client[];
	const navigate = useNavigate();

	return (
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
											<Heading>
												{client.firstName}{' '}
												{client.lastName}
											</Heading>
											<Text>
												{client?.clientEnrollmentDate}
											</Text>
										</Flex>
									</CardHeader>
									<CardBody>
										<Outlet />
									</CardBody>
								</Card>
							</ListItem>
						))
					)}
				</List>
			</Center>
			<AddClientModal setClients={() => null} />
		</Box>
	);
}
