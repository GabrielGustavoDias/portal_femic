import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import LayoutBase from '../../../../styles/layout/feiraBase';

import api from '../../../../config/api';

import {
  ProjectInfo,
  Project,
  ProjectDetails,
} from '../../../../styles/home/style.module';
import { ListUsers, UserCard } from '../../../../styles/projetos/styles.module';
import { AdmContent } from '../../../../styles/admin/perfis/participante/styles.module';
import { useAlert } from 'react-alert';

const ProjetoViewAffiliate = (prop) => {
  const [team, setTeam] = useState({ team: [], advisors: [] });

  const [cred, setCred] = useState('s');

  const router = useRouter();
  const alert = useAlert();

  const [showInst, setShowInst] = useState(false);
  const [showInstPar, setShowInstPar] = useState(false);

  const { project } = prop;

  useEffect(() => {
    api.get(`/project/team/${project._id}`).then((res) => {
      setTeam(res.data);
    });
  }, []);

  const confirmCredential = (e) => {
    e.preventDefault();
    const confirm = cred == 's' ? true : false;
    api
      .patch(
        '/affiliate/credential/confirm',
        { project: project._id, confirm },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        if (confirm) {
          alert.success('Credenciamento do projeto DEFERIDO com sucesso.');
          router.back();
        } else {
          alert.show('Credenciamento do projeto INDEFERIDO com sucesso.');
          router.back();
        }
      })
      .catch((err) => {
        console.log(err);
        alert.error('Sua feira não possui credenciais o suficiente');
      });
  };

  return (
    <LayoutBase title="Projeto">
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`https://apiportal.femic.com.br/project/logo/${project._id}`}
            />
          </div>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{project.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{project.id_femic}</span>
        </div>
      </ProjectInfo>
      <ProjectDetails>
        <h1>Equipe</h1>
        <ListUsers>
          {team.team.map((part) => (
            <UserCard key={part._id}>
              <img
                src={`https://apiportal.femic.com.br/user/profile/image/${part.user_avatar}`}
                alt={part.user_name}
              />
              <h1>{part.user_name}</h1>
              <h2>{part.user_local}</h2>
            </UserCard>
          ))}
          {team.advisors?.map((adv) => (
            <UserCard key={adv._id}>
              <img
                src={`https://apiportal.femic.com.br/user/profile/image/${adv.user_avatar}`}
                alt={adv.user_name}
              />
              <h1>{adv.user_name}</h1>
              <h2>{adv.user_local}</h2>
            </UserCard>
          ))}
        </ListUsers>
        <h1>Instituição</h1>
        <div className="flex flex-1 w-full gap-10">
          <div className="details">
            <button onClick={() => setShowInst(!showInst)}>
              <label>Instituição Proponente</label>
              <FiChevronDown color="#333" size={24} />
            </button>
            {showInst && (
              <div className="details-it">
                <label>Pais</label>
                <span className="sub-label">
                  {project.instituition.country}
                </span>
                <label>Estado</label>
                <span className="sub-label">{project.instituition.state}</span>
                <label>Cidade</label>
                <span className="sub-label">{project.instituition.city}</span>
                <label>Nome</label>
                <span className="sub-label">{project.instituition.name}</span>
                <label>Categoria Administrativa</label>
                <span className="sub-label">
                  {project.instituition.adm_category}
                </span>
                <label>Telefone</label>
                <span className="sub-label">{project.instituition.number}</span>
                <label>E-mail</label>
                <span className="sub-label">{project.instituition.email}</span>
              </div>
            )}
          </div>
          {project.instituition_par && (
            <div className="details">
              <button onClick={() => setShowInst(!showInst)}>
                <label>Instituição Parceira</label>
                <FiChevronDown color="#333" size={24} />
              </button>
              {showInst && (
                <div className="details-it">
                  <label>Pais</label>
                  <span className="sub-label">
                    {project.instituition_par.country}
                  </span>
                  <label>Estado</label>
                  <span className="sub-label">
                    {project.instituition_par.state}
                  </span>
                  <label>Cidade</label>
                  <span className="sub-label">
                    {project.instituition_par.city}
                  </span>
                  <label>Nome</label>
                  <span className="sub-label">
                    {project.instituition_par.name}
                  </span>
                  <label>Categoria Administrativa</label>
                  <span className="sub-label">
                    {project.instituition_par.adm_category}
                  </span>
                  <label>Telefone</label>
                  <span className="sub-label">
                    {project.instituition_par.number}
                  </span>
                  <label>E-mail</label>
                  <span className="sub-label">
                    {project.instituition_par.email}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </ProjectDetails>
      <AdmContent style={{ marginLeft: 20 }}>
        <form className="flex flex-col">
          <label>Confirmar credenciamento</label>
          <select required onChange={(e) => setCred(e.target.value)}>
            <option value="" disabled selected>
              Selecione aqui
            </option>
            <option value="s">Sim</option>
            <option value="n">Não</option>
          </select>
          <button onClick={confirmCredential}>Salvar</button>
        </form>
      </AdmContent>
    </LayoutBase>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const projectData = await fetch(
    `https://apiportal.femic.com.br/project/getserverside/${id}`
  );
  const project = await projectData.json();

  return {
    props: {
      project: project,
    },
  };
};

export default ProjetoViewAffiliate;
