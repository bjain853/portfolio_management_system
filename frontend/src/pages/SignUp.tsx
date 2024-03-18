import { FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignUpInfo, signUpHandler } from '../api/auth';
import AuthFormLayout from '../components/Layouts/AuthFormLayout';

export default function SignUp() {
	const [form, setForm] = useState<SignUpInfo>({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	});
	const navigate = useNavigate();

	function handleChange(e: any) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	const onSubmitHandler = async () => {
		const advisorId = await signUpHandler(form);
		if (advisorId) navigate('/');
		else navigate('/login');
	};

	return (
		<AuthFormLayout onSubmitHandler={onSubmitHandler} authType='Sign Up'>
			<>
				<FormLabel pt='1em'>First Name</FormLabel>
				<Input
					type='text'
					name='firstName'
					value={form.firstName}
					onChange={handleChange}
					bg='white'
				/>
				<FormLabel pt='1em'>Last Name</FormLabel>
				<Input
					type='text'
					name='lastName'
					value={form.lastName}
					onChange={handleChange}
					bg='white'
				/>
				<FormLabel>Email</FormLabel>
				<Input
					name='email'
					type='email'
					value={form.email}
					bg='white'
					onChange={handleChange}
				/>
				<FormLabel pt='1em'>Password</FormLabel>
				<Input
					type='password'
					name='password'
					value={form.password}
					onChange={handleChange}
					bg='white'
				/>
			</>
		</AuthFormLayout>
	);
}
