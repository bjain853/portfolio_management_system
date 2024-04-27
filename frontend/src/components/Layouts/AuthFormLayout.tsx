import {
	Center,
	Card,
	FormControl,
	Button,
	Text,
	useColorMode,
	IconButton,
	Flex,
	Circle,
	Spacer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import { useThemeContext } from '../../contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IconContext } from 'react-icons';

interface IProps {
	onSubmitHandler: () => Promise<void>;
	children: JSX.Element;
	authType: string;
}

const MotionIconButton = motion(IconButton);

export default function AuthForm({
	onSubmitHandler,
	children,
	authType,
}: Readonly<IProps>) {
	const { theme } = useThemeContext();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Flex alignItems='center' justifyContent='space-around' mt='2rem'>
				<Header />

				<AnimatePresence>
					<Circle
						background={
							colorMode === 'light'
								? `${theme}.400`
								: `${theme}.600`
						}
						maxWidth='2.5rem'
						maxH='2.5rem'
						mr='2rem'
					>
						<IconContext.Provider
							value={{
								color: 'white',
							}}
						>
							<MotionIconButton
								background='none'
								aria-label='theme-switch'
								_hover={{ background: 'none' }}
								icon={
									colorMode == 'light' ? (
										<FaSun />
									) : (
										<FaMoon />
									)
								}
								onClick={toggleColorMode}
							/>
						</IconContext.Provider>
					</Circle>
				</AnimatePresence>
			</Flex>
			<Center>
				<Card p='5rem' zIndex='4' borderRadius='20px' mt='4em'>
					<FormControl>
						{children}
						<Center>
							<Button
								size='lg'
								mt='2em'
								py='20px'
								px='6em'
								variant='solid'
								_hover={{
									bg: `${theme}.500`,
									color: 'white',
								}}
								onClick={onSubmitHandler}
							>
								{authType}
							</Button>
						</Center>
					</FormControl>
					<Link to={authType === 'Login' ? '/signup' : '/login'}>
						<Text mt='20px'>
							{authType === 'Login'
								? "Don't have an account? Register"
								: ' Have an account already? Login'}
						</Text>
					</Link>
				</Card>
			</Center>
		</>
	);
}
