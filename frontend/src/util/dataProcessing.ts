import { ChartingData } from '../types/advisor';

export function convertMapToJSONArray(responseMap: any): ChartingData {
	const data = [];
	const labels = [];
	for (const [label, val] of Object.entries(responseMap)) {
		data.push(val as number);
		labels.push(label);
	}
	return { data, labels };
}
