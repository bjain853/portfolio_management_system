import {
	Button,
	Card,
	Center,
	Circle,
	Flex,
	FormControl,
	IconButton,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useThemeContext } from '../../contexts/ThemeContext';
import Header from '../Header';

interface IProps<T> {
	onSubmitHandler: () => Promise<void>;
	children: JSX.Element;
	setForm: React.Dispatch<React.SetStateAction<T>>;
	form: T;
	buttonText: String;
}

const MotionIconButton = motion(IconButton);

export default function AuthForm<T>({
	onSubmitHandler,
	children,
	setForm,
	form,
	buttonText,
}: Readonly<IProps<T>>) {
	function handleChange(e: any) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

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
					<FormControl onChange={handleChange}>
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
								{buttonText}
							</Button>
						</Center>
					</FormControl>
					<Link
						to={
							buttonText.toLowerCase() === 'login'
								? '/signup'
								: '/login'
						}
					>
						<Text mt='20px'>
							{buttonText.toLowerCase() === 'login'
								? "Don't have an account? Register"
								: ' Have an account already? Login'}
						</Text>
					</Link>
				</Card>
			</Center>
		</>
	);
}
