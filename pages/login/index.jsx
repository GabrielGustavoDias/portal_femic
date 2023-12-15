import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useAlert } from 'react-alert';

import {
  Container,
  LoginForm,
  Banner,
  Input,
  SubmitButton,
} from '../../styles/login.style';
import api, { baseUrl } from '../../config/api';

import banner from '../../public/imagens/banner_head.png';
import { cpfPassportMask } from '../../utils/masks';
import { Loading } from '@nextui-org/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const route = useRouter();

  const alerta = useAlert();

  const loginFunction = (e, profile) => {
    e.preventDefault();
    setDisabled(true);

    api
      .post('/auth/login', { identifier, password: pass })
      .then((response) => {
        sessionStorage.setItem('token', response.data.access_token);
        sessionStorage.setItem('name', response.data.name);

        if (profile == 'user') {
          const url = `${baseUrl}/user/profile/image/${response.data.avatar}`;
          sessionStorage.setItem('avatar', url);

          if (response.data.page == 'mais') {
            sessionStorage.setItem('color', '#F24C4E');
          } else {
            sessionStorage.setItem('color', '#1FB58F');
          }

          sessionStorage.setItem('page', response.data.page);
          sessionStorage.setItem('profile_id', response.data.profile_id);

          if (response.data.desativate) {
            route.push('/reativacao');
            return;
          }

          if (response.data.renew) {
            route.push('/renovar');
            return;
          }
          if (response.data.terms) {
            setTimeout(() => route.push(`/home/${response.data.page}`), 500);
            return;
          } else {
            if (response.data.adult) {
              route.push('/autorizacao/adulto');
            } else {
              route.push('/autorizacao');
            }
          }
        } else {
          const url = `${baseUrl}/affiliate/profile/image/${response.data.avatar}`;
          sessionStorage.setItem('name', response.data.name);
          sessionStorage.setItem('avatar', url);
          sessionStorage.setItem('color', '#1B7824');
          route.push('/home/feira');
        }
        setDisabled(false);
      })
      .catch((err) => {
        setDisabled(false);
        setError(err.message);
        if (err.code == 'ERR_NETWORK') {
          alerta.error('Servidor está fora do ar, tente novamente mais tarde');
          return;
        }
        console.warn(err);
        alerta.error('Login ou senha inválidos');
      });
  };

  return (
    <Container>
      <LoginForm>
        <h1>
          <b>Faça login</b> para entrar no portal FEMIC
        </h1>
        <Tabs
          className="tabs"
          disabledTabClassName="disabled-tab"
          selectedTabClassName="abled-tab">
          <TabList className="tab-label">
            <Tab className="tab">Participantes</Tab>
            <Tab className="tab">Feira Afiliada</Tab>
          </TabList>

          <TabPanel>
            <form id="login" onSubmit={(e) => loginFunction(e, 'user')}>
              <label htmlFor="identifier">CPF ou PASSAPORTE</label>
              <div className="flex w-full">
                <Input
                  onChange={(e) =>
                    setIdentifier(cpfPassportMask(e.target.value))
                  }
                  type="text"
                  name="identifier"
                  autoFocus
                  maxLength={11}
                  placeholder="Digite aqui"
                />
              </div>
              <label htmlFor="password">Senha</label>
              <div className="flex w-full">
                <Input
                  onChange={(e) => setPass(e.target.value)}
                  type={showPass ? 'text' : 'password'}
                  maxLength={30}
                  placeholder="Insira sua senha"
                />
                {pass.length > 1 && (
                  <button
                    className="show-pass"
                    type="button"
                    onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <FiEyeOff size={24} color="#333" />
                    ) : (
                      <FiEye size={24} color="#333" />
                    )}
                  </button>
                )}
              </div>
              <span>
                <Link href="/login/recuperacao">Esqueci minha senha</Link>
              </span>
              <SubmitButton type="submit" disabled={disabled}>
                {disabled ? <Loading color="white" /> : 'Entrar'}
              </SubmitButton>
              <span>
                Ainda não tem conta?{' '}
                <Link href="/cadastro/participante">Cadastre-se</Link>
              </span>
            </form>
          </TabPanel>

          <TabPanel>
            <form id="login" onSubmit={(e) => loginFunction(e, 'affiliate')}>
              <label htmlFor="identifier">Digite o ID da sua Feira</label>
              <Input
                onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                type="text"
                name="identifier"
                autoFocus
                maxLength={9}
                value={identifier}
                style={{ textTransform: 'uppercase' }}
                placeholder="Digite aqui"
              />
              <label htmlFor="password">Senha</label>
              <div className="w-full flex">
                <Input
                  onChange={(e) => setPass(e.target.value)}
                  type={showPass ? 'text' : 'password'}
                  maxLength={30}
                  placeholder="Insira sua senha"
                />
                {pass.length > 0 && (
                  <button
                    className="show-pass"
                    type="button"
                    onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <FiEyeOff size={24} color="#333" />
                    ) : (
                      <FiEye size={24} color="#333" />
                    )}
                  </button>
                )}
              </div>
              <span>
                <Link href="/login/recuperacao-feira">Esqueci minha senha</Link>
              </span>
              <SubmitButton type="submit" disabled={disabled}>
                {disabled ? <Loading color="white" /> : 'Entrar'}
              </SubmitButton>
              <span>
                Cadastre sua feira{' '}
                <Link href="/cadastro/feirafiliada">aqui</Link>
              </span>
            </form>
          </TabPanel>
        </Tabs>
      </LoginForm>
      <Banner>
        <div className="image">
          <Image
            id="banner"
            src={banner}
            layout="fixed"
            width="420"
            height="600"
            alt="banner femic cabeça"
          />
        </div>
      </Banner>
    </Container>
  );
}
