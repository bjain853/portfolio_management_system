import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';

ChartJS.register(CategoryScale);

interface IProps {
	labels?: string[];
	data?: number[];
	displayTitle: string;
}

export const PieChart = ({ labels, data, displayTitle }: IProps) => {
	const source = {
		labels,
		datasets: [
			{
				label: 'Security By Category',
				data,
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(255, 206, 86, 0.5)',
					'rgba(75, 192, 192, 0.5)',
					'rgba(153, 102, 255, 0.5)',
					'rgba(255, 159, 64, 0.5)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const hasData = data!!
		.map((element) => !!element)
		.reduce((prevValue, curr) => prevValue || curr, false);

	return hasData ? (
		<div className='chart-container'>
			<Pie
				data={source}
				options={{
					plugins: {
						title: { text: `${displayTitle}`, display: true },
					},
				}}
			/>
		</div>
	) : null;
};
