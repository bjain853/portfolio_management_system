import { FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginHandler } from '../api/auth';
import AuthFormLayout from '../components/Layouts/AuthFormLayout';
import { useAdvisorContext } from '../contexts/AdvisorContext';
import { LoginInfo } from '../types/auth';

export default function Login() {
	const [form, setForm] = useState<LoginInfo>({ username: '', password: '' });
	const { setAdvisor } = useAdvisorContext();
	const navigate = useNavigate();

	const onSubmitHandler = async () => {
		try {
			const loggedInAdvisor = await loginHandler(form);
			if (loggedInAdvisor) {
				setAdvisor(loggedInAdvisor);
				navigate('/');
			}
		} catch (e: any) {
			console.log(e);
			navigate('/login');
		}
	};

	return (
		<AuthFormLayout<LoginInfo>
			onSubmitHandler={onSubmitHandler}
			setForm={setForm}
			form={form}
			buttonText='Login'
		>
			<>
				<FormLabel>Email</FormLabel>
				<Input name='username' type='email' value={form.username} />
				<FormLabel pt='1em'>Password</FormLabel>
				<Input type='password' name='password' value={form.password} />
			</>
		</AuthFormLayout>
	);
}
