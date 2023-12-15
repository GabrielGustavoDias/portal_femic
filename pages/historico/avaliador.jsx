import LayoutBase from '../../styles/layout/base';

import { useEffect, useState } from 'react';
import { ProjectList, Project } from '../../styles/feiraperfil';

import api, { baseUrl } from '../../config/api';

import Link from 'next/link';
import { IProject } from '../../types/project';

export default function AvaliadorHistorico() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get(`/project/profile_hist/${sessionStorage.getItem('profile_id')}`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <LayoutBase title="Histórico">
      <ProjectList>
        {projects.map((project) => (
          <Project key={project._id}>
            <img src={`${baseUrl}/project/logo/${project._id}`} alt="Logo" />
            <div className="flex flex-col">
              <label>{project.title}</label>
              <span className="sub-label">{project.id_femic}</span>
            </div>
            <div className="flex flex-col">
              <label>Modalidade</label>
              <span className="sub-label">FEMIC {project.modality}</span>
            </div>
            <div className="flex flex-col">
              <Link href={`/historico/avaliador_hist/${project._id}`}>
                Ver projeto
              </Link>
            </div>
          </Project>
        ))}
      </ProjectList>
    </LayoutBase>
  );
}
