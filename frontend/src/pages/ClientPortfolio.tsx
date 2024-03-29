import { useLoaderData } from 'react-router-dom';
import { Portfolio as IPortfolio } from '../types/portfolio';
import { useState, useEffect } from 'react';
import { api } from '../api/api';
import {
	Flex,
	Center,
	Heading,
	Text,
	Box,
	AbsoluteCenter,
	Container,
	Spinner,
} from '@chakra-ui/react';
import SecuritiesTable from '../components/SecuritiesTable';
import AddSecurityModal from '../components/Modals/AddSecurityModal';
import { MAIN_COLOR } from '../util/theme';

function ClientPortfolio() {
	const clientId = useLoaderData() as string;

	const [portfolio, setPotfolio] = useState<IPortfolio | undefined>(
		undefined,
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setError] = useState<string>('');

	useEffect(() => {
		if (clientId && !portfolio) {
			(async () => {
				try {
					const response = await api.get(
						`/portfolio/client/${clientId}`,
					);
					setPotfolio(response.data);
				} catch (e: any) {
					setError(e.message);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [clientId]);

	const date = portfolio ? new Date(portfolio.clientEnrollmentDate) : null;

	return isLoading || hasError !== '' ? (
		<AbsoluteCenter>
			{isLoading ? (
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color={`${MAIN_COLOR}.500`}
					size='xl'
				/>
			) : (
				<Heading>Something went wrong</Heading>
			)}
		</AbsoluteCenter>
	) : (
		<Box minW='100%'>
			<Center>
				<Heading>
					{portfolio?.client.firstName} {portfolio?.client.lastName}
				</Heading>
			</Center>
			<Text>
				Enrolled since : {date?.getDate()}/{date?.getMonth()}/
				{date?.getFullYear()}
			</Text>
			<AddSecurityModal portfolioId={portfolio?.id} />
			<Container minW='70%'>
				<SecuritiesTable securities={portfolio?.securities} />
			</Container>
		</Box>
	);
}

export default ClientPortfolio;
