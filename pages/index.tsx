import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loading, Pagination } from '@nextui-org/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { Container, Main, Landing } from '../styles/home.style';
import { FormQuery } from '../styles/admin/styles.module';

import { ufs } from '../config/dados';
import api, { baseUrl } from '../config/api';
import { getUsers } from '../services/users';

import landing from '../public/imagens/landing2.png';

interface IUsers {
  name: string;
  avatar_url: string;
  country: string;
  state: string;
}

interface RequestUsers {
  count: number;
  limit: number;
  users: IUsers[];
}

interface IAffiliates {
  _id: string;
  name: string;
  logo: string;
  country: string;
  state: string;
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<RequestUsers>({
    count: 0,
    limit: 0,
    users: [{ name: '', avatar_url: '', country: '', state: '' }],
  });
  const [projects, setProjects] = useState<any[] | []>([]);
  const [projectFilter, setProjectsFilter] = useState('Educação Infantil');

  const [affiliates, setAffiliates] = useState<[] | IAffiliates[]>([]);
  const [indexAffiliate, setIndexAffiliate] = useState(0);

  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const requestUsers = (data: any) => {
    setLoad(true);
    setUsers({
      count: 0,
      limit: 0,
      users: [],
    });
    getUsers(data).then((res: any) => {
      setUsers(res.data);
      setLoad(false);
    });
  };

  const requestPageUsers = (page: number) => {
    getUsers({
      country: watch('country'),
      state: watch('state'),
      modality: watch('modality'),
      page,
    }).then((res: any) => {
      setUsers(res.data);
    });
  };

  const updateIndex = (action: string) => {
    if (action == 'mais') {
      let index = indexAffiliate;

      index++;
      if (index >= affiliates.length) {
        return;
      } else {
        setIndexAffiliate(index);
      }
    } else {
      let index = indexAffiliate;

      index--;
      if (index < 0) {
        return;
      } else {
        setIndexAffiliate(index);
      }
    }
  };

