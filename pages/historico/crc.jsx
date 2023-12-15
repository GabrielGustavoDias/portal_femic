import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import LayoutBase from '../../styles/layout/base';
import { ProjectList, Project } from '../../styles/feiraperfil';

import api from '../../config/api';
import { FormQuery } from '../../styles/admin/styles.module';

export default function CrcHistorico() {
  const [projects, setProjects] = useState([]);
  const [year, setYear] = (useState < number) | (string > 2022);
  const [state, setState] = useState('');
  const [modality, setModality] = useState('');
  const [stateAux, setStateAux] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (router.asPath.split('/')[2] !== sessionStorage.getItem('page')) {
      router.push('/');
    }
    api
      .get(`project/profile/${sessionStorage.getItem('profile_id')}`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const submitQuery = (e) => {
    e.preventDefault();
    api
      .get(
        `/affiliate/projects/query?year=${year}&state=${state}&modality=${modality}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setProjects(res.data);
        setStateAux(state);
      });
  };

  return (
    <LayoutBase title="Histórico">
      <ProjectList>
        {projects.length > 0 &&
          projects.map((pro) => (
            <Project key={pro._id}>
              <img
                src={`https://apiportal.femic.com.br/project/logo/${pro._id}`}
                alt="Logo"
              />
              <div className="flex flex-col">
                <label>{pro.title}</label>
                <span className="sub-label">{pro.id_femic}</span>
              </div>
              <div className="flex flex-col">
                <label>Modalidade</label>
                <span className="sub-label">FEMIC {pro.modality}</span>
              </div>
              <div className="flex flex-col">
                <label>Status</label>
                <span className="sub-label">
                  {pro.crc.recommended ? 'Recomendado' : 'Não recomendado'}
                </span>
              </div>
            </Project>
          ))}
      </ProjectList>
    </LayoutBase>
  );
}
