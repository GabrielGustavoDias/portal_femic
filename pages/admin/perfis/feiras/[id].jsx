import { useState, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAlert } from 'react-alert';

import { renderModality } from '../../../../utils/user';
import AdminLayout from '../../../../styles/layout/admin';

import api, { baseUrl } from '../../../../config/api';

import { AdmContent } from '../../../../styles/admin/perfis/participante/styles.module';
import { DataList } from '../../../../styles/user/perfil';

const PerfilFeira = (prop) => {
  const [credentials, setCredentials] = useState(0);
  const [hidden, setHidden] = useState('');

  const alert = useAlert();

  const { affiliate } = prop;

  const updateCredentials = () => {
    api
      .patch(`/admin/affiliates/update/${affiliate._id}`, {
        credentials: credentials,
        initial: false,
      })
      .then((res) => {
        alert.success('alterado com sucesso');
      });
  };

  const hiddenAffiliate = () => {
    if (hidden == 's') {
      api
        .patch(`/admin/affiliates/update/${affiliate._id}`, { hidden: true })
        .then((res) => {
          alert.success('Feira ocultada com sucesso');
        });
    } else {
      api
        .patch(`/admin/affiliates/update/${affiliate._id}`, { hidden: false })
        .then((res) => {
          alert.show('Feira está visível');
        });
    }
  };

  const updatePass = (e) => {
    e.preventDefault();
    const pass = e.target[0].value;
    api
      .post('/affiliate/recover/password/auth', { pass, id: affiliate._id })
      .then((res) => {
        alert.success('Senha alterada com sucesso');
        // router.push('/login');
      })
      .catch((err) => {
        console.log('erro');
      });
  };

  return (
    <AdminLayout>
      {affiliate && (
        <div className="flex flex-row w-full items-start justify-center">
          <div className="flex flex-col w-1/4 items-center ">
            <div className="w-32 h-32 rounded-md bg-white">
              <img
                alt="Perfil de usuário"
                className="w-full h-full bg-contain rounded"
                src={`https://apiportal.femic.com.br/affiliate/profile/image/${affiliate.logo}`}
              />
            </div>
            <div className="flex items-center justify-center bg-gray-900 w-32 h-10">
              <span style={{ color: '#FFF' }}>
                {affiliate.credentials} credenciais
              </span>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-semibold text-xl">
              Nome da Feira afiliada
            </label>
            <span className="">{affiliate.name}</span>
            <label className="font-semibold text-xl">
              ID da feira afiliada
            </label>
            <span>{affiliate.identifier}</span>
            <label className="font-semibold text-xl">E-mail</label>
            <span>{affiliate.email}</span>
          </div>
        </div>
      )}
      <DataList>
        <span className="title">Pais</span>
        <span className="value capitalize">{affiliate.country}</span>
        <span className="title">Estado</span>
        <span className="value capitalize">{affiliate.state}</span>
        <span className="title">Cidade</span>
        <span className="value">{affiliate.city}</span>
        <span className="title">Associada à AMPIC</span>
        <span className="value">{affiliate.ampic ? 'Sim' : 'Não'}</span>
        <span className="title">Abrangência da sua feira</span>
        <span className="value">{affiliate.abrangencia}</span>
        <span className="title">Ano da primeira edição da sua feira</span>
        <span className="value">{affiliate.first_year}</span>
        <span className="title">Canais de divulgação da feira</span>
        <span className="value">Instagram: {affiliate.instagram_link}</span>
        <span className="value">Fanpage: {affiliate.fanpage_link}</span>
        <span className="value">Website: {affiliate.website_link}</span>
        <span className="value">YouTube: {affiliate.youtube_link}</span>
        <span className="value">Outro: {affiliate.outros_link}</span>
        <h1>Sobre a afiliação</h1>
        <span className="title">
          Quantidade de projetos previstos para o ano vigente?
        </span>
        <span className="value">{affiliate.quant_proj}</span>
        <span className="title">
          Qual a data previsa para realização da sua feira no ano vigente?
        </span>
        <span className="value">{affiliate.realization_date}</span>
        <h1>Instituição realizadora</h1>
        <span className="title">Nome da instituição</span>
        <span className="value">{affiliate.inst_name}</span>
        <span className="title">Email da instituição</span>
        <span className="value">{affiliate.inst_email}</span>
        <span className="title">Tipo de instituição</span>
        <span className="value">{affiliate.inst_type}</span>
        <h1>Coordenação do evento</h1>
        <span className="title">Nome do(a) coordenador(a)</span>
        <span className="value">{affiliate.cord_name}</span>
        <span className="title">E-mail do(a) coordenador(a)</span>
        <span className="value">{affiliate.cord_email}</span>
        <span className="title">Telefone do(a) coordenador(a)</span>
        <span className="value">{affiliate.cord_phone}</span>
      </DataList>

      <AdmContent style={{ marginLeft: '5%' }}>
        <label>Quantidade de Credenciais</label>
        <input
          type="number"
          defaultValue={affiliate.credentials}
          onChange={(e) => setCredentials(e.target.value)}
        />
        <button
          style={{ backgroundColor: '#1B7824' }}
          type="button"
          onClick={updateCredentials}>
          Enviar
        </button>
        <form onSubmit={updatePass} className="flex flex-col">
          <span>Gerar nova senha: </span>
          <span className="sub-label text-gray-700">Digite uma senha nova</span>
          <input
            minLength={6}
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
            required
          />
          <button style={{ background: '#F24C4E' }}>Alterar</button>
        </form>
        <label>Ocultar feira das buscas</label>
        <span className="text-gray-600">
          {affiliate.hidden ? 'Oculta no momento' : 'Visível no momento'}
        </span>
        <select onChange={(e) => setHidden(e.target.value)}>
          <option value="n">Não</option>
          <option value="s">Sim</option>
        </select>
        <button
          style={{ backgroundColor: '#1B7824' }}
          type="button"
          onClick={hiddenAffiliate}>
          Ocultar
        </button>
      </AdmContent>
    </AdminLayout>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;

  const affiliateData = await fetch(
    `${baseUrl}/admin/affiliates/profile/${id}`
  );
  const affiliate = await affiliateData.json();

  return {
    props: {
      affiliate: affiliate,
    },
  };
};

export default PerfilFeira;
