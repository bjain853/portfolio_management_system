import {
	Container,
	Card,
	CardBody,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	Flex,
} from '@chakra-ui/react';

interface IProps {
	value: number;
	caption: string;
	date: string;
}

export default function StatCard({ value, caption, date }: Readonly<IProps>) {
	const currencyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
	});
	return (
		<Flex>
			<Card>
				<CardBody>
					<Stat>
						<StatLabel>
							{caption} as of {date}
						</StatLabel>
						<StatNumber>
							{currencyFormatter.format(value)}
						</StatNumber>
						<StatHelpText>
							<StatArrow type='increase' />
							23.36%
						</StatHelpText>
					</Stat>
				</CardBody>
			</Card>
		</Flex>
	);
}
