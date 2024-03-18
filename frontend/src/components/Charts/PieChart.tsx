import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';

ChartJS.register(CategoryScale);

interface IProps {
	labels: string[];
	dataArray: number[];
	displayTitle: string;
}

export const PieChart = ({ labels, dataArray, displayTitle }: IProps) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Security By Category',
				data: dataArray,
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

	const hasData: boolean = dataArray
		.map((element) => !!element)
		.reduce((prevValue, curr) => prevValue || curr);

	return (
		<div className='chart-container'>
			{hasData && (
				<Pie
					data={data}
					options={{
						plugins: {
							title: { text: `${displayTitle}`, display: true },
						},
					}}
				/>
			)}
		</div>
	);
};