  useEffect(() => {
    getUsers({ country: 'Brasil', state: 'MG', modality: 'jov', page: 0 }).then(
      (res: any) => {
        setUsers(res.data);
      }
    );
    api.get('/affiliate/show').then((res) => {
      setAffiliates(res.data);
    });
    api.get('/project/show').then((res) => {
      setProjects(res.data);
      console.log(res.data[0]);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Portal FEMIC</title>
      </Head>
      <NavBar />
      <Container>
        <Main>
          <div className="flex flex-col">
            <h1>Portal</h1>
            <h1 className="alt">FEMIC</h1>
            <h3 className="text-gray-800">
              Feira Mineira de Iniciação Científica
            </h3>
          </div>
          <Landing src={landing} />
        </Main>
      </Container>
      <Container className="bg-slate-100 py-5 items-center flex justify-center">
        <Main className="">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/6zjjjQXkPZQ"
            title="FEMIC melhores momentos"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
          <div className="flex flex-col ml-3 pt-5 gap-4 h-fit justify-between">
            <h2 className="text-4xl font-semibold">
              Mais de <span style={{ color: '#1B7824' }}>3 mil</span> pessoas já
              passaram pela FEMIC nesses últimos anos.
            </h2>
            <h3 className="text-xl text-gray-800">
              Faça você, também, parte dessa comunidade incrível.
            </h3>
            <Link href="/cadastro/participante" passHref>
              <a className="border bg-transparent w-fit border-slate-700 text-gray-900 px-4 py-3">
                CADASTRAR NA FEMIC
              </a>
            </Link>
          </div>
        </Main>
      </Container>
      <Container
        className="py-5"
        style={{ backgroundColor: '#263238', marginTop: 0 }}>
        <div className="flex flex-col gap-3 items-center container">
          <h2 className="text-white text-4xl font-semibold text-center">
            Inscritos esse ano
          </h2>
          <span className="text-center text-slate-200 text-2xl">
            Já temos mais de <span style={{ color: '#1FB58F' }}>4 mil</span>{' '}
            pessoas cadastradas na FEMIC {new Date().getFullYear()}.<br />{' '}
            Conheça abaixo nossa comunidade.
          </span>
        </div>
        <FormQuery onSubmit={handleSubmit(requestUsers)}>
          <div className="flex flex-col">
            <label className="text-white">País</label>
            <select className="input" {...register('country')}>
              <option selected>Brasil</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-white">Estado</label>
            <select className="input" {...register('state')}>
              {ufs.map((uf) => (
                <option
                  key={uf.id}
                  value={uf.sigla}
                  selected={uf.sigla == 'MG'}>
                  {uf.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-white">Modalidade</label>
            <select className="input" {...register('modality')}>
              <option value="jov" selected>
                FEMIC Jovem
              </option>
              <option value="jun">FEMIC Júnior</option>
              <option value="mais">FEMIC Mais</option>
            </select>
          </div>
          <button type="submit">Pesquisar</button>
        </FormQuery>
        <div className="flex gap-4 flex-col overflow-x-hidden md:flex-row pb-10">
          {load && <Loading color="warning" />}
          {users?.users?.map((user: IUsers) => (
            <div
              key={user.avatar_url}
              className="bg-white font-semibold text-center rounded-xl border shadow-lg p-5 max-w-xs">
              <img
                className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
                src={`${baseUrl}/user/profile/image/${user.avatar_url}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = '/default.png';
                }}
                alt={user.name}
              />
              <span className="text-lg overflow-hidden w-28 text-ellipsis text-center">
                {user.name}
              </span>
              <div className="flex gap-4  justify-center">
                <span className="capitalize font-semibold text-base">
                  {user.country}
                </span>
                <span className="uppercase font-bold text-base">
                  {user.state}
                </span>
              </div>
            </div>
          ))}
        </div>
        {users?.limit >= 3 && (
          <Pagination
            noMargin
            total={Math.floor(users?.limit / 3)}
            initialPage={1}
            color="warning"
            onChange={(e) => requestPageUsers(e)}
          />
        )}
      </Container>
      <Container className="py-5 bg-white">
          <select
            className="w-fit h-8 rounded bg-slate-100 my-5"
            onChange={(e) => setProjectsFilter(e.target.value)}>
            <option>Educação Infantil</option>
            <option>Anos Iniciais do Ensino Fundamental</option>
            <option>Anos finais do Ensino Fundamental</option>
            <option>Ensino Médio</option>
            <option>Ensino Técnico</option>
            <option>Ensino Superior em andamento</option>
            <option>Professores da Educação Básica</option>
            <option>Professores e/ou estudantes do Ensino Superior</option>
          </select>
        <div className="flex overflow-x-auto w-full">
          {projects
            .filter((proj) => proj.category == projectFilter)
            .map((proj, index) => (
              <div
                key={proj._id}
                className="rounded bg-slate-100 w-96 min-w-fit ml-5 flex justify-between h-48">
                <div className="flex justify-between flex-col gap-2 p-6">
                  <span className="break-words w-44 h-24 text-ellipsis overflow-hidden font-semibold">
                    {proj.title.substring(0, 25) + "..."}
                  </span>
                  <span>{proj.winner.win_text}</span>
                  <Link href={`/projeto/${proj._id}`} passHref>
                    <a className="text-white bg-red-500 rounded px-6 py-4 flex items-center justify-center">
                      Ver projeto
                    </a>
                  </Link>
                </div>
                <img src={`${baseUrl}/project/logo/${proj._id}`} width="124" />
              </div>
            ))}
        </div>
      </Container>
      <Container className="py-5 bg-slate-100">
        <Main>
          <h2 className="text-7xl font-bold md:text-9xl">
            Feiras <br /> <span style={{ color: '#EAB126' }}>Afiliadas</span>{' '}
            <br />à <span style={{ color: '#1FB58F' }}>FEMIC</span>
          </h2>
          {affiliates[indexAffiliate] && (
            <div className="flex flex-col">
              <div
                className="flex flex-col items-center gap-4 md:justify-start justify-center"
                key={affiliates[indexAffiliate]?._id}>
                <div className="bg-white p-4 gap-4 rounded flex md:flex-row items-center md:justify-center justify-start flex-col ">
                  <img
                    src={`${baseUrl}/affiliate/profile/image/${affiliates[indexAffiliate]?.logo}`}
                    alt="Logo da feira"
                    className="w-32"
                  />
                  <div className="flex flex-col items-center md:items-start justify-center">
                    <h3 className="text-xl text-center md:text-left w-64">
                      {affiliates[indexAffiliate]?.name}
                    </h3>
                    <span>
                      {affiliates[indexAffiliate].country} -{' '}
                      {affiliates[indexAffiliate].state}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="p-1 rounded hover:bg-slate-300"
                    onClick={() => updateIndex('menos')}>
                    <FiChevronLeft size={32} />
                  </button>
                  <span>
                    {indexAffiliate + 1} / {affiliates.length}
                  </span>
                  <button
                    className="p-1 rounded hover:bg-slate-300"
                    onClick={() => updateIndex('mais')}>
                    <FiChevronRight size={32} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
