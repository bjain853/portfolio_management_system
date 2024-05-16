import { FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUpHandler } from '../api/auth';
import AuthFormLayout from '../components/Layouts/AuthFormLayout';
import { SignUpInfo } from '../types/auth';

export default function SignUp() {
	const [form, setForm] = useState<SignUpInfo>({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
	});

	const navigate = useNavigate();

	const onSubmitHandler = async () => {
		const advisorCreated = await signUpHandler(form);
		if (advisorCreated) navigate('/login');
		else navigate('/signup');
	};

	return (
		<AuthFormLayout<SignUpInfo>
			onSubmitHandler={onSubmitHandler}
			buttonText='Sign Up'
			setForm={setForm}
			form={form}
		>
			<>
				<FormLabel pt='1em'>First Name</FormLabel>
				<Input type='text' name='firstName' value={form.firstName} />
				<FormLabel pt='1em'>Last Name</FormLabel>
				<Input type='text' name='lastName' value={form.lastName} />
				<FormLabel>Email</FormLabel>
				<Input name='username' type='email' value={form.username} />
				<FormLabel pt='1em'>Password</FormLabel>
				<Input type='password' name='password' value={form.password} />
			</>
		</AuthFormLayout>
	);
}
