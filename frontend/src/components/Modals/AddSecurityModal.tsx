import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import {
	getSecurityCategories,
	getSecurityNamesByCategory,
} from '../../api/security';

import { ISecurityRecord } from '../../types/security';
import { useThemeContext } from '../../contexts/ThemeContext';
import { addNewSecurity } from '../../api/client';

interface IProps {
	portfolioId: string;
}

export default function AddSecurityModal({ portfolioId }: Readonly<IProps>) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { theme } = useThemeContext();

	const [securityCategories, setSecurityCategories] = useState<string[]>([]);
	const [securityNamesByCategories, setSecurityNamesByCategories] =
		useState<any>([]);

	const [newSecurity, setNewSecurity] = useState<ISecurityRecord>({
		category: '',
		purchasePrice: 0,
		quantity: 0,
		name: '',
		purchaseDate: new Date(),
	});

	useEffect(() => {
		(async () => {
			const categories = await getSecurityCategories();
			setSecurityCategories(categories);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (newSecurity.category !== '') {
				const newSecurityNameOptions = await getSecurityNamesByCategory(
					newSecurity.category,
				);
				setSecurityNamesByCategories(newSecurityNameOptions);
			}
		})();
	}, [newSecurity.category]);

	function onClickHandler() {
		addNewSecurity(newSecurity, portfolioId);
	}

	function onChangeHandler(e: any) {
		setNewSecurity((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}
	return (
		<>
			<Button
				aria-label='add new security to client portfolio'
				leftIcon={<FaPlus />}
				onClick={onOpen}
				position='fixed'
				right='40px'
				bottom='40px'
				bgColor={`${theme}.500`}
				textColor='white'
			>
				Add Security
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
				<ModalContent p='1em'>
					<ModalHeader>Add Security</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl onChange={onChangeHandler}>
							<FormLabel>Category</FormLabel>
							<Select
								placeholder='Select category'
								name='category'
							>
								{securityCategories.map((category, idx) => (
									<option key={idx}>{category}</option>
								))}
							</Select>
							<FormLabel>Name</FormLabel>
							<Select
								placeholder='Select name'
								name='name'
								disabled={newSecurity?.category === ''}
							>
								{securityNamesByCategories.length !== 0 ? (
									securityNamesByCategories.map(
										(name: string, idx: React.Key) => (
											<option key={idx}>{name}</option>
										),
									)
								) : (
									<option key={0}>
										{' '}
										Select Category first
									</option>
								)}
							</Select>
							<FormLabel>Price</FormLabel>
							<Input
								type='number'
								name='price'
								value={newSecurity.purchasePrice}
								disabled={newSecurity.name === ''}
							/>
							<FormLabel>Quantity</FormLabel>
							<Input type='number' name='quantity' />
							<Center mt='10px'>
								<Button onClick={onClickHandler}>
									Add Security
								</Button>
							</Center>
						</FormControl>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
