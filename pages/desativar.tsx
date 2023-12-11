import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import LayoutBase from '../styles/layout/base';
import api, { baseUrl } from '../config/api';

export default function Desativar() {
  const [name,setName] = useState('');

	const alert = useAlert();	
  const router = useRouter();

	useEffect(() => {
		if (!sessionStorage.getItem('token')) {
			alert.show('Faça login novamente');
			router.push('/');
    }
    setName(sessionStorage.getItem("name") || "");
	},[]);

	const desativeAcount = (e: any) => {
		e.preventDefault();

    api.patch('/user/desativar', {
      pass: e.target[1].value,
      rpass: e.target[2].value,
      motivo: e.target[0].value
    },{
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    }).then(res => {
      console.log(res.data);
      sessionStorage.clear();
      router.push('/');

    }).catch(err => {
      alert.error(err.response.data.message);
      console.warn(err);
    })
	}
	return (
    <LayoutBase title="Desativar conta">
    <div className="px-5">
			<h1 className="text-xl">Olá {name}</h1>
			<h2 className="mb-4">Ao desativar sua conta ela ficará oculta até você reativá-la novamente fazendo login.</h2>

			<form onSubmit={desativeAcount} className="flex flex-col gap-2 items-start">
				<label>Por que você está desativando a sua conta?</label>
				<input type="text" className="w-64 px-2 rounded h-8 mb-4" />
				<label>Para continuar, insira sua senha.</label>
				<input type="password" className="w-64 px-2 rounded h-8 mb-4"  />
				<label>Confirme sua senha.</label>
				<input type="password" className="w-64 px-2 rounded h-8 mb-4" />
				<span>Quando você pressionar o botão abaixo, seus projetos, histórico de participação, certificados e autorizações ficarão ocultos até você reativar sua conta fazendo login novamente.</span>
				<button className="text-white py-4 px-6 rounded bg-yellow-400" type="submit">Desativar conta</button>
			</form>
    </div>
		</LayoutBase>
		);
}
