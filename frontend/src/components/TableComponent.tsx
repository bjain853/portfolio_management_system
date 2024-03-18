import {
	Center,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { convertKeyToHeading } from '../util/stringFunctions';
import { MAIN_COLOR } from '../util/theme';

interface IProps<T extends {}> {
	columns: string[];
	rows: T[];
	heading: string;
	color?: string;
	variant?: string;
}

export default function TableComponent<T extends Object>({
	columns,
	rows,
	color = MAIN_COLOR,
	variant = 'striped',
	heading,
}: IProps<T>) {
	const currencyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
	});
	return rows.length === 0 ? (
		<Center>
			<Text fontSize='2xl' fontWeight='bold'>
				No Data Available
			</Text>
		</Center>
	) : (
		<TableContainer zIndex={4}>
			<Table variant={variant} colorScheme={color}>
				<TableCaption>{heading}</TableCaption>
				<Thead>
					<Tr>
						{columns.map((column: string, idx: number) => (
							<Th key={idx}>{convertKeyToHeading(column)}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{rows.map((row: T, index) => (
						<Tr key={index}>
							{columns.map((column) => {
								if (column.toLowerCase().includes('price'))
									return (
										<Td>
											{currencyFormatter.format(
												row[column],
											)}
										</Td>
									);
								return <Td>{row[column]}</Td>;
							})}
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
