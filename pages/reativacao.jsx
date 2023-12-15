import Link from 'next/link';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import api, { baseUrl } from '../config/api';

export default function Reativacao() {
  const [nome, setNome] = useState('');

  const alert = useAlert();
  const router = useRouter();

  useEffect(() => {
    setNome(sessionStorage.getItem('name') || '');
  }, []);

  const reativacao = (e) => {
    e.preventDefault();
    const data = {
      cpf: e.target[0].value,
      data: e.target[1].value,
      pass: e.target[2].value,
      rpass: e.target[3].value,
    };
    api
      .patch('/user/reativar', data, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((res) => {
        alert.show('Conta reativada');
        router.push('/home/' + sessionStorage.getItem('page'));
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="w-full bg-white h-16 items-center flex md:px-20 px-5">
        <h1 className="text-2xl">Reativar conta</h1>
      </div>
      <div className="flex flex-col md:px-20 px-5 py-10 bg-slate-100">
        <h1>Olá, {nome}</h1>
        <span>Sua conta está desativada.</span>
        <span>Para reativar, forneça as informações a seguir.</span>
        <form className="flex flex-col gap-2 items-start" onSubmit={reativacao}>
          <label>CPF</label>
          <input className="w-64 px-2 rounded h-8 mb-4" />
          <label htmlFor="">Data de nascimento</label>
          <input type="date" className="w-64 px-2 rounded h-8 mb-4" />

          <label htmlFor="">Sua senha: </label>
          <input type="password" className="w-64 px-2 rounded h-8 mb-4" />
          <label htmlFor="">digite novamente: </label>
          <input type="password" className="w-64 px-2 rounded h-8 mb-4" />
          <span>
            Quando você pressionar o botão abaixo, seus projetos, histórico de
            participação, certificados e autorizações ficarão ativos novamente.
          </span>
          <label htmlFor="check" className="">
            <input type="checkbox" id="check" className="mx-2" />
            Concordo com as{' '}
            <Link href="https://femic.com.br/politica-de-privacidade/">
              regras e políticas
            </Link>{' '}
            de privacidades da FEMIC
          </label>
          <button className="text-white py-4 px-6 rounded bg-emerald-400 font-bold">
            Reativar conta
          </button>
        </form>
      </div>
    </div>
  );
}
