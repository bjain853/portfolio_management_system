import {
	FormControl,
	FormLabel,
	Input,
	Center,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Circle,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { AdvisorContext } from '../../AdvisorContext';
import { useContext, useState } from 'react';
import { api } from '../../api/api';
import { Advisor } from '../../types/advisor';
import { MAIN_COLOR } from '../../util/theme';

export default function AddSecurityModal() {
	const advisor: Advisor | undefined = useContext(AdvisorContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [newClient, setNewClient] = useState({ firstName: '', lastName: '' });
	function addNewClient() {
		if (advisor)
			api.post(`/clients`, { ...newClient, advisorId: advisor.id });
	}

	function onChangeHandler(e: any) {
		setNewClient((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	return (
		<>
			<Circle>
				<Button
					aria-label='add new client for the advisor'
					leftIcon={<FaPlus />}
					onClick={onOpen}
					position='fixed'
					right='40px'
					bottom='40px'
					bgColor={`${MAIN_COLOR}.500`}
					textColor='white'
				>
					Add Client
				</Button>
			</Circle>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
				<ModalContent>
					{/* <ModalCloseButton /> */}
					<ModalBody>
						<FormControl>
							<FormLabel>First Name</FormLabel>
							<Input
								name='firstName'
								type='text'
								onChange={onChangeHandler}
							/>
							<FormLabel>Last Name</FormLabel>
							<Input
								name='lastName'
								type='text'
								onChange={onChangeHandler}
							/>
							<Center pt='10px'>
								<Button onClick={addNewClient}>
									Add Client
								</Button>
							</Center>
						</FormControl>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
