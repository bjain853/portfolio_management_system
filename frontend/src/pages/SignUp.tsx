import { FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUpHandler } from '../api/auth';
import AuthFormLayout from '../components/Layouts/AuthFormLayout';
import { SignUpInfo } from '../types/auth';

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
		if (advisorId) navigate('/login');
		else navigate('/signup');
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
				/>
				<FormLabel pt='1em'>Last Name</FormLabel>
				<Input
					type='text'
					name='lastName'
					value={form.lastName}
					onChange={handleChange}
				/>
				<FormLabel>Email</FormLabel>
				<Input
					name='email'
					type='email'
					value={form.email}
					onChange={handleChange}
				/>
				<FormLabel pt='1em'>Password</FormLabel>
				<Input
					type='password'
					name='password'
					value={form.password}
					onChange={handleChange}
				/>
			</>
		</AuthFormLayout>
	);
}
