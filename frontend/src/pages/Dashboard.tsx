import {
	GridItem,
	Grid,
	Heading,
	Spinner,
	AbsoluteCenter,
} from '@chakra-ui/react';

import StatCard from '../components/StatCard';
import { BarChart } from '../components/Charts/BarChart';
import { PieChart } from '../components/Charts/PieChart';
import { useCacheContext } from '../contexts/CacheContext';
import { useThemeContext } from '../contexts/ThemeContext';

export default function Dashboard() {
	const { theme } = useThemeContext();
	const { cache, isLoading, errorMessage } = useCacheContext();

	if (isLoading)
		return (
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color={`${theme}.500`}
				size='xl'
			/>
		);

	if (errorMessage !== '' && cache === null)
		return (
			<AbsoluteCenter>
				<Heading>Something went wrong</Heading>
			</AbsoluteCenter>
		);

	if (cache !== null)
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
						value={cache.totalProfitLoss}
						caption={'Portfolio Total Value'}
						date={new Date(cache.updatedAt).toDateString()}
					/>
				</GridItem>

				<GridItem>
					{cache.totalSecurityValueByCategory ? (
						<PieChart
							data={cache.totalSecurityValueByCategory?.data}
							labels={cache.totalSecurityValueByCategory?.labels}
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
						{cache.dailySecurityBalance ? (
							<BarChart
								labels={cache.dailySecurityBalance.labels}
								data={cache.dailySecurityBalance.data}
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
