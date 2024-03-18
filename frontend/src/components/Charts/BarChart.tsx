import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';

ChartJS.register(CategoryScale);

interface IProps {
	labels: string[];
	dataArray: number[];
	displayTitle: string;
	barFillColor: string;
	borderWidth: number;
}

export const BarChart = ({
	labels,
	dataArray,
	displayTitle,
	barFillColor,
	borderWidth,
}: IProps) => {
	const data = {
		labels: labels,
		datasets: [
			{
				data: dataArray,
				backgroundColor: [barFillColor],
				borderWidth,
			},
		],
	};

	const hasData: boolean = dataArray
		.map((element) => !!element)
		.reduce((prevValue, curr) => prevValue || curr);
	console.log(hasData);
	return (
		<div className='chart-container'>
			{hasData && (
				<Bar
					data={data}
					options={{
						plugins: {
							title: { text: `${displayTitle}`, display: true },
							legend: { display: false },
						},
					}}
				/>
			)}
		</div>
	);
};
