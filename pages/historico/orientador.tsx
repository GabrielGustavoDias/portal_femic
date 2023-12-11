import LayoutBase from '../../styles/layout/base';

import { useEffect, useState } from 'react';
import { ProjectList, Project } from '../../styles/feiraperfil';

import api, { baseUrl } from '../../config/api';

import Link from 'next/link';
import { IProject } from '../../types/project';

export default function HistoricoOrientador() {
  const [projects, setProjects] = useState<any | []>([]);

  useEffect(() => {
    api
      .get('/user/historico', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const renderHistoric = (year: string) => {
    if (!projects) {
      return 'sem histórico para mostrar';
    }

    const projetos_ano = projects.filter(
      (hists: any) => String(hists.year) == year
    );

    if (!projetos_ano) {
      return 'sem projetos no histórico';
    }
    return (
      <div className="flex flex-col gap-3">
        {projetos_ano
          .map((hist: any) => hist.projects)[0]
          .map((hist_name: any) => (
            <div key={hist_name._id} className="flex flex-col gap-3">
              <span className="bg-slate-500 text-white px-3 py-2 rounded w-fit">
                {hist_name.value}
              </span>
              {hist_name.projetos.length <= 0 && (
                <span>Sem projetos no ano de {year}</span>
              )}
              {hist_name.projetos.map((project: IProject) => (
                <Project key={project._id}>
                  <img src={`${baseUrl}/project/logo/${project._id}`} />
                  <div className="flex flex-col">
                    <label>{project.title}</label>
                    <span className="sub-label">{project.id_femic}</span>
                  </div>
                  <div className="flex flex-col">
                    <label>Modalidade</label>
                    <span className="sub-label">FEMIC {project.modality}</span>
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/projetos/view/${project._id}`}>
                      Ver projeto
                    </Link>
                  </div>
                </Project>
              ))}
            </div>
          ))}
      </div>
    );
  };
  return (
    <LayoutBase title="Histórico">
      <ProjectList>
        {projects &&
          projects?.map((hist: any) => (
            <div className="flex gap-2 flex-col" key={hist._id}>
              <span className="text-xl text-slate-700 text-center">
                {hist.year}
              </span>
              {renderHistoric(hist.year)}
            </div>
          ))}
      </ProjectList>
    </LayoutBase>
  );
}
