import { FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginInfo, loginHandler } from '../api/auth';
import AuthFormLayout from '../components/Layouts/AuthFormLayout';

export default function Login() {
	const [form, setForm] = useState<LoginInfo>({ username: '', password: '' });
	const navigate = useNavigate();
	function handleChange(e: any) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	const onSubmitHandler = async () => {
		const advisorId = await loginHandler(form);
		if (advisorId) navigate('/');
		else navigate('/login');
	};

	return (
		<AuthFormLayout onSubmitHandler={onSubmitHandler} authType='Login'>
			<>
				<FormLabel>Email</FormLabel>
				<Input
					name='username'
					type='email'
					value={form.username}
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
