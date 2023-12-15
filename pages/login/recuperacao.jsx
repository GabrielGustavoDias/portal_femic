import Image from 'next/image';
import {
  Banner,
  Container,
  Input,
  LoginForm,
  SubmitButton,
} from '../../styles/login.style';

import api from '../../config/api';
import banner from '../../public/imagens/banner_head.png';
import { useState } from 'react';
import { cpfPassportMask } from '../../utils/masks';
import { useAlert } from 'react-alert';
import { Loading } from '@nextui-org/react';

export default function Recuperacao() {
  const [identifier, setIdentifier] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');

  const alert = useAlert();

  const recover = (e) => {
    e.preventDefault();
    setDisabled(true);
    api
      .post('/user/recover/password', { identifier, email })
      .then((res) => {
        alert.show(
          'Verifique sua caixa de email. (caso não encontre, veja também sua caixa de spam).'
        );
        setDisabled(false);
      })
      .catch((err) => {
        alert.error(err.response.data.message);
        setDisabled(false);
      });
  };

  return (
    <Container>
      <LoginForm>
        <h1>
          Digite o CPF e e-mail da conta para <b>recuperar</b> a senha
        </h1>
        <form className="tabs" onSubmit={recover}>
          <label htmlFor="identifier">CPF ou PASSAPORTE</label>
          <Input
            onChange={(e) => setIdentifier(cpfPassportMask(e.target.value))}
            type="text"
            autoFocus
            maxLength={11}
            placeholder="Digite aqui"
            required
          />
          <label htmlFor="email">Email</label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Insira seu e-mail"
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
