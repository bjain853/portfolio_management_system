import { AbsoluteCenter, Heading } from '@chakra-ui/react';
import { ISecurityRecord } from '../types/security';
import TableComponent from './TableComponent';

export default function SecuritiesTable(props: {
	securities: ISecurityRecord[] | undefined;
}) {
	const { securities } = props;
	return securities ? (
		<TableComponent<ISecurityRecord>
			columns={[
				'name',
				'category',
				'purchaseDate',
				'purchasePrice',
				'quantity',
			]}
			rows={securities}
			heading={'Total Securities'}
			variant='simple'
		/>
	) : (
		<AbsoluteCenter>
			<Heading>No Data Found</Heading>
		</AbsoluteCenter>
	);
}
