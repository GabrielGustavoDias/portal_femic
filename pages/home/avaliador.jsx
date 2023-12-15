import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import api, { baseUrl } from '../../config/api';
import LayoutBase from '../../styles/layout/base';
import { Project, ProjectInfo } from '../../styles/home/style.module';
import { Loading } from '@nextui-org/react';
import { useAlert } from 'react-alert';
// import { IProject } from '../../types/project';

export default function Crc() {
  const [color, setColor] = useState('');

  const [projects, setProjects] = useState([]);
  const [disabledNewProject, setDisabledNewProject] = useState(false);

  const [load, setLoad] = useState(false);

  const router = useRouter();

  const alert = useAlert();

  useEffect(() => {
    setLoad(true);
    api
      .get(`project/profile/${sessionStorage.getItem('profile_id')}`)
      .then((response) => {
        setLoad(false);
        setProjects(response.data);
      })
      .catch((err) => {
        alert.error('ouve algum erro ao requisitar os projetos');
        console.warn(err);
      });
    setColor(sessionStorage.getItem('color') || '');
  }, []);

  const renderProjects = () => {
    if (projects.length < 1) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl">Você não tem projetos para avaliar</h1>
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
              <Link
                href={`/projetos/view/${
                  'finalista,confirmado,concluido'.includes(proj.status)
                    ? 'avaliacao_final'
                    : 'avaliador'
                }/${proj._id}`}
                passHref>
                <a style={{ backgroundColor: color, color: '#fff' }}>Avaliar</a>
              </Link>
            </div>
          </ProjectInfo>
        ))
      );
    }
  };

  return (
    <LayoutBase title="Avaliador">
      {load && <Loading color="warning" />}
      {renderProjects()}
    </LayoutBase>
  );
}
