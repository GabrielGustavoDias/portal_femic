import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import LayoutBase from '../../styles/layout/feiraBase';
import { ProjectList, Project } from '../../styles/feiraperfil';

import api from '../../config/api';
import { FormQuery } from '../../styles/admin/styles.module';

export default function FeiraHistorico() {
  const [projects, setProjects] = useState([]);
  const [year, setYear] = useState(2022);
  const [state, setState] = useState('');
  const [modality, setModality] = useState('');
  const [stateAux, setStateAux] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (router.asPath.split('/')[2] !== sessionStorage.getItem('page')) {
      router.push('/');
      alert('algo de errado');
    }
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
      <FormQuery onSubmit={submitQuery}>
        <div className="flex flex-col">
          <label>Ano</label>
          <input
            className="input"
            type="number"
            defaultValue={new Date().getFullYear()}
            onChange={(e) => setYear(e.target.value)}
            min={2022}
          />
        </div>
        <div className="flex flex-col">
          <label>Status do projeto</label>
          <select className="input" onChange={(e) => setState(e.target.value)}>
            <option value="deferido">Deferido</option>
            <option value="indeferido">Indeferido</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Modalidade</label>
          <select
            className="input"
            onChange={(e) => setModality(e.target.value)}>
            <option value="junior">Femic Junior</option>
            <option value="jovem">Femic Jovem</option>
            <option value="mais">Femic Mais</option>
          </select>
        </div>
        <button type="submit">Pesquisar</button>
      </FormQuery>
      <ProjectList>
        {projects.length > 0 &&
          projects.map((pro) => {
            // Verifique se o status do projeto é igual a "desistente"
            if (pro.status !== 'desistente') {
              return (
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
                    <span className="sub-label">{stateAux}</span>
                  </div>
                </Project>
              );
            }
          })}
      </ProjectList>
    </LayoutBase>
  );
}
