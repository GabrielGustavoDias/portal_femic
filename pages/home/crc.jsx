import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import api, { baseUrl } from '../../config/api';
import LayoutBase from '../../styles/layout/base';
import { Project, ProjectInfo } from '../../styles/home/style.module';
import { modalityList } from '../../utils/projects';
import { FormQuery } from '../../styles/admin/styles.module';
// import { IProject } from '../../types/project';

export default function Crc() {
  const [color, setColor] = useState('');
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '');
  }, []);

  const showAll = () => {
    api
      .get('/profiles/crc', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {});
  };

  const searchProjects = (e) => {
    e.preventDefault();
    api
      .get(
        `/profiles/crc/query?&category=${e.target[0].value}&area=${e.target[1].value}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length < 1) {
          setMessage('Sem projetos para essa pesquisa');
        }
        setProjects(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const renderProjects = () => {
    if (projects.length < 1) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl">
            {message
              ? message
              : 'Selecione uma categoria e uma área científica'}
          </h1>
          {message && (
            <div className="flex flex-col my-4 items-center justify-center">
              <span>
                Caso queira ver todos os projetos de todas as categorias e
                áreas, clique aqui:{' '}
              </span>
              <button
                onClick={showAll}
                className="py-1 px-2 rounded w-fit mt-2 bg-gray-200 hover:bg-gray-300">
                Exibir todos
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        projects &&
        projects.map((proj) => (
          <ProjectInfo style={{ marginBottom: 20 }} key={proj._id}>
            <Project>
              <div className="head">
                <img
                  src={`${baseUrl}/project/logo/${proj._id}`}
                  alt="Logo do projeto"
                />
              </div>
              <div className="button" style={{ backgroundColor: color }}>
                Projeto
              </div>
            </Project>
            <div className="infos-project">
              <label htmlFor="">Título do projeto</label>
              <span>{proj.title}</span>
              <label htmlFor="">ID do projeto</label>
              <span>{proj.id_femic}</span>
              <Link href={`/projetos/view/crc/${proj._id}`} passHref>
                <button style={{ backgroundColor: color }}>ver projeto</button>
              </Link>
            </div>
          </ProjectInfo>
        ))
      );
    }
  };

  return (
    <LayoutBase title="CRC">
      <h1 style={{ marginLeft: '20px' }} className="text-2xl my-4">
        Projetos para Avaliação
      </h1>
      <FormQuery onSubmit={searchProjects} style={{ marginBottom: 30 }}>
        <div className="flex flex-col">
          <label>Categoria</label>
          <select className="input">
            {modalityList('all').map((cat) => (
              <option key={cat.id}>{cat.value}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Área científica</label>
          <select className="input">
            <option value="c_exatas_terra">Ciências Exatas e da Terra</option>
            <option value="c_biologicas">Ciências Biológicas</option>
            <option value="engenharias">Engenharias</option>
            <option value="c_saude">Ciências da Saúde</option>
            <option value="c_agrarias">Ciências Agrárias</option>
            <option value="c_sociais_aplicadas">
              Ciências Sociais Aplicadas
            </option>
            <option value="c_humanas">Ciências Humanas</option>
            <option value="letras_letras_artes">
              Linguística, Letras e Artes
            </option>
          </select>
        </div>
        <button type="submit" style={{ backgroundColor: color }}>
          Pesquisar
        </button>
      </FormQuery>
      {renderProjects()}
    </LayoutBase>
  );
}
