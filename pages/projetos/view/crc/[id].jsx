import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAlert } from 'react-alert';

import api, { baseUrl } from '../../../../config/api';
import {
  Project,
  ProjectDetails,
  ProjectInfoAdmin,
} from '../../../../styles/home/style.module';

import LayoutBase from '../../../../styles/layout/base';
import { ListUsers, UserCard } from '../../../../styles/projetos/styles.module';

import {
  renderModalityInstituition,
  renderAreaProject,
} from '../../../../utils/projects';
import Etica from '../../../../components/Etica';

const ProjetoView = (prop) => {
  const [team, setTeam] = useState({ team: [], advisors: [] });
  const [showInst, setShowInst] = useState(false);
  const [showInstPar, setShowInstPar] = useState(false);
  const [showDados, setShowDados] = useState(false);
  const [showEtica, setShowEtica] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [recommendation, setRecommendation] = useState('n');

  const router = useRouter();
  const alert = useAlert();

  const { project } = prop;

  useEffect(() => {
    if (project.status !== 'em-avaliacao') {
      alert.error(
        'Este projeto já foi avaliado ou não está apto para entrar em avaliação CRC'
      );
      router.back();
    }
    api.get(`/project/team/${project._id}`).then((res) => {
      setTeam(res.data);
    });
  }, []);

  const authorize = () => {
    api
      .patch(
        `/profiles/crc/recommendation`,
        {
          crc_id: sessionStorage.getItem('profile_id'),
          crc_name: sessionStorage.getItem('name'),
          recommendation: recommendation,
          project: project._id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        alert.show(
          `Projeto ${
            recommendation == 's' ? 'recomendado' : 'não recomendado'
          } com sucesso`
        );
        router.back();
      })
      .catch((err) => {
        alert.error(
          'Ocorreu um erro ao salvar o projeto, faça login novamente'
        );
        router.push('/login');
      });
  };

  return (
    <LayoutBase title="Projeto">
      <ProjectInfoAdmin>
        <Project>
          <div className="head">
            <img src={`${baseUrl}/project/logo/${project._id}`} />
          </div>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{project.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{project.id_femic}</span>
        </div>
        <div className="auth">
          <span>Análise do CRC</span>
          <select onChange={(e) => setRecommendation(e.target.value)}>
            <option value="s">Recomendar</option>
            <option value="n" selected>
              Não recomendar
            </option>
          </select>
          <button onClick={authorize}>Enviar</button>
        </div>
      </ProjectInfoAdmin>
      <ProjectDetails>
        <h1>Equipe</h1>
        <ListUsers>
          {team.team.map((part) => (
            <UserCard key={part._id}>
              <img
                src={`${baseUrl}/user/profile/image/${part.user_avatar}`}
                alt={part.user_name}
              />
              <h1>{part.user_name}</h1>
              <h2>{part.user_local}</h2>
            </UserCard>
          ))}
          {team.advisors?.map((adv) => (
            <UserCard key={adv._id}>
              <img
                src={`${baseUrl}/user/profile/image/${adv.user_avatar}`}
                alt={adv.user_name}
              />
              <h1>{adv.user_name}</h1>
              <h2>{adv.user_local}</h2>
            </UserCard>
          ))}
        </ListUsers>
        <h1>Instituição</h1>
        <div className="flex flex-1 w-full">
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
                    {renderModalityInstituition(
                      project.instituition_par.adm_category
                    )}
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
        <div className="flex flex-1 w-full">
          <div className="details">
            <button onClick={() => setShowDados(!showDados)}>
              <label>Dados do projeto</label>
              <FiChevronDown color="#333" size={24} />
            </button>
            {showDados && (
              <div className="details-it">
                <label>Categoria</label>
                <span className="sub-label">{project.category}</span>
                <label>Área científica</label>
                <span className="sub-label">
                  {renderAreaProject(project.area)}
                </span>
                <label>Resumo científico</label>
                <span className="sub-label">{project.resume}</span>
                <label>Palavras-chave</label>
                {project.keywords.map((key) => (
                  <span className="sub-label" key={key}>
                    {key}
                  </span>
                ))}
                <label>Objetivo geral do projeto.</label>
                <span className="sub-label">{project.general_objective}</span>

                <label>Objetivos específicos do projeto.</label>
                <span className="sub-label">
                  {project.especific_objectives}
                </span>

                <label>O projeto é continuidade de ano(s) anterior(es)?</label>
                <span className="sub-label">
                  {project.continuation ? 'Sim' : 'não'}
                </span>

                {project.continuation && (
                  <>
                    <label>
                      Informe os principais resultados alcançados nos últimos 12
                      meses.
                    </label>
                    <span className="sub-label">{project.results}</span>
                  </>
                )}

                <label>
                  O projeto possui credencial de alguma Feira Afiliada à FEMIC?
                </label>
                <span className="sub-label">
                  {project.isAccredited ? 'Sim' : 'não'}
                </span>
                {project.isAccredited && (
                  <>
                    <label>Feira Afiliada.</label>
                    <span className="sub-label">{project.affiliate}</span>
                  </>
                )}
                <label>Canais de divulgação científica do projeto</label>
                {project.insta ? (
                  <a href={project.insta}>Instagram: {project.insta}</a>
                ) : (
                  <span className="sub-label">Instagram: Não informado</span>
                )}
                {project.fanpage ? (
                  <a href={project.fanpage}>Fanpage: {project.fanpage}</a>
                ) : (
                  <span className="sub-label">Fanpage: Não informada</span>
                )}
                {project.website ? (
                  <a href={project.website}>Website: {project.website}</a>
                ) : (
                  <span className="sub-label">Website: Não informado</span>
                )}
                {project.youtube ? (
                  <a href={project.youtube}>YouTube: {project.youtube}</a>
                ) : (
                  <span className="sub-label">YouTube: Não informado</span>
                )}
                {project.others_links ? (
                  <a href={project.others_links}>
                    Outro: {project.others_links}
                  </a>
                ) : (
                  <span className="sub-label">Outro: Não informado</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 w-full">
          <div className="details">
            <button onClick={() => setShowEtica(!showEtica)}>
              <label>Ética e Segurança</label>
              <FiChevronDown color="#333" size={24} />
            </button>
            {showEtica && (
              <div className="details-it">
                <Etica project={project} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 w-full">
          <div className="details">
            <button onClick={() => setShowFinal(!showFinal)}>
              <label>Finalização</label>
              <FiChevronDown color="#333" size={24} />
            </button>
            {showFinal && (
              <div className="details-it">
                <label>Informações adicionais</label>
                <span className="sub-label">{project.aditional_info}</span>
                <label className="mb-2">
                  <input type="checkbox" disabled checked />
                  <span className="sub-label ml-2">
                    Declaramos que o trabalho submetido para participação na
                    FEMIC (Feira Mineira de Iniciação Científica) é original, de
                    única e exclusiva autoria das pessoas informadas como
                    membros(as) da equipe e não se trata de cópia integral ou
                    parcial de textos e trabalhos de autoria de outrem, seja em
                    formato de papel, eletrônico, digital, audiovisual ou
                    qualquer outro meio.
                  </span>
                </label>
                <label className="mb-2">
                  <input type="checkbox" disabled checked />
                  <span className="sub-label ml-2">
                    Declaramos ter total conhecimento e compreensão do que é
                    considerado plágio, não apenas a cópia integral do trabalho,
                    mas também de parte dele, inclusive de artigos e/ou
                    parágrafos, sem citação do autor ou de sua fonte.{' '}
                  </span>
                </label>
                <label className="mb-2">
                  <input type="checkbox" disabled checked />
                  <span className="sub-label ml-2">
                    Declaramos ter ciência e estar de acordo com as Regras e
                    Políticas de Privacidade da FEMIC, disponível no site{' '}
                    <a
                      href="https://femic.com.br/politica-de-privacidade/"
                      target="_blank"
                      rel="noreferrer">
                      https://femic.com.br/politica-de-privacidade/.
                    </a>{' '}
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </ProjectDetails>
    </LayoutBase>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const projectData = await fetch(`${baseUrl}/project/getserverside/${id}`);
  const project = await projectData.json();

  return {
    props: {
      project: project,
    },
  };
};

export default ProjetoView;
