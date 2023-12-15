import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { FiFileText } from 'react-icons/fi';

import {
  FormQuery,
  UserContainer,
  WelcomeHeader,
} from '../../styles/admin/styles.module';
import AdminLayout from '../../styles/layout/admin';

import api, { baseUrl } from '../../config/api';

import { convertSexToString, renderModality } from '../../utils/user';

import { ufs } from '../../config/dados';
import { Loading, Pagination } from '@nextui-org/react';

export default function Participantes() {
  const [users, setUsers] = useState([]);
  const [modality, setModality] = useState('');
  const [name, setName] = useState('');

  const [year, setYear] = useState('');
  const [sex, setSex] = useState('');
  const [state, setState] = useState('');
  const [perfil, setPerfil] = useState('');

  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState('default');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setModality(router.asPath.split('=')[1]);
    setName(sessionStorage.getItem('name') || '');
    setTotalUsers(0);
    setUsers([]);
    setLoading(true);
    setSearch('default');
    const routeType = router.asPath.split('=')[1];
    if (!sessionStorage.getItem('key')) {
      alert('Autenticação não está mais valida, faça login novamente');
      router.push('/');
    }

    api
      .get(`/admin/users/${routeType}/1`)
      .then((response) => {
        setUsers(response.data['users']);
        setLoading(false);
        setTotalUsers(response.data['count']);
      })
      .catch((err) => {
        setLoading(false);
        console.warn(err.message);
      });
  }, [router.asPath]);

  const queryUsers = (e) => {
    e.preventDefault();
    setLoading(true);
    setUsers([]);
    api
      .get(
        `/admin/user/search/query?year=${
          e.target[0].value
        }&modality=${modality}&sex=${
          e.target[1].value
        }&state=${e.target[2].value.toUpperCase()}&perfil=${perfil}`
      )
      .then((response) => {
        setUsers(response.data['users']);
        setLoading(false);
        setSearch('query');
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
      });
  };

  const searchForm = (e) => {
    e.preventDefault();
    setLoading(true);
    setUsers([]);
    api
      .patch(`/admin/users/find`, {
        method: e.target[0].value,
        value: e.target[1].value,
      })
      .then((res) => {
        setUsers(res.data);
        setTotalUsers(1);
        setLoading(false);
        setSearch('query');
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const searchAgain = (page) => {
    setLoading(true);
    setUsers([]);
    if (search !== 'default') {
      api
        .get(
          `/admin/user/search/query?year=${year}&modality=${modality}&sex=${sex}&state=${state.toUpperCase()}&page=${page}&perfil=${perfil}`
        )
        .then((response) => {
          setUsers(response.data['users']);
          setTotalUsers(response.data['count']);
          setLoading(false);
          setSearch('query');
        })
        .catch((err) => {
          console.warn(err);
          setLoading(false);
        });
    } else {
      api
        .get(`/admin/users/${router.asPath.split('=')[1]}/${page}`)
        .then((response) => {
          setUsers(response.data['users']);
          setLoading(false);
          setTotalUsers(response.data['count']);
        })
        .catch((err) => {
          setLoading(false);
          console.warn(err.message);
        });
    }
  };

  const showDocIcon = (user) => {
    if (user.adult) {
      return (
        <span style={{ fontSize: 12, color: '#777', marginLeft: 4 }}>+18</span>
      );
    } else if (!user.adult && user.terms.document_ref) {
      return <FiFileText size={16} color="#777" style={{ marginLeft: 4 }} />;
    } else {
      return null;
    }
  };

  return (
    <AdminLayout>
      <WelcomeHeader>
        <form onSubmit={searchForm}>
          <select>
            <option value="cpf">CPF</option>
            <option value="name">Nome</option>
          </select>
          <input required />
          <button type="submit">Pesquisar</button>
        </form>
        <h1>Olá {name}, seja bem-vinda!</h1>
        <p>Participantes FEMIC {renderModality(modality)}</p>
        <span>
          <span className="mr-2 text-orange-500 text-base">{totalUsers}</span>
        </span>
      </WelcomeHeader>
      <FormQuery onSubmit={queryUsers} autoComplete="off">
        <div className="flex flex-col">
          <label>Ano</label>
          <input
            type="number"
            className="input"
            defaultValue={new Date().getFullYear()}
            min={1800}
            size={4}
            max={new Date().getFullYear()}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Sexo</label>
          <select className="input" onChange={(e) => setSex(e.target.value)}>
            <option value="" selected>
              Todos
            </option>
            <option value="f">Feminino</option>
            <option value="m">Masculino</option>
            <option value="+">Não informado</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Localização</label>
          <input
            className="input"
            list="list-ufs"
            size={2}
            onChange={(e) => setState(e.target.value)}
            maxLength={2}
            type="text"
          />
          <datalist style={{ display: 'none' }} id="list-ufs">
            {ufs.map((uf) => (
              <option key={uf.id} value={uf.sigla}></option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col">
          <label>Perfil</label>
          <select className="input" onChange={(e) => setPerfil(e.target.value)}>
            <option value="">Todos</option>
            <option value="verificado">Verificado</option>
            <option value="n_verificado">Não verificado</option>
          </select>
        </div>
        <button>Filtrar</button>
      </FormQuery>
      {loading && <Loading color="warning" />}
      {users.length > 0 &&
        users.map((user) => (
          <UserContainer key={user._id}>
            <img
              width={50}
              height={50}
              src={`${baseUrl}/user/profile/image/${user.avatar_url}`}
              alt="Avatar do participante"
            />
            <div className="flex flex-col w-60">
              <span className="title">{user.name}</span>
              <span className="sub">{user.identifier}</span>
            </div>
            <div className="flex flex-col">
              <span className="title">Sexo</span>
              <span className="sub"> {convertSexToString(user.sex)}</span>
            </div>
            <div className="flex flex-col">
              <span className="title flex flex-row items-center">
                Perfil{showDocIcon(user)}
              </span>
              <span className="sub flex flex-row">
                {user.terms.isEnabled ? 'Verificado' : 'Não verificado'}
              </span>
            </div>
            <Link href={`/admin/perfis/participante/${user._id}`} passHref>
              ver participante
            </Link>
          </UserContainer>
        ))}
      {users.length == 0 && (
        <h1>Sem perfis de {renderModality(modality)} para mostrar</h1>
      )}
      <Pagination
        css={{ alignSelf: 'center' }}
        color="warning"
        rounded
        total={Math.floor(totalUsers / 10) + 1}
        initialPage={1}
        onChange={(e) => searchAgain(e)}
      />
    </AdminLayout>
  );
}
