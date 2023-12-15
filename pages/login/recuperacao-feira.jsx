import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import {
  Banner,
  Container,
  Input,
  LoginForm,
  SubmitButton,
} from '../../styles/login.style';

import { useState } from 'react';

import api from '../../config/api';
import banner from '../../public/imagens/banner_head.png';
import { Loading } from '@nextui-org/react';

export default function RecuperacaoFeira() {
  const [identifier, setIdentifier] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');

  const router = useRouter();
  const alert = useAlert();

  const recover = (e) => {
    e.preventDefault();
    api
      .post('/affiliate/recover/password', { identifier, email })
      .then((res) => {
        alert.show('Verifique sua caixa de emails');
        router.push('/');
      })
      .catch((err) => {
        alert.error(err.response.data.message);
      });
  };

  return (
    <Container>
      <LoginForm>
        <h1>
          Digite o ID da sua feira e e-mail da conta para <b>recuperar</b> a
          senha
        </h1>
        <form className="tabs" onSubmit={recover}>
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
          <label htmlFor="email">Email</label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Insira o e-mail da sua feira"
            required
          />
          <SubmitButton type="submit" disabled={disabled}>
            {disabled ? <Loading color="white" /> : 'Entrar'}
          </SubmitButton>
        </form>
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
