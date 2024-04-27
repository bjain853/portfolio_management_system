import { Center, Flex, Hide } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header';
import ThemeContextProvider from '../../contexts/ThemeContext';

const MotionFlex = motion(Flex);
const BaseLayout = ({ children }: any) => {
	const navigate = useNavigate();

	return (
		<Flex flexDir={{ base: 'column', lg: 'row' }}>
			<Hide below='lg'>
				<Sidebar display={{ base: 'none', lg: 'flex' }} />
			</Hide>
			<Flex
				flexDir='column'
				ml='0.5em'
				minW='100%'
				overflow='hidden'
				m='2em'
			>
				<Header navigate={navigate} />
				<Center>
					<Flex m='2rem' w='100%'>
						<AnimatePresence>
							<MotionFlex
								transition={{
									ease: 'easeOut',
									duration: 2,
								}}
								exit={{ opacity: 0 }}
								minW='100%'
							>
								{children}
							</MotionFlex>
						</AnimatePresence>
					</Flex>
				</Center>
			</Flex>
		</Flex>
	);
};

export default BaseLayout;
