import { useLoaderData } from 'react-router-dom';
import { Portfolio } from '../types/portfolio';
import { useState, useEffect } from 'react';
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
import { getClientPortfolio } from '../api/client';
import { useThemeContext } from '../contexts/ThemeContext';

function ClientPortfolio() {
	const clientId = useLoaderData() as string;
	const { theme } = useThemeContext();

	const [portfolio, setPotfolio] = useState<Portfolio | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setError] = useState<string>('');

	useEffect(() => {
		if (clientId && !portfolio) {
			(async () => {
				try {
					const portfolio: Portfolio = await getClientPortfolio(
						clientId,
					);
					setPotfolio(portfolio);
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
					color={`${theme}.500`}
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
			<AddSecurityModal portfolioId={portfolio ? portfolio.id : ''} />
			<Container minW='70%'>
				<SecuritiesTable securities={portfolio?.securities} />
			</Container>
		</Box>
	);
}

export default ClientPortfolio;
