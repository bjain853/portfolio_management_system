import { FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginHandler } from '../api/auth';
import AuthFormLayout from '../components/Layouts/AuthFormLayout';
import { LoginInfo } from '../types/auth';
import { useAdvisorContext } from '../contexts/AdvisorContext';

export default function Login() {
	const [form, setForm] = useState<LoginInfo>({ username: '', password: '' });
	const { setAdvisor } = useAdvisorContext();
	const navigate = useNavigate();

	function handleChange(e: any) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	const onSubmitHandler = async () => {
		const advisor = await loginHandler(form);
		if (advisor) {
			setAdvisor(advisor);
			navigate('/');
		} else navigate('/login');
	};

	return (
		<AuthFormLayout onSubmitHandler={onSubmitHandler} authType='Login'>
			<>
				<FormLabel>Email</FormLabel>
				<Input
					name='username'
					type='email'
					value={form.username}
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
