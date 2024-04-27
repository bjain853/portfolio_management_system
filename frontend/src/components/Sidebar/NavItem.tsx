import {
	Flex,
	Text,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuList,
	ComponentWithAs,
	IconProps,
	Link as ChakraLink,
	LinkProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useThemeContext } from '../../contexts/ThemeContext';

interface IProps {
	icon: ComponentWithAs<'svg', IconProps> | IconType;
	title: string;
	active?: boolean;
	navSize: string;
	mode: string;
	to: string;
}
export default function NavItem({
	icon,
	title,
	active,
	navSize,
	mode,
	to,
}: Readonly<IProps>) {
	const { theme } = useThemeContext();
	return (
		<Flex
			mt={30}
			flexDir='column'
			w='100%'
			alignItems={navSize == 'small' ? 'center' : 'flex-start'}
		>
			<ChakraLink
				as={ReactRouterLink}
				to={to}
				backgroundColor={active ? `${theme}.300` : ''}
				p={3}
				borderRadius={8}
				_hover={{
					textDecor: 'none',
					backgroundColor: `${theme}.300`,
					textColor: 'white',
				}}
				w={navSize == 'large' ? '100%' : ''}
			>
				<Flex>
					<Icon
						as={icon}
						fontSize='xl'
						color={active ? 'white' : 'gray.400'}
					/>
					<Text
						ml={5}
						display={navSize == 'small' ? 'none' : 'flex'}
						color={active ? 'white' : ''}
					>
						{title}
					</Text>
				</Flex>
			</ChakraLink>
		</Flex>
	);
}
