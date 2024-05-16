import { Center, Flex, Hide } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useAdvisorContext } from '../../contexts/AdvisorContext';
import { Advisor } from '../../types/advisor';
import Header from '../Header';
import Sidebar from '../Sidebar/Sidebar';

const MotionFlex = motion(Flex);
const BaseLayout = () => {
	const navigate = useNavigate();
	const { setAdvisor } = useAdvisorContext();
	const advisorProfile = useLoaderData() as Advisor;

	useEffect(() => {
		if (advisorProfile !== null) setAdvisor(advisorProfile);
	}, []);

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
								<Outlet />
							</MotionFlex>
						</AnimatePresence>
					</Flex>
				</Center>
			</Flex>
		</Flex>
	);
};

export default BaseLayout;
