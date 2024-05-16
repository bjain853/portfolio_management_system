import {
	AbsoluteCenter,
	Box,
	Center,
	Container,
	Heading,
	Spinner,
	Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClientPortfolio } from '../api/client';
import AddSecurityModal from '../components/Modals/AddSecurityModal';
import SecuritiesTable from '../components/SecuritiesTable';
import { useThemeContext } from '../contexts/ThemeContext';
import { Portfolio } from '../types/portfolio';

function ClientPortfolio() {
	const { clientId } = useParams<{ clientId: string }>();
	const { theme } = useThemeContext();

	const [portfolio, setPotfolio] = useState<Portfolio | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasError, setError] = useState<string>('');

	useEffect(() => {
		if (clientId) {
			(async () => {
				setIsLoading(true);
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
