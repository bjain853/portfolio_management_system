import {
	Button,
	Center,
	Circle,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { addNewClient } from '../../api/client';
import { useAdvisorContext } from '../../contexts/AdvisorContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Client } from '../../types/client';

type IProps = {
	setClients: Dispatch<SetStateAction<Client[]>>;
};

export default function AddSecurityModal({ setClients }: IProps) {
	const { advisor } = useAdvisorContext();
	const { theme } = useThemeContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [newClient, setNewClient] = useState({ firstName: '', lastName: '' });

	function onClickHandler() {
		addNewClient(newClient, advisor).then((addedClient) => {
			if (addedClient !== null)
				setClients((prev) => [...prev, addedClient]);
		});
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
					bgColor={`${theme}.500`}
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
								<Button onClick={onClickHandler}>
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
