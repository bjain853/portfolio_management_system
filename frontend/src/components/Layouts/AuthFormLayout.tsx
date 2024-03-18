import { Center, Card, FormControl, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { MAIN_COLOR } from '../../util/theme';
import Header from '../Header';

interface IProps {
	onSubmitHandler: () => Promise<void>;
	children: JSX.Element;
	authType: string;
}

export default function AuthForm({
	onSubmitHandler,
	children,
	authType,
}: Readonly<IProps>) {
	return (
		<>
			<Center mt='2em'>
				<Header />
			</Center>
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
									bg: `${MAIN_COLOR}.500`,
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
