import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';

ChartJS.register(CategoryScale);

interface IProps {
	labels?: string[];
	data?: number[];
	displayTitle: string;
	barFillColor: string;
	borderWidth: number;
}

export const BarChart = ({
	labels,
	data,
	displayTitle,
	barFillColor,
	borderWidth,
}: IProps) => {
	const source = {
		labels,
		datasets: [
			{
				data,
				backgroundColor: [barFillColor],
				borderWidth,
			},
		],
	};

	const hasData = data!!
		.map((element) => !!element)
		.reduce((prevValue, curr) => prevValue || curr, false);

	return hasData ? (
		<div className='chart-container'>
			<Bar
				data={source}
				options={{
					plugins: {
						title: { text: `${displayTitle}`, display: true },
						legend: { display: false },
					},
				}}
			/>
		</div>
	) : null;
};
