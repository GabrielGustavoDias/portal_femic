import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAlert } from 'react-alert';

import { Container, Input, LoginForm, SubmitButton } from '../../styles/login.style';

import api from '../../config/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Loading } from '@nextui-org/react';

export default function AdminLogin() {
	const [identifier, setIdentifier] = useState('');
	const [pass, setPass] = useState('');
	const [showPass, setShowPass] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const router = useRouter();
	const alert = useAlert();

	const loginFunction = (e: any) => {
		e.preventDefault();
		setDisabled(true);
		api
			.post('admin/login', { identifier, password: pass })
			.then((response) => {
				sessionStorage.setItem('name', response.data.name);
				sessionStorage.setItem('key', response.data._id);
				const url = `https://apiportal.femic.com.br/user/profile/image/${response.data.avatar}`;
				sessionStorage.setItem('avatar', url);
				setDisabled(false);
				router.push('/admin/participantes?user=prof');
			})
			.catch((err) => {
				setDisabled(false);
				if (err.message == 'Network Error') {
					alert.error('Servidor está fora do ar');
					return;
				}
				alert.error('erro ' + err.response.data.message);
				return;
			});
	};

	return (
		<Container style={{ backgroundColor: '#545454' }}>
			<LoginForm>
				<form id="login-admin" onSubmit={(e) => loginFunction(e)}>
					<label htmlFor="identifier">Digite o id</label>
					<Input
						onChange={(e) => setIdentifier(e.target.value)}
						type="text"
						name="identifier"
						autoFocus
						placeholder="Digite aqui"
					/>
					<label htmlFor="password">Senha</label>
					<div className="flex w-full">
						<Input
							onChange={(e) => setPass(e.target.value)}
							type={showPass ? 'text' : 'password'}
							maxLength={30}
							placeholder="Insira sua senha" />
							{pass.length > 1 && (
								<button className="show-pass" type="button" onClick={() => setShowPass(!showPass)}>
									{showPass ? (
										<FiEyeOff size={24} color="#333" />
									) : (
										<FiEye size={24} color="#333" />
									)}
								</button>
							)}
					</div>
					<SubmitButton type="submit" disabled={disabled}>
						{disabled ? <Loading color="white" /> : 'Entrar'}
					</SubmitButton>
				</form>
			</LoginForm>
		</Container>
	);
}
