import {
	GridItem,
	Grid,
	Heading,
	Spinner,
	AbsoluteCenter,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { useAdvisorContext } from '../contexts/AdvisorContext';
import StatCard from '../components/StatCard';
import { BarChart } from '../components/Charts/BarChart';
import { PieChart } from '../components/Charts/PieChart';
import {
	getDailyTotalSecurityForAdvisor,
	getTotalSecurityByCategoryForAdvisor,
	getProfitLossForAdvisor,
} from '../api/advisor';
import { useCacheContext } from '../contexts/CacheContext';
import { useThemeContext } from '../contexts/ThemeContext';

export default function Dashboard() {
	const { advisor } = useAdvisorContext();
	const { cache, storeInCache } = useCacheContext();
	const { theme } = useThemeContext();
	const advisorId = advisor.id;

	const [totalProfitLoss, setTotalProfitLoss] = useState(0.0);
	const [totalSecurityValueByCategory, setTotalSecurityValueByCategory] =
		useState({
			labels: [],
			data: [],
		});

	const [dailySecurityBalance, setDailySecurityBalance] = useState({
		labels: [],
		data: [],
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setError] = useState<string>('');

	useEffect(() => {
		setIsLoading(true);
		try {
			storeInCache('totalProfitLoss', () =>
				getProfitLossForAdvisor(advisorId),
			);

			storeInCache('totalSecurityValueByCategory', () =>
				getTotalSecurityByCategoryForAdvisor(advisorId),
			);

			storeInCache('dailySecurityBalance', () =>
				getDailyTotalSecurityForAdvisor(advisorId),
			);

			if (cache) {
				setTotalProfitLoss(cache.totalProfitLoss);
				setTotalSecurityValueByCategory(
					cache.totalSecurityValueByCategory,
				);
				setDailySecurityBalance(cache.dailySecurityBalance);
			}
		} catch (e: any) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	}, [cache === null]);

	return isLoading && errorMessage !== '' ? (
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
		<Grid
			minW='100%'
			templateRows={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
			templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3,1fr)' }}
			gap={4}
		>
			<GridItem>
				<StatCard
					value={totalProfitLoss}
					caption={'Portfolio Total Value'}
					date={new Date(Date.now()).toDateString()}
				/>
			</GridItem>

			<GridItem>
				{totalSecurityValueByCategory ? (
					<PieChart
						data={totalSecurityValueByCategory?.data}
						labels={totalSecurityValueByCategory?.labels}
						displayTitle='Total Security By Category'
					/>
				) : null}

				{/* <TableComponent<ISecurityCategoryRecord>
							columns={['security_type', 'total_value']}
							rows={totalSecurityValueByCategory}
							heading={'Total Securities By Category'}
							variant='simple'
						/> */}
			</GridItem>
			<GridItem>
				<div>
					{dailySecurityBalance ? (
						<BarChart
							labels={dailySecurityBalance.labels}
							data={dailySecurityBalance.data}
							displayTitle='Daily total'
							barFillColor='rgba(54, 162, 235, 0.6)'
							borderWidth={2}
						/>
					) : null}
				</div>
			</GridItem>
		</Grid>
	);
}
