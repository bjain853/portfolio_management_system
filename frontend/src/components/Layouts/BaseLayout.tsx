import { Center, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header';
import AdvisorContextProvider from '../../AdvisorContext';

const MotionFlex = motion(Flex);
const BaseLayout = ({ children }: any) => {
	const navigate = useNavigate();

	return (
		<Flex>
			<AdvisorContextProvider>
				<Sidebar />
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
			</AdvisorContextProvider>
		</Flex>
	);
};

export default BaseLayout;
