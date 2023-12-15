import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import api, { baseUrl } from '../../../config/api';
import {
  Project,
  ProjectDetails,
  ProjectInfo,
} from '../../../styles/home/style.module';

import LayoutBase from '../../../styles/layout/base';
import { ListUsers, UserCard } from '../../../styles/projetos/styles.module';

import {
  renderModalityInstituition,
  renderAreaProject,
} from '../../../utils/projects';

import AvaliationView from '../../../components/AvaliationView';

const ProjetoView = (prop) => {
  const [team, setTeam] = useState({ team: [], advisors: [] });
  const [showInst, setShowInst] = useState(false);
  const [showInstPar, setShowInstPar] = useState(false);
  const [showDados, setShowDados] = useState(false);
  const [showEtica, setShowEtica] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showAvaliation, setShowAvaliation] = useState(false);

  const { project } = prop;

  useEffect(() => {
    api.get(`/project/team/${project._id}`).then((res) => {
      setTeam(res.data);
    });
  }, []);

  return (
    <LayoutBase title="Projeto">
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${project._id}`}
              alt="logo do projeto"
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
            {showInst && project.instituition && (
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
            {showDados && project.category && (
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
            {showEtica && project.etica && (
              <div className="details-it">
                <label>Tipo de estudo</label>
                <span className="sub-label">{project.etica.study_type}</span>
                <label>Seres humanos</label>
                <span className="sub-label">
                  {project.etica.involve_human.check == 's' ? 'Sim' : 'Não'}
                </span>
                {project.etica.involve_human.check == 's' && (
                  <div className="ml-4 flex flex-col">
                    <span className="sub-label">
                      Seu projeto pode ser considerado uma pesquisa de opinião,
                      na qual dados pessoais dos participantes (Ex: nome, idade,
                      endereço, posses ou qualquer dado que identifique a
                      pessoa) não são coletados e/ou divulgados:{' '}
                      {project.etica.involve_human['01'] == 's' ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      2. Os participantes foram esclarecidos sobre a pesquisa e
                      registraram sua concordância de participação através de um
                      documento impresso ou virtual (Ex: Termo de Consentimento
                      Livre e Esclarecido - TCLE; Termo de Assentimento - TA):{' '}
                      {project.etica.involve_human['02'] == 's' ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Os participantes responderam algum
                      questionário/formulário:{' '}
                      {project.etica.involve_human['03'] == 's' ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      A pesquisa envolveu entrevistas gravadas seja apenas áudio
                      (podcast) ou áudio e vídeo (vodcast):{' '}
                      {project.etica.involve_human['04'] == 's' ? 'Sim' : 'Não'}
                    </span>
                    <div className="ml-4 flex flex-col">
                      <span className="sub-label">
                        Teste de produtos ou conceitos desenvolvidos pelos
                        pesquisadores que não constituam riscos aos
                        participantes por não haver a experimentação por
                        ingestão ou uso tópico:
                        {project.etica.involve_human['05'].box1 ? 'Sim' : 'Não'}
                      </span>
                      <span className="sub-label">
                        Teste de produtos ou conceitos desenvolvidos pelos
                        pesquisadores que não constituam riscos aos
                        participantes por não haver a análise de comportamento
                        humano em grupos considerados vulneráveis:{' '}
                        {project.etica.involve_human['05'].box2 ? 'Sim' : 'Não'}
                      </span>

                      <span className="sub-label">
                        Estudo de estatísticas de acesso público em bancos de
                        dados (ex. estatísticas de jogos, índice de crimes,
                        etc.) desde que não requeira interação com as pessoas
                        das quais os dados foram coletados:{' '}
                        {project.etica.involve_human['05'].box3 ? 'Sim' : 'Não'}
                      </span>

                      <span className="sub-label">
                        Estudos de análise de comportamento em espaços públicos,
                        desde que os pesquisadores não interajam com os
                        indivíduos estudados, não manipulem o ambiente e não
                        registrem informações que os identifiquem:{' '}
                        {project.etica.involve_human['05'].box4 ? 'Sim' : 'Não'}
                      </span>

                      <span className="sub-label">
                        Coleta de material biológico (Ex: sangue, urina, fezes,
                        raspado jugal, cabelo, unha, outros):{' '}
                        {project.etica.involve_human['05'].box5 ? 'Sim' : 'Não'}
                      </span>

                      <span className="sub-label">
                        Experimentação de produtos do projeto, por ingestão ou
                        uso tópico (Ex: produtos alimentícios de origem animal
                        ou vegetal, creme, shampoo, outros):{' '}
                        {project.etica.involve_human['05'].box6 ? 'Sim' : 'Não'}
                      </span>

                      <span className="sub-label">
                        {' '}
                        Análise de comportamento humano em grupos considerados
                        vulneráveis, independente de ser uma condição física,
                        psicológica ou social, utilizando metodologia presencial
                        ou virtual:{' '}
                        {project.etica.involve_human['05'].box7 ? 'Sim' : 'Não'}
                      </span>
                      {(project.etica.involve_human['05'].box7 ||
                        project.etica.involve_human['05'].box6 ||
                        project.etica.involve_human['05'].box5) && (
                        <span className="sub-label">
                          CAAE: {project.etica.involve_human['05'].caae}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <label>Animais Vertebrados</label>
                <span className="sub-label">
                  {project.etica.involve_animals.check == 's' ? 'Sim' : 'Não'}
                </span>
                {project.etica.involve_animals.check == 's' && (
                  <div className="ml-4 flex flex-col">
                    <span className="sub-label">
                      PARECER CONSUBSTANCIADO do Comitê de Ética em Pesquisa
                      (CEP): {project.etica.involve_animals.parecer}
                    </span>
                  </div>
                )}
                <label>Agentes biológicos</label>
                <span className="sub-label">
                  {project.etica.involve_agbio.check == 's' ? 'Sim' : 'Não'}
                </span>
                {project.etica.involve_agbio.check == 's' && (
                  <div className="ml-4 flex flex-col">
                    <label>sua pesquisa envolve.</label>
                    <span className="sub-label">
                      Tecido vegetal:{' '}
                      {project.etica.involve_agbio.box1 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Cultura de células não patogênicas ou tecidos:{' '}
                      {project.etica.involve_agbio.box2 ? 'Sim' : 'Não'}
                    </span>
                    {project.etica.involve_agbio.box2 && (
                      <span className="sub-label ml-4">
                        celulas: {project.etica.involve_agbio._cel}
                      </span>
                    )}
                    <span className="sub-label">
                      Partes de órgãos animais obtidos em restaurantes, açougues
                      ou comércios afins:{' '}
                      {project.etica.involve_agbio.box3 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Leites: {project.etica.involve_agbio.box4 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Cabelos:{' '}
                      {project.etica.involve_agbio.box5 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Presas ou dentes esterilizados obtidos naturalmente:{' '}
                      {project.etica.involve_agbio.box6 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Tecidos fossilizados ou amostras arqueológicas:{' '}
                      {project.etica.involve_agbio.box7 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Cultura de microrganismos patogênico:{' '}
                      {project.etica.involve_agbio.box8 ? 'Sim' : 'Não'}
                    </span>
                    {project.etica.involve_agbio.box8 && (
                      <div className="ml-4 flex flex-col">
                        <span className="sub-label">
                          Parceria com Instituto de Pesquisa:{' '}
                          {project.etica.involve_agbio.insti}
                        </span>
                        <span className="sub-label">
                          Nome do(a) profissional responsável pela orientação da
                          pesquisa: {project.etica.involve_agbio.prof_name}
                        </span>
                      </div>
                    )}
                    <span className="sub-label">
                      Partes de órgãos ou fluidos frescos cuja necropsia seja
                      realizada para a pesquisa:{' '}
                      {project.etica.involve_agbio.box9 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Tecnologias de recombinação gênica em que os
                      microrganismos sofrem modificações genéticas:{' '}
                      {project.etica.involve_agbio.box10 ? 'Sim' : 'Não'}
                    </span>
                    {(project.etica.involve_agbio.box9 ||
                      project.etica.involve_agbio.box10) && (
                      <span className="sub-label ml-4">
                        CAAE: {project.etica.involve_agbio.caae}
                      </span>
                    )}
                  </div>
                )}
                <label>Substâncias químicas</label>
                <span className="sub-label">
                  {project.etica.involve_quimic.check == 's' ? 'Sim' : 'Não'}
                </span>
                {project.etica.involve_quimic.check == 's' && (
                  <div className="flex flex-col ml-4">
                    <span className="sub-label">
                      Substâncias químicas que não requerem permissão
                      federal/estadual:{' '}
                      {project.etica.involve_quimic.box1 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Substâncias químicas que requerem permissão
                      federal/estadual:{' '}
                      {project.etica.involve_quimic.box2 ? 'Sim' : 'Não'}
                    </span>
                    <span className="sub-label">
                      Substância(s) foi(ram) utilizada(as) no projeto: <br />
                      {project.etica.involve_quimic.subs}
                    </span>
                    <span className="sub-label">
                      Como foi(ram) utilizada(as) a(s) substância(s) no projeto.
                      Informe, ainda, os equipamentos de segurança utilizados,
                      caso se aplique: <br />
                      {project.etica.involve_quimic.ult_subs}
                    </span>
                    <span className="sub-label">
                      Como foi descartada a substância química ou seus rejeitos:{' '}
                      <br /> Acondicionamento em recipiente fechado e transporte
                      para local adequado para descarte.
                    </span>
                  </div>
                )}
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
            {showFinal && project && (
              <div className="details-it">
                <label>Informações adicionais</label>
                <span className="sub-label">{project.aditional_info}</span>
                <label className="mb-2">
                  <input
                    type="checkbox"
                    disabled
                    checked={project.status !== 'desistente'}
                  />
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
                  <input
                    type="checkbox"
                    disabled
                    checked={project.status !== 'desistente'}
                  />
                  <span className="sub-label ml-2">
                    Declaramos ter total conhecimento e compreensão do que é
                    considerado plágio, não apenas a cópia integral do trabalho,
                    mas também de parte dele, inclusive de artigos e/ou
                    parágrafos, sem citação do autor ou de sua fonte.{' '}
                  </span>
                </label>
                <label className="mb-2">
                  <input
                    type="checkbox"
                    disabled
                    checked={project.status !== 'desistente'}
                  />
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
        {project?.avaliacao.total > 0 && project?.status == 'concluido' && (
          <div className="flex flex-1 w-full">
            <div className="details">
              <button onClick={() => setShowAvaliation(!showAvaliation)}>
                <label>Avaliação</label>
                <FiChevronDown color="#333" size={24} />
              </button>
              {showAvaliation && project && (
                <AvaliationView project={project} />
              )}
            </div>
          </div>
        )}
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
