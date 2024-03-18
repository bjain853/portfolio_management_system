import {
	GridItem,
	Grid,
	Heading,
	Spinner,
	AbsoluteCenter,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';

import { ISecurityCategoryRecord } from '../types/security';
import { AdvisorContext } from '../AdvisorContext';
import { Advisor } from '../types/advisor';
import StatCard from '../components/StatCard';
import { BarChart } from '../components/Charts/BarChart';
import { PieChart } from '../components/Charts/PieChart';
import {
	getDailyTotalSecurityForAdvisor,
	getTotalSecurityByCategoryForAdvisor,
	getTotalSecurityForAdvisor,
	writeDashboardCache,
} from '../api/security';
import { MAIN_COLOR } from '../util/theme';

export default function Dashboard() {
	const advisor: Advisor | undefined = useContext(AdvisorContext);
	const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0.0);
	const [totalSecurityValueByCategory, setTotalSecurityValueByCategory] =
		useState<ISecurityCategoryRecord[]>([]);
	const [dailyTotalData, setDailyTotalData] = useState<number[]>([]);
	const [dailyTotalLabel, setDailyTotalLabel] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setError] = useState<string>('');

	useEffect(() => {
		if (advisor) {
			(async () => {
				try {
					const advisorId = advisor.id;
					const totalSecurity = await getTotalSecurityForAdvisor(
						advisorId,
					);
					setTotalPortfolioValue(totalSecurity);
					const dataArray =
						await getTotalSecurityByCategoryForAdvisor(advisorId);
					setTotalSecurityValueByCategory(dataArray);
					const { labels, data } =
						await getDailyTotalSecurityForAdvisor(advisorId);
					setDailyTotalData(data);
					setDailyTotalLabel(labels);
				} catch (e: any) {
					setError(e.message);
				} finally {
					setIsLoading(false);
					writeDashboardCache();
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
					color={`${MAIN_COLOR}.500`}
					size='xl'
				/>
			) : (
				<Heading>Something went wrong</Heading>
			)}
		</AbsoluteCenter>
	) : (
		<Grid
			minW='100%'
			templateRows='repeat(2, 1fr)'
			templateColumns='repeat(4, 1fr)'
			gap={4}
		>
			<GridItem>
				<StatCard
					value={totalPortfolioValue}
					caption={'Portfolio Total Value'}
					date={new Date(Date.now()).toDateString()}
				/>
			</GridItem>

			<GridItem>
				<PieChart
					dataArray={totalSecurityValueByCategory.map(
						(security) => security.total_value,
					)}
					labels={totalSecurityValueByCategory.map(
						(security) => security.security_type,
					)}
					displayTitle='Total Security By Category'
				/>

				{/* <TableComponent<ISecurityCategoryRecord>
							columns={['security_type', 'total_value']}
							rows={totalSecurityValueByCategory}
							heading={'Total Securities By Category'}
							variant='simple'
						/> */}
			</GridItem>
			<GridItem>
				<div>
					<BarChart
						labels={dailyTotalLabel}
						dataArray={dailyTotalData}
						displayTitle='Daily total'
						barFillColor='rgba(54, 162, 235, 0.6)'
						borderWidth={2}
					/>
				</div>
			</GridItem>
		</Grid>
	);
}
