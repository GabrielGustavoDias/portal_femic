import { useState, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  FiFileText,
  FiUser,
  FiMapPin,
  FiMail,
  FiPaperclip,
  FiPhone,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import { useAlert } from 'react-alert';

import AdminLayout from '../../../../styles/layout/admin';
import { DataList } from '../../../../styles/user/perfil';

import {
  convertSexToString,
  renderColor,
  renderDate,
  renderModality,
} from '../../../../utils/user';

import api, { baseUrl } from '../../../../config/api';
import { AdmContent } from '../../../../styles/admin/perfis/participante/styles.module';
import { Modal, Text } from '@nextui-org/react';
import CardPeople from '../../../../components/CardPeople';
import CardProject from '../../../../components/CardProject';

const PerfilParticipante: NextPage = (prop: any) => {
  const [terms, setTerms] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [dateNas, setDateNas] = useState<string | Date>('');
  const [name, setName] = useState('');
  const [profiles, setProfiles] = useState('');
  const [passAuth, setPassAuth] = useState('');
  const [showPas, setShowPass] = useState(false);
  const [visiblePassAuth, setVisiblePassAuth] = useState(false);
  const [projects, setProjects] = useState<any | []>([]);
  const [projectsOri, setProjectsOri] = useState<any | []>([]);

  const alert = useAlert();
  const router = useRouter();

  const { user } = prop;

  useEffect(() => {
    setProfiles(user.profiles.map((pro: any) => pro.name).join());
    user.profiles.map((prof: any) => {
      if (prof.name == 'mais') {
        api.get(`project/profile/${prof.id}`).then((res) => {
          setProjects(res.data);
        });
      } else if ('jov,jun'.includes(prof.name)) {
        api.get(`project/profile/${prof.id}`).then((res) => {
          setProjects(res.data);
        });
      }
      if ('ori'.includes(prof.name)) {
        api.get(`project/profile/${prof.id}`).then((res) => {
          setProjectsOri(res.data);
        });
      }
    });
  }, []);

  const changeData = (value: string) => {
    let data = {};

    if (value == 'identifier') {
      if (!identifier) {
        alert.error('Digite um CPF');
        return;
      }
      data = { identifier: identifier };
    } else if ((value = 'name')) {
      if (!name) {
        alert.error('Digite um nome valido');
        return;
      }
      data = { name: name };
    } else if (value == 'date') {
      if (!dateNas) {
        alert.error('coloque uma data valida');
        return;
      }
      data = { date_nas: new Date(dateNas).toISOString() };
    } else if (value == 'terms') {
      data = { 'terms.isEnabled': terms };
    } else {
      return;
    }

    api
      .patch(`/admin/users/update/${user._id}`, data)
      .then(() => alert.success(`Alterado com sucesso`))
      .catch((err) => {
        alert.error('Erro');
      });
  };

  const changeTerms = () => {
    api
      .patch(`/admin/users/update/${user._id}`, { 'terms.isEnabled': terms })
      .then((response) => {
        api.patch('/user/sendemail/confirm-terms', {
          name: user.name,
          email: user.email,
          adult: user.adult,
        });
        alert.success('Alterado com sucesso');
      })
      .catch((err) => {
        alert.error('Erro ao alterar');
      });
  };

  const updateNewProfiles = () => {
    api
      .patch(`/admin/users/update/${user._id}`, { renew: true })
      .then((res) => {
        alert.success('Perfis serão atualizados ao usuario logar');
        console.log(res.data);
      })
      .catch((err) => {
        alert.error('Erro ao alterar');
        console.warn(err);
      });
  };

  const updateProfile = (profile: string) => {
    const action = profiles.indexOf(profile) == -1 ? 'add' : 'remove';

    const confirmation = confirm(
      `Deseja realmente ${
        action == 'add' ? 'adicionar' : 'remover'
      } esse perfil ao participante?`
    );
    if (confirmation) {
      if (action == 'remove') {
        let aux = profiles.split(',');
        aux[aux.indexOf(profile)] = '';
        setProfiles(aux.join());
      } else {
        setProfiles(profiles + ',' + profile);
      }

      api
        .patch('/admin/users/addprofile', { id: user._id, profile, action })
        .then((res) => {
          alert.success('Alterado com sucesso');
        })
        .catch((err) => {
          alert.error('ocorreu algum erro');
        });
    }
  };

  const updatePass = (e: any) => {
    e.preventDefault();
    const pass = e.target[0].value;
    api
      .post('/user/recover/password/auth', { pass, id: user._id })
      .then((res) => {
        alert.success('Senha alterada com sucesso');
        // router.push('/login');
      })
      .catch((err) => {
        console.log('erro');
      });
  };

  const renderTerms = () => {
    if (user.adult) {
      return (
        <>
          <span>
            O participante é <b>adulto</b> e
            {user.terms?.isEnabled
              ? ' Já concordou com os termos'
              : ' Ainda não assinou os termos'}
          </span>
          <select
            name=""
            id=""
            onChange={(e) => setTerms(e.target.value == 's')}>
            <option value="" selected disabled>
              Selecione aqui
            </option>
            <option value="s">Validado</option>
            <option value="n">Não validado</option>
          </select>
          <button style={{ backgroundColor: '#1B7824' }} onClick={changeTerms}>
            Salvar
          </button>
        </>
      );
    } else {
      return (
        <>
          <span>Termo de Autorização para Criança e Adolescente.</span>
          {user.terms?.document_ref ? (
            <a
              target="_blank"
              href={`${baseUrl}/admin/user/termos/${user._id}`}
              className="flex my-3"
              rel="noreferrer"
              download>
              <FiFileText color="#333" size={24} /> Documento
            </a>
          ) : (
            <span>
              Este participante é menor de idade e ainda não enviou o Termo de
              Autorização para Criança e Adolescente.
            </span>
          )}
          <span className="text-slate-700">
            {user.terms.isEnabled ? 'Validado' : 'Não validado'}
          </span>
          <select
            name=""
            id=""
            onChange={(e) => setTerms(e.target.value == 's')}>
            <option value="" selected disabled>
              Selecione aqui
            </option>
            <option value="s">Validado</option>
            <option value="n">Não validado</option>
          </select>
          <button style={{ backgroundColor: '#1B7824' }} onClick={changeTerms}>
            Salvar
          </button>
        </>
      );
    }
  };

  const deleteUser = () => {
    api
      .patch('/admin/user/delete', { password: passAuth, user: user._id })
      .then((res) => {
        setVisiblePassAuth(false);
        router.back();
      })
      .catch((err) => {
        setVisiblePassAuth(false);
        console.warn(err);
      });
  };

  return (
    <AdminLayout>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visiblePassAuth}
        onClose={() => setVisiblePassAuth(false)}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Digite a sua senha de login para autorizar essa exclusão.
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center">
            <div className="flex">
              <input
                className="border rounded h-11 pl-2"
                placeholder="Digite a senha aqui"
                type={showPas ? 'text' : 'password'}
                onChange={(e) => setPassAuth(e.target.value)}
              />
              <button
                className="ml-2 h-11 w-11 flex items-center justify-center hover:bg-slate-50"
                onClick={() => setShowPass(!showPas)}>
                {showPas ? (
                  <FiEyeOff size={24} color="#333" />
                ) : (
                  <FiEye size={24} color="#333" />
                )}
              </button>
            </div>
            <button
              className="h-11 px-4 bg-gray-700 text-white mt-4"
              onClick={deleteUser}>
              Excluir
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {user && (
        <div className="flex flex-row w-full items-start justify-center">
          <div className="flex flex-col w-1/4 items-center ">
            <div className="w-44 h-44 rounded-md bg-slate-500">
              <img
                alt="Perfil de usuário"
                className="w-full h-full bg-contain rounded object-cover"
                src={`${baseUrl}/user/profile/image/${user.avatar_url}`}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="font-semibold text-2xl">{user.name}</h2>
            <h3 className="text-base mb-1 text-slate-500">
              Participante desde{' '}
              {new Date(user.singUp_date).toLocaleDateString()}
            </h3>
            <p className="flex items-center">
              <FiUser size={18} color="#333" style={{ marginRight: 10 }} />
              CPF: {user.identifier}
            </p>
            <p className="flex items-center">
              <FiMapPin size={18} color="#333" style={{ marginRight: 10 }} />
              {user.city}/{user.state?.toUpperCase()}-{user.country}
            </p>
            <p className="flex items-center">
              <FiMail size={18} color="#333" style={{ marginRight: 10 }} />
              {user.email}
            </p>
            <p className="flex items-center">
              <FiPhone size={18} color="#333" style={{ marginRight: 10 }} />
              {user.number}
            </p>
            <p className="flex items-center">
              <FiPaperclip size={18} color="#333" style={{ marginRight: 10 }} />
              FEMIC {renderModality(user.modality)}
            </p>
          </div>
        </div>
      )}
      <DataList>
        <span className="title">Data de nascimento</span>
        <span className="value">{renderDate(user.date_nas)}</span>
        <span className="title">Sexo</span>
        <span className="value">{convertSexToString(user.sex)}</span>
        <span className="title">Associado AMPIC</span>
        <span className="value">
          {user.associated_ampic == 's' ? 'Sim' : 'Não'}
        </span>
        <span className="title">Como você classifica sua cor?</span>
        <span className="value capitalize">{renderColor(user.color)}</span>
        <span className="title">Escolaridade</span>
        <span className="value">{user.school}</span>
        {user.formation && (
          <>
            <span className="title">Area de atuação profissional</span>
            <span className="value">{user.formation}</span>
          </>
        )}
        <span className="title">Possui alguma necessidade especial?</span>
        <span className="value">{user.especial == 's' ? 'Sim' : 'Não'}</span>
        {user.especial && (
          <>
            <span className="title">Que tipo de necessidade</span>
            <span className="value">
              {user.especial_type || 'Não informado'}
            </span>
          </>
        )}
        <span className="title">Você é fluente em qual(is) idiomas?</span>
        <span className="value">{user.fluent}</span>
        <div className="flex w-full gap-2">
          {projects.map((project: any) => (
            <CardProject key={project._id} project={project} />
          ))}
        </div>
        {projectsOri.length > 0 && (
          <>
            <span>Projetos Orientados: </span>
            {projectsOri.map((projec: any) => (
              <CardProject key={projec._id} project={projec} />
            ))}
          </>
        )}
        <AdmContent>
          <h1>Funções administrativas</h1>
          <span>Termo de autorização</span>
          {renderTerms()}
          {user.modality == 'prof' && (
            <>
              <span>Funções profissionais complementares</span>
              <div className="flex items-center gap-3">
                <p>CRC:</p>
                <button
                  className="func"
                  onClick={() => updateProfile('crc')}
                  style={
                    profiles.indexOf('crc') == -1
                      ? { backgroundColor: '#EAB126' }
                      : { backgroundColor: '#F24C4E' }
                  }>
                  {profiles.indexOf('crc') == -1 ? 'Adicionar' : 'Remover'}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <p>Avaliador:</p>
                <button
                  className="func"
                  onClick={() => updateProfile('avaliador')}
                  style={
                    profiles.indexOf('avaliador') == -1
                      ? { backgroundColor: '#EAB126' }
                      : { backgroundColor: '#F24C4E' }
                  }>
                  {profiles.indexOf('avaliador') == -1
                    ? 'Adicionar'
                    : 'Remover'}
                </button>
              </div>
            </>
          )}
          <span>Enviar notificação</span>
          <textarea></textarea>
          <button style={{ backgroundColor: '#1B7824' }}>Enviar</button>
          <span>Editar o nome</span>
          <input
            defaultValue={user.name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => changeData('name')}>Alterar</button>
          <span>Editar CPF</span>
          <input
            defaultValue={user.identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <button
            style={{ background: '#F24C4E' }}
            onClick={() => changeData('identifier')}>
            Alterar
          </button>
          <span>Editar Data de Nascimento</span>
          <span>atual: {renderDate(user.date_nas)}</span>
          <input type="date" onChange={(e) => setDateNas(e.target.value)} />
          <button
            style={{ background: '#F24C4E' }}
            onClick={() => changeData('date')}>
            Alterar
          </button>
          <form onSubmit={updatePass} className="flex flex-col">
            <span>Gerar nova senha: </span>
            <span className="sub-label text-gray-700">
              Digite uma senha nova
            </span>
            <input
              minLength={6}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
              required
            />
            <button style={{ background: '#F24C4E' }}>Alterar</button>
          </form>
          <span>Atualizar Perfis</span>
          <button
            style={{ background: '#F24C4E' }}
            onClick={() => updateNewProfiles()}>
            Atualizar
          </button>
          <span>Deletar usuário</span>
          <button
            style={{ background: '#F24C4E' }}
            onClick={() => setVisiblePassAuth(true)}>
            Excluir
          </button>
        </AdmContent>
      </DataList>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const userData = await fetch(`${baseUrl}/admin/user/profile/${id}`);
  const user = await userData.json();
  return {
    props: {
      user: user,
    },
  };
};

export default PerfilParticipante;
