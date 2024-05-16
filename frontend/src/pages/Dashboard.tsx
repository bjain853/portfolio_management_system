import { Grid, GridItem } from '@chakra-ui/react';

import { useLoaderData } from 'react-router-dom';
import {
	getAdvisorProfile,
	getPortfolioCurrentValueForAdvisor,
	getTotalSecurityByCategoryForAdvisor,
	getWeeklySecuritySummary,
} from '../api/advisor';
import { BarChart } from '../components/Charts/BarChart';
import { PieChart } from '../components/Charts/PieChart';
import NotEnoughData from '../components/NotEnoughData';
import StatCard from '../components/StatCard';

export async function DashboardLoader() {
	const keysToFetchFunctions = {
		totalCurrentValue: getPortfolioCurrentValueForAdvisor,
		totalSecurityByCategory: getTotalSecurityByCategoryForAdvisor,
		totalWeeklySecuritySummary: getWeeklySecuritySummary,
	};
	const advisor = await getAdvisorProfile();
	const cache: any = {};

	for (const [key, fn] of Object.entries(keysToFetchFunctions)) {
		const response = await fn(advisor.id);
		cache[key] = response;
	}
	cache['updatedAt'] = Date.now();
	return cache;
}

export default function Dashboard() {
	// const { theme } = useThemeContext();
	const cache: any = useLoaderData();
	console.log(cache);
	// if (isLoading)
	// 	return (
	// 		<Spinner
	// 			thickness='4px'
	// 			speed='0.65s'
	// 			emptyColor='gray.200'
	// 			color={`${theme}.500`}
	// 			size='xl'
	// 		/>
	// 	);
	return (
		<Grid
			minW='100%'
			templateRows={{
				base: 'repeat(1, 1fr)',
				lg: 'repeat(2, 1fr)',
			}}
			templateColumns={{
				base: 'repeat(1, 1fr)',
				lg: 'repeat(3,1fr)',
			}}
			gap={4}
		>
			<GridItem>
				<StatCard
					value={cache.totalCurrentValue}
					caption={'Portfolio Total Value'}
					date={new Date(cache.updatedAt).toDateString()}
				/>
			</GridItem>

			<GridItem>
				{cache.totalSecurityByCategory !== undefined ? (
					<PieChart
						data={cache.totalSecurityByCategory.data}
						labels={cache.totalSecurityByCategory.labels}
						displayTitle='Total Security By Category'
					/>
				) : (
					<NotEnoughData />
				)}

				{/* <TableComponent<ISecurityCategoryRecord>
							columns={['security_type', 'total_value']}
							rows={totalSecurityValueByCategory}
							heading={'Total Securities By Category'}
							variant='simple'
				/> */}
			</GridItem>
			<GridItem>
				<div>
					{cache.totalWeeklySecuritySummary ? (
						<BarChart
							labels={cache.totalWeeklySecuritySummary.labels}
							data={cache.totalWeeklySecuritySummary.data}
							displayTitle='Daily total'
							barFillColor='rgba(54, 162, 235, 0.6)'
							borderWidth={2}
						/>
					) : (
						<NotEnoughData />
					)}
				</div>
			</GridItem>
		</Grid>
	);
	// else {
	// 	return (
	// 		<AbsoluteCenter>
	// 			<Heading>Something went wrong</Heading>
	// 			<Text>{errorMessage}</Text>
	// 		</AbsoluteCenter>
	// 	);
	// }
}
