import {
	Avatar,
	Divider,
	Flex,
	Heading,
	IconButton,
	Slide,
	Box,
	Text,
	useColorMode,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, Link as ReactRouterLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaHome, FaMoon } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBriefcase, FaSun, FaUser } from 'react-icons/fa6';

import { useAdvisorContext } from '../../contexts/AdvisorContext';
import { Advisor } from '../../types/advisor';
import NavItem from './NavItem';

const MotionIconButton = motion(IconButton);

function Sidebar(...props: any) {
	const [size, setSize] = useState('small');
	const { advisor } = useAdvisorContext();
	const { colorMode, toggleColorMode } = useColorMode();
	const { pathname } = useLocation();
	return (
		<Box
			pos='sticky'
			left='5'
			h='95vh'
			marginTop='2.5vh'
			shadow='lg'
			borderRadius={size == 'small' ? '10px' : '20px'}
			w={size == 'small' ? '150px' : '250px'}
			flexDir='column'
			justifyContent='space-between'
			{...props}
		>
			<Flex>
				<IconButton
					background='none'
					aria-label=''
					mt={5}
					_hover={{ background: 'none' }}
					icon={<GiHamburgerMenu />}
					onClick={() => {
						if (size == 'small') setSize('large');
						else setSize('small');
					}}
				/>
				{size == 'large' && (
					<AnimatePresence>
						<MotionIconButton
							background='none'
							aria-label=''
							mt={5}
							_hover={{ background: 'none' }}
							icon={colorMode == 'light' ? <FaSun /> : <FaMoon />}
							onClick={toggleColorMode}
						/>
					</AnimatePresence>
				)}
			</Flex>
			<Flex
				p='5%'
				flexDir='column'
				w='100%'
				alignItems={size == 'small' ? 'center' : 'flex-start'}
				as='nav'
				mr='2em'
			>
				<NavItem
					navSize={size}
					icon={FaHome}
					title='Dashboard'
					mode={colorMode}
					active={pathname === '/'}
					to='/'
				/>
				{/* <NavItem
							navSize={size}
							icon={FaUser}
							title='Advisor Profile'
							mode={colorMode}
							active={pathname === '/profile'}
							to='/profile'
						/> */}
				<NavItem
					navSize={size}
					icon={FaBriefcase}
					title='Client Information'
					mode={colorMode}
					active={pathname.includes('/clients')}
					to='/clients'
				/>

				{/* <NavItem
					navSize={size}
					icon={CiSettings}
					title='Account Settings'
					mode={colorMode}
					to=''
				/> */}
			</Flex>

			<Flex
				p='5%'
				flexDir='column'
				w='100%'
				mb={4}
				alignItems={size == 'small' ? 'center' : 'flex-start'}
			>
				{size == 'large' && <Divider />}
				<ChakraLink as={ReactRouterLink} to={'/profile'}>
					<Flex mt={4} align='center'>
						<Avatar
							size={size}
							src='avatar-1.jpg'
							h='40px'
							w='40px'
						/>
						{size === 'large' && (
							<Flex flexDir='column' ml='20px'>
								<Heading as='h3' size='sm'>
									{advisor?.firstName} {advisor?.lastName}
								</Heading>
								<Text color='gray'>Advisor</Text>
							</Flex>
						)}
					</Flex>
				</ChakraLink>
			</Flex>
		</Box>
	);
}

export default Sidebar;
