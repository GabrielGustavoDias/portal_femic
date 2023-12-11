import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState, Key } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useAlert } from 'react-alert';
import { Checkbox, Tooltip } from '@nextui-org/react';

import api, { baseUrl } from '../../../config/api';

import CardPeople from '../../../components/CardPeople';
import Etica from '../../../components/Etica';
import ProjectConfirmacao from '../../../components/ProjectConfirmacao';

import { IUser } from '../../../types/user';
import { IEvaluation, IEvaluation2 } from '../../../types/project';

import { convertSexToString, renderModality } from '../../../utils/user';
import {
  renderModalityInstituition,
  renderAreaProject,
  modalityList,
} from '../../../utils/projects';

import {
  FormQuery,
  WelcomeHeader,
  UserContainer,
} from '../../../styles/admin/styles.module';
import {
  Project,
  ProjectDetails,
  ProjectInfo,
} from '../../../styles/home/style.module';
import { AdmContent } from '../../../styles/admin/perfis/participante/styles.module';
import AdminLayout from '../../../styles/layout/admin';
import { ListUsers, Table } from '../../../styles/projetos/styles.module';

const columns = [
  {
    key: 'name',
    label: 'Avaliadores',
    value: 'Nome dos avaliadores',
  },
  {
    key: 'nota1',
    label: 'Criatividade',
    value: 'Criatividade e Inovação',
  },
  {
    key: 'nota2',
    label: 'Pesquisa',
    value: 'Profundidade da pesquisa',
  },
  {
    key: 'nota3',
    label: 'Clareza',
    value: 'Clareza e objetivo',
  },
  {
    key: 'nota4',
    label: 'Metodologia',
    value: 'Uso da metodologia científica',
  },
  {
    key: 'nota5',
    label: 'Aplicabilidade',
    value: 'Aplicabilidade dos resultados no cotidiano da sociedade',
  },
  {
    key: 'nota6',
    label: 'Relevância',
    value: 'Temática com relevância social',
  },
  {
    key: 'total',
    label: 'Total',
    value: 'Nota total dada pelo avaliador',
  },
];

const columns2 = [
  {
    key: 'name',
    label: 'Avaliadores',
    value: 'Nome dos avaliadores',
  },
  {
    key: 'nota1',
    label: 'Criatividade',
    value: 'Criatividade e Inovação',
  },
  {
    key: 'nota2',
    label: 'Pesquisa',
    value: 'Profundidade da pesquisa',
  },
  {
    key: 'nota3',
    label: 'Resumo',
    value: 'Relatório e Resumo científico',
  },
  {
    key: 'nota4',
    label: 'Pôster',
    value: 'Pôster científico',
  },
  {
    key: 'nota5',
    label: 'Clareza',
    value: 'Clareza e objetividade na exposição do projeto',
  },
  {
    key: 'nota6',
    label: 'Metodologia',
    value: 'Uso da metodologia científica',
  },
  {
    key: 'nota7',
    label: 'Aplicabilidade',
    value: 'Aplicabilidade dos resultados no cotidiano da sociedade',
  },
  {
    key: 'nota8',
    label: 'Empolgação',
    value:
      'Empolgação e comprometimento dos alunos no momento de apresentação do projeto',
  },
  {
    key: 'total',
    label: 'Total',
    value: 'Nota total dada pelo avaliador',
  },
];

const ProjetoAdminView: NextPage = (prop: any) => {
  const [team, setTeam] = useState({ team: [], advisors: [] });
  const [avaliadores, setAvaliadores] = useState<[] | any[]>([]);
  const [commissionPre, setCommissionPre] = useState<[] | IUser[]>([]);
  const [preAval, setPreAval] = useState<[] | IEvaluation[]>([
    {
      avaliador: '123',
      avaliador_nome: 'Sem avaliação',
      nota1: 0,
      nota2: 0,
      nota3: 0,
      nota4: 0,
      nota5: 0,
      nota6: true,
      somatorio: 0,
    },
  ]);
  const [commissionFinal, setCommissionFinal] = useState<[] | IUser[]>([]);
  const [finalAval, setFinalAval] = useState<[] | IEvaluation2[]>([
    {
      avaliador: '123',
      avaliador_nome: 'Sem avaliação',
      nota1: 0,
      nota2: 0,
      nota3: 0,
      nota4: 0,
      nota5: 0,
      nota6: 0,
      nota7: 0,
      nota8: 0,
      somatorio: 0,
    },
  ]);
  const { project, commission } = prop;

  const [showInst, setShowInst] = useState(false);
  const [showDados, setShowDados] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [edit, setEdit] = useState('s');
  const [hidden, setHidden] = useState('n');
  const [abandonado, setAbandonado] = useState('n');

  const [disabled, setDisabled] = useState(false);

  const alert = useAlert();

  const [escolaridade, setEscolaridade] = useState(project.modality);

  useEffect(() => {
    api.get(`/project/team/${project._id}`).then((res) => {
      setTeam(res.data);
    });
    if ('recomendado,'.includes(project.status)) {
      setCommissionPre(commission.commissionPre);
      if (project.pre_avaliacao?.avaliadores) {
        api
          .get(`${baseUrl}/project/commission/pre/${project._id}`)
          .then((res) => {
            setCommissionPre(res.data);
          });
        setPreAval(project.pre_avaliacao.barema);
      }
    } else if ('finalista,confirmado,concluido'.includes(project.status)) {
      setCommissionPre(commission.commissionPre.final);
      setCommissionFinal(commission.commissionFinal.final);
      //if (project.pre_avaliacao?.avaliadores) {
      //	api.get(`${baseUrl}/project/commission/pre/${project._id}`).then((res) => {
      //		setCommissionPre(res.data);
      //	});
      //	api.get(`${baseUrl}/project/commission/final/${project._id}`).then((res) => {
      //		setCommissionFinal(res.data);
      //	});
      setPreAval(project.pre_avaliacao.barema);
      setFinalAval(project.avaliacao.barema);
      //}
    }
  }, []);

  const mudarEscolaridade = () => {
    setDisabled(true);
    api
      .patch(`admin/projects/update/${project._id}`, {
        category: escolaridade,
      })
      .then((res) => {
        alert.success('Status mudado para ' + escolaridade);
        setDisabled(false);
      })
      .catch((err) => {
        alert.error('Ocorreu um erro ao alterar');
        setDisabled(false);
      });
  };

  const editProject = () => {
    setDisabled(true);
    api
      .patch(`admin/projects/update/${project._id}`, {
        finalized: edit !== 's',
        status: edit == 's' ? 'edit' : 'em-avaliacao',
      })
      .then((res) => {
        if (edit == 's') {
          alert.success('Projeto está editável');
        } else {
          alert.show('Projeto não está mais editável');
        }
        setDisabled(false);
      })
      .catch((err) => {
        alert.error('Ocorreu um erro ao alterar');
        setDisabled(false);
      });
  };

  const changeStatus = (e: any) => {
    e.preventDefault();
    if (project.status == e.target[0].value) {
      alert.info(`Este projeto já esta ${e.target[0].value}`);
      return;
    }
    api
      .patch(`admin/project/change_status`, {
        id: project._id,
        status: e.target[0].value,
      })
      .then((res) => {
        alert.success('Status alterado com sucesso');
      })
      .catch((err) => {
        alert.error('erro ao alterar o status');
      });
  };

  const hiddenProject = () => {
    setDisabled(true);
    api
      .patch(`admin/projects/update/${project._id}`, { hidden: hidden == 's' })
      .then((res) => {
        if (edit == 's') {
          alert.success('Projeto está oculto');
        } else {
          alert.show('Projeto está visível');
        }
        setDisabled(false);
      })
      .catch((err) => {
        alert.error('Ocorreu um erro ao alterar');
        setDisabled(false);
      });
  };

  const editFinalizedProject = (e: any) => {
    api
      .patch(`admin/projects/update/${project._id}`, { finalized: e == false })
      .then((res) => {
        if (e) {
          alert.success('Finalização está editável');
        } else {
          alert.show('Finalização não está mais editável');
        }
        setDisabled(false);
      })
      .catch((err) => {
        alert.error('Ocorreu um erro ao alterar');
        setDisabled(false);
      });
  };

  const abandonedProject = () => {
    setDisabled(true);
    api
      .patch(`admin/projects/update/${project._id}`, {
        hidden: abandonado == 's',
        finalized: abandonado == 's',
        status: abandonado == 's' ? 'desistente' : 'rascunho',
      })
      .then(() => {
        if (abandonado == 's') {
          alert.success('Projeto está abandonado');
        } else {
          alert.info('Projeto está para edição');
        }
        setDisabled(false);
      })
      .catch(() => {
        alert.error('Ocorreu um erro ao alterar');
        setDisabled(false);
      });
  };

  const searchAvaliadores = (e: any, model: string) => {
    e.preventDefault();
    api
      .patch(`/admin/users/find`, {
        method: 'avaliador',
        formation: e.target[0].value,
        school: e.target[1].value,
        lang: e.target[2].value,
      })
      .then((res) => {
        setAvaliadores(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const searchAvaliadoresByName = (e: any) => {
    e.preventDefault();
    api
      .patch(`/admin/users/find`, {
        method: 'nome_avaliador',
        name: e.target[0].value,
      })
      .then((res) => {
        setAvaliadores(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const addAvaliador = (user: IUser, model: string) => {
    const data = model == 'pre' ? [...commissionPre] : [...commissionFinal];
    if (data.length >= 5) {
      alert.error('no máximo 5 avaliadores');
      return;
    }

    if (data.map((pre: any) => pre.user_avatar).includes(user.avatar_url)) {
      alert.show('O avaliador ja foi adicionado');
      return;
    }

    const part_id = user.profiles.filter((item) => item.name == 'avaliador');
    api
      .patch(
        `/project/add/${model == 'pre' ? 'pre_avaliacao' : 'final_avaliacao'}`,
        {
          project_id: project._id,
          participant_id: part_id[0].id,
        }
      )
      .then((res) => {
        data.push(res.data);
        if (model == 'pre') {
          setCommissionPre(data);
        } else {
          setCommissionFinal(data);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const removeAvaliador = (user: IUser, model: string) => {
    const data = model == 'pre' ? [...commissionPre] : [...commissionFinal];
    const index = data.map((item) => item._id).indexOf(user._id);
    data.splice(index, 1);
    api
      .patch(
        `/project/remove/${
          model == 'pre' ? 'pre_avaliacao' : 'final_avaliacao'
        }`,
        {
          project_id: project._id,
          participant_id: user._id,
        }
      )
      .then((res) => {
        console.log(res.data);
      });

    if (model == 'pre') {
      setCommissionPre(data);
    } else {
      setCommissionFinal(data);
    }
  };

  const renderRow = (model?: string) => {
    if (model == 'final') {
      const baremasFinal = project.avaliacao.barema;
      return baremasFinal.map((item: IEvaluation2) => (
        <tr key={item.avaliador}>
          <td className="!text-left">{item.avaliador_nome}</td>
          <td className="text-orange-700">{item.nota1}</td>
          <td className="text-orange-700">{item.nota2}</td>
          <td className="text-orange-700">{item.nota3}</td>
          <td className="text-orange-700">{item.nota4}</td>
          <td className="text-orange-700">{item.nota5}</td>
          <td className="text-orange-700">{item.nota6}</td>
          <td className="text-orange-700">{item.nota7}</td>
          <td className="text-orange-700">{item.nota8}</td>
          <td className="text-orange-500">{item.somatorio}</td>
        </tr>
      ));
    }
    return project.pre_avaliacao.barema.map((item: IEvaluation) => (
      <tr key={item.avaliador}>
        <td className="!text-left">{item.avaliador_nome}</td>
        <td className="text-orange-700">{item.nota1}</td>
        <td className="text-orange-700">{item.nota2}</td>
        <td className="text-orange-700">{item.nota3}</td>
        <td className="text-orange-700">{item.nota4}</td>
        <td className="text-orange-700">{item.nota5}</td>
        <td className="text-orange-700">{item.nota6 ? 10 : 0}</td>
        <td className="text-orange-500">{item.somatorio}</td>
      </tr>
    ));
  };

  const renderMedias = (model: string) => {
    const data =
      model == 'pre' ? project.pre_avaliacao.barema : project.avaliacao.barema;
    const quant = data.length;
    let media6 = 0;

    if (data.length > 0 && model == 'pre') {
      data.forEach((item: IEvaluation) => {
        if (item.nota6) {
          media6 += 10;
        }
      });

      return (
        <tr>
          <td>Medias:</td>
          <td>
            {data
              .map((item: IEvaluation) => item.nota1)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: IEvaluation) => item.nota2)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: IEvaluation) => item.nota3)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: IEvaluation) => item.nota4)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: IEvaluation) => item.nota5)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>{media6 / quant}</td>
          <td className="text-orange-100 underline">
            {data
              .map((item: IEvaluation) => item.somatorio)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
        </tr>
      );
    } else if (data.length > 0 && model == 'final') {
      return (
        <tr>
          <td>Medias:</td>
          <td>
            {data
              .map((item: any) => item.nota1)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: any) => item.nota2)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: any) => item.nota3)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: any) => item.nota4)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: any) => item.nota5)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: any) => item.nota6)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: any) => item.nota7)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td>
            {data
              .map((item: any) => item.nota8)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
          <td className="text-orange-100 underline">
            {data
              .map((item: IEvaluation) => item.somatorio)
              .reduce((soma: number, i: number) => soma + i) / quant}
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <AdminLayout>
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${project._id}`}
              alt="Project logo"
            />
          </div>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{project.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{project.id_femic}</span>
          <div className="flex  align-top justify-between">
            <div className="flex flex-col">
              <label>Status</label>
              <span>{project.status}</span>
            </div>
            <form onSubmit={changeStatus} className="flex flex-col mr-5">
              <label htmlFor="">Status do projeto</label>
              <select className="bg-gray-700 text-white h-10 ">
                <option value="" disabled selected>
                  Selecione aqui
                </option>
                <option value="recomendado">Recomendado</option>
                <option value="desistente">Desistente</option>
                <option value="reprovado">Reprovado</option>
                <option value="finalista">Finalista</option>
                <option value="confirmado">Confirmado</option>
                <option value="concluido">Concluido</option>
              </select>
              <button
                type="submit"
                style={{ backgroundColor: '#1B7824', margin: 0 }}
                disabled={disabled}>
                Salvar
              </button>
            </form>
          </div>
        </div>
      </ProjectInfo>
      <ProjectDetails>
        <Tabs
          className="tabs"
          disabledTabClassName="disabled-tab"
          selectedTabClassName="abled-tab">
          <TabList className="tab-label">
            <Tab className="tab">Dados do projeto</Tab>
            <Tab className="tab">Ética e segurança</Tab>
            <Tab className="tab">Pré-avaliação</Tab>
            <Tab className="tab">Confirmação</Tab>
            <Tab className="tab">Avaliação</Tab>
            <Tab className="tab">Classificação</Tab>
          </TabList>
          <TabPanel>
            <h1>Equipe</h1>
            <ListUsers>
              {team.team.map((part: any) => (
                <CardPeople key={part._id} integrante={part} />
              ))}
              {team.advisors?.map((adv: any) => (
                <CardPeople key={adv._id} integrante={adv} />
              ))}
            </ListUsers>
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
                      {project?.instituition?.country}
                    </span>
                    <label>Estado</label>
                    <span className="sub-label">
                      {project?.instituition?.state}
                    </span>
                    <label>Cidade</label>
                    <span className="sub-label">
                      {project?.instituition?.city}
                    </span>
                    <label>Nome</label>
                    <span className="sub-label">
                      {project?.instituition?.name}
                    </span>
                    <label>Categoria Administrativa</label>
                    <span className="sub-label">
                      {project?.instituition?.adm_category}
                    </span>
                    <label>Telefone</label>
                    <span className="sub-label">
                      {project?.instituition?.number}
                    </span>
                    <label>E-mail</label>
                    <span className="sub-label">
                      {project?.instituition?.email}
                    </span>
                  </div>
                )}
              </div>
              {project?.insituition_par && (
                <div className="details">
                  <button onClick={() => setShowInst(!showInst)}>
                    <label>Instituição Parceira</label>
                    <FiChevronDown color="#333" size={24} />
                  </button>
                  {showInst && (
                    <div className="details-it">
                      <label>Pais</label>
                      <span className="sub-label">
                        {project?.insituition_par?.country}
                      </span>
                      <label>Estado</label>
                      <span className="sub-label">
                        {project?.insituition_par?.state}
                      </span>
                      <label>Cidade</label>
                      <span className="sub-label">
                        {project?.insituition_par?.city}
                      </span>
                      <label>Nome</label>
                      <span className="sub-label">
                        {project?.insituition_par?.name}
                      </span>
                      <label>Categoria Administrativa</label>
                      <span className="sub-label">
                        {renderModalityInstituition(
                          project?.insituition_par?.adm_category
                        )}
                      </span>
                      <label>Telefone</label>
                      <span className="sub-label">
                        {project?.insituition_par?.number}
                      </span>
                      <label>E-mail</label>
                      <span className="sub-label">
                        {project?.insituition_par?.email}
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
                    {project.keywords.map((key: string) => (
                      <span className="sub-label" key={key}>
                        {key}
                      </span>
                    ))}
                    <label>Objetivo geral do projeto.</label>
                    <span className="sub-label">
                      {project?.general_objective}
                    </span>

                    <label>Objetivos específicos do projeto.</label>
                    <span className="sub-label">
                      {project?.especific_objectives}
                    </span>

                    <label>
                      O projeto é continuidade de ano(s) anterior(es)?
                    </label>
                    <span className="sub-label">
                      {project?.continuation ? 'Sim' : 'não'}
                    </span>

                    {project.continuation && (
                      <>
                        <label>
                          Informe os principais resultados alcançados nos
                          últimos 12 meses.
                        </label>
                        <span className="sub-label">{project?.results}</span>
                      </>
                    )}

                    <label>
                      O projeto possui credencial de alguma Feira Afiliada à
                      FEMIC?
                    </label>
                    <span className="sub-label">
                      {project?.isAccredited ? 'Sim' : 'não'}
                    </span>
                    {project.isAccredited && (
                      <>
                        <label>Feira Afiliada.</label>
                        <span className="sub-label">{project?.affiliate}</span>
                      </>
                    )}
                    <label>Canais de divulgação científica do projeto</label>
                    {project.insta ? (
                      <a href={project.insta}>Instagram: {project.insta}</a>
                    ) : (
                      <span className="sub-label">
                        Instagram: Não informado
                      </span>
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
            {!'rascunho,desist'.includes(project.status) && (
              <div className="flex flex-1 w-full">
                <div className="details">
                  <button onClick={() => setShowFinal(!showFinal)}>
                    <label>Finalização</label>
                    <FiChevronDown color="#333" size={24} />
                  </button>
                  {showFinal && (
                    <div className="details-it">
                      <label>Informações adicionais</label>
                      <span className="sub-label">
                        {project.aditional_info || 'Não informou'}
                      </span>

                      <label className="mb-2">
                        <input type="checkbox" disabled checked />
                        <span className="sub-label ml-2">
                          Declaramos que o trabalho submetido para participação
                          na FEMIC (Feira Mineira de Iniciação Científica) é
                          original, de única e exclusiva autoria das pessoas
                          informadas como membros(as) da equipe e não se trata
                          de cópia integral ou parcial de textos e trabalhos de
                          autoria de outrem, seja em formato de papel,
                          eletrônico, digital, audiovisual ou qualquer outro
                          meio.
                        </span>
                      </label>
                      <label className="mb-2">
                        <input type="checkbox" disabled checked />
                        <span className="sub-label ml-2">
                          Declaramos ter total conhecimento e compreensão do que
                          é considerado plágio, não apenas a cópia integral do
                          trabalho, mas também de parte dele, inclusive de
                          artigos e/ou parágrafos, sem citação do autor ou de
                          sua fonte.{' '}
                        </span>
                      </label>
                      <label className="mb-2">
                        <input type="checkbox" disabled checked />
                        <span className="sub-label ml-2">
                          Declaramos ter ciência e estar de acordo com as Regras
                          e Políticas de Privacidade da FEMIC, disponível no
                          site{' '}
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
            )}
            <AdmContent style={{ marginLeft: '5%' }}>
              <label>Escolaridade do projeto: </label>
              <select
                id=""
                name=""
                onChange={(e) => setEscolaridade(e.target.value)}>
                {modalityList('all').map((item: any) => (
                  <option
                    key={item.id}
                    selected={project.category == item.value}
                    value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
              <button
                style={{ backgroundColor: '#1B7824' }}
                disabled={disabled}
                onClick={mudarEscolaridade}>
                Mudar
              </button>
              <label>Permitir edição:</label>
              <select onChange={(e) => setEdit(e.target.value)}>
                <option value="" disabled selected>
                  Selecione aqui
                </option>
                <option value="n">Não</option>
                <option value="s">Sim</option>
              </select>
              <button
                style={{ backgroundColor: '#1B7824' }}
                onClick={editProject}
                disabled={disabled}>
                Salvar
              </button>
              <label>Ocultar projeto:</label>
              <select onChange={(e) => setHidden(e.target.value)}>
                <option value="" disabled selected>
                  Selecione aqui
                </option>
                <option value="n">Não</option>
                <option value="s">Sim</option>
              </select>
              <button
                style={{ backgroundColor: '#1B7824' }}
                onClick={hiddenProject}
                disabled={disabled}>
                Salvar
              </button>
            </AdmContent>
          </TabPanel>
          <TabPanel>
            <Etica project={project} />
          </TabPanel>

          <TabPanel>
            {'recomendado,concluido,finalista,confirmado'.includes(
              project.status
            ) ? (
              <>
                <h1>Pré-avaliação</h1>
                <h1 style={{ fontSize: 20 }}>Comissão</h1>
                <ListUsers>
                  {commissionPre?.map((part: any) => (
                    <CardPeople key={part._id} integrante={part}>
                      <button onClick={() => removeAvaliador(part, 'pre')}>
                        Remover
                      </button>
                    </CardPeople>
                  ))}
                </ListUsers>
                <h2>Busque os avaliadores disponíveis para este projeto.</h2>
                <span className="sub-label">
                  Deve ter de dois a quatro avaliadores.
                </span>
                <WelcomeHeader>
                  <FormQuery onSubmit={(e) => searchAvaliadores(e, 'pre')}>
                    <div className="flex flex-col">
                      <span>Aréa de atuação</span>
                      <select style={{ width: 160 }}>
                        <option value="Ciências Exatas e da Terra">
                          Ciências Exatas e da Terra
                        </option>
                        <option value="Ciências Biológicas">
                          Ciências Biológicas
                        </option>
                        <option value="Engenharias">Engenharias</option>
                        <option value="Ciências da Saúde">
                          Ciências da Saúde
                        </option>
                        <option value="Ciências Agrárias">
                          Ciências Agrárias
                        </option>
                        <option value="Ciências Sociais Aplicadas">
                          Ciências Sociais Aplicadas
                        </option>
                        <option value="Ciências Humanas">
                          Ciências Humanas
                        </option>
                        <option value="Linguística, Letras e Artes">
                          Linguística, Letras e Artes
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <span>Escolaridade</span>
                      <select style={{ width: 160 }}>
                        <option value="Educação infantil;jun">
                          Educação Infantil
                        </option>
                        <option value="Anos iniciais do ensino fundamental;jun">
                          Anos Iniciais do Ensino Fundamental
                        </option>
                        <option value="Anos finais do ensino fundamental;jov">
                          Anos Finais do Ensino Fundamental
                        </option>
                        <option value="Ensino medio;jov">Ensino Médio</option>
                        <option value="Ensino técnico;jov">
                          Ensino Técnico
                        </option>
                        <option value="Ensino técnico;prof">
                          Ensino Superior em andamento
                        </option>
                        <option value="Ensino Superior completo;prof">
                          Ensino Superior completo
                        </option>
                        <option value="Especialista;prof">Especialista</option>
                        <option value="Mestre;prof">Mestre</option>
                        <option value="Doutor;prof">Doutor</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <span>Idioma</span>
                      <select>
                        <option value="Por">Português</option>
                        <option value="Ing">Inglês</option>
                        <option value="Es">Espanhol</option>
                        <option value="Fra">Francês</option>
                      </select>
                    </div>
                    <button type="submit" className="">
                      Pesquisar
                    </button>
                  </FormQuery>
                </WelcomeHeader>
                {avaliadores &&
                  avaliadores.map((user) => (
                    <UserContainer key={user._id}>
                      <Image
                        width={50}
                        height={50}
                        src={user.avatar_url}
                        alt="Foto do avaliador"
                        loader={() =>
                          `https://apiportal.femic.com.br/user/profile/image/${user.avatar_url}`
                        }
                      />
                      <div className="flex flex-col w-60">
                        <span className="title">{user.name}</span>
                        <span className="sub">{user.identifier}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="title">Sexo</span>
                        <span className="sub">
                          {' '}
                          {convertSexToString(user.sex)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="title flex flex-row items-center">
                          Perfil
                        </span>
                        <span className="sub flex flex-row">
                          {user.terms.isEnabled
                            ? 'Verificado'
                            : 'Não verificado'}
                        </span>
                      </div>
                      <button
                        className="a-alt"
                        onClick={() => addAvaliador(user, 'pre')}>
                        Designar
                      </button>
                    </UserContainer>
                  ))}
                <h1>Barema</h1>
                <Table>
                  <thead>
                    <tr>
                      {columns.map((col) => (
                        <th key={col.key} className="text-center">
                          <Tooltip content={col.value}>{col.label}</Tooltip>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{renderRow('pre')}</tbody>
                  <tfoot>{renderMedias('pre')}</tfoot>
                </Table>
                <span
                  className="text-white py-2 px-3"
                  style={{ backgroundColor: '#444' }}>
                  Somatório: {project.pre_avaliacao.total}
                </span>
                <h1>
                  Comentários em relação a avaliação conduzida e/ou
                  recomendações para aperfeiçoamento do trabalho.
                </h1>
                {project.pre_avaliacao.barema.map((aval: any) => (
                  <div className="flex flex-col" key={aval.avaliador}>
                    <span>{aval.avaliador_nome}</span>
                    <span className="w-full py-2 pl-5 rounded bg-slate-200 mb-4">
                      {aval.comentario}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1>
                  Este projeto não está aprovado pelo CRC para ser pré avaliado
                </h1>
              </>
            )}
          </TabPanel>
          <TabPanel>
            {'finalista,confirmado,concluido'.includes(project.status) ? (
              <>
                <ProjectConfirmacao project={project} />
                <form className="flex flex-col" onSubmit={editFinalizedProject}>
                  <label htmlFor="">Projeto editável?</label>
                  <Checkbox
                    aria-label=""
                    defaultSelected={!project.finalized}
                    color="warning"
                    onChange={(e) => editFinalizedProject(e)}
                  />
                </form>
              </>
            ) : (
              <label htmlFor="">Este projeto não é finalista</label>
            )}
          </TabPanel>
          <TabPanel>
            {'finalista,confirmado,concluido'.includes(project.status) ? (
              <>
                <h1>Avaliação</h1>
                <h1 style={{ fontSize: 20 }}>Comissão</h1>
                <ListUsers>
                  {commissionFinal?.map((part: any) => (
                    <CardPeople key={part._id} integrante={part}>
                      <button onClick={() => removeAvaliador(part, 'final')}>
                        Remover
                      </button>
                    </CardPeople>
                  ))}
                </ListUsers>
                <h2>Busque os avaliadores disponíveis para este projeto.</h2>
                <span className="sub-label">
                  Deve ter de dois a cinco avaliadores.
                </span>
                <WelcomeHeader>
                  <FormQuery onSubmit={(e) => searchAvaliadores(e, 'final')}>
                    <div className="flex flex-col">
                      <span>Área de atuação</span>
                      <select style={{ width: 160 }}>
                        <option value="">Todas</option>
                        <option value="Ciências Exatas e da Terra">
                          Ciências Exatas e da Terra
                        </option>
                        <option value="Ciências Biológicas">
                          Ciências Biológicas
                        </option>
                        <option value="Engenharias">Engenharias</option>
                        <option value="Ciências da Saúde">
                          Ciências da Saúde
                        </option>
                        <option value="Ciências Agrárias">
                          Ciências Agrárias
                        </option>
                        <option value="Ciências Sociais Aplicadas">
                          Ciências Sociais Aplicadas
                        </option>
                        <option value="Ciências Humanas">
                          Ciências Humanas
                        </option>
                        <option value="Linguística, Letras e Artes">
                          Linguística, Letras e Artes
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <span>Escolaridade</span>
                      <select style={{ width: 160 }}>
                        <option value=";">Todas</option>
                        <option value="Educação infantil;jun">
                          Educação Infantil
                        </option>
                        <option value="Anos iniciais do ensino fundamental;jun">
                          Anos Iniciais do Ensino Fundamental
                        </option>
                        <option value="Anos finais do ensino fundamental;jov">
                          Anos Finais do Ensino Fundamental
                        </option>
                        <option value="Ensino medio;jov">Ensino Médio</option>
                        <option value="Ensino técnico;jov">
                          Ensino Técnico
                        </option>
                        <option value="Ensino técnico;prof">
                          Ensino Superior em andamento
                        </option>
                        <option value="Ensino Superior completo;prof">
                          Ensino Superior completo
                        </option>
                        <option value="Especialista;prof">Especialista</option>
                        <option value="Mestre;prof">Mestre</option>
                        <option value="Doutor;prof">Doutor</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <span>Idioma</span>
                      <select>
                        <option value="Por">Português</option>
                        <option value="Ing">Inglês</option>
                        <option value="Es">Espanhol</option>
                        <option value="Fra">Francês</option>
                      </select>
                    </div>
                    <button type="submit" className="">
                      Pesquisar
                    </button>
                  </FormQuery>
                  <br />
                  <FormQuery onSubmit={searchAvaliadoresByName}>
                    <div className="flex flex-col">
                      <label>Nome: (completo ou incompleto)</label>
                      <input
                        required
                        className="input"
                        style={{ width: 300 }}
                      />
                    </div>
                    <button type="submit" className="">
                      Pesquisar
                    </button>
                  </FormQuery>
                </WelcomeHeader>
                {avaliadores &&
                  avaliadores.map((user) => (
                    <UserContainer key={user._id}>
                      <Image
                        width={50}
                        height={50}
                        src={user.avatar_url}
                        alt="Foto do avaliador"
                        loader={() =>
                          `https://apiportal.femic.com.br/user/profile/image/${user.avatar_url}`
                        }
                      />
                      <div className="flex flex-col w-60">
                        <span className="title">{user.name}</span>
                        <span className="sub">{user.identifier}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="title">Sexo</span>
                        <span className="sub">
                          {' '}
                          {convertSexToString(user.sex)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="title flex flex-row items-center">
                          Perfil
                        </span>
                        <span className="sub flex flex-row">
                          {user.terms.isEnabled
                            ? 'Verificado'
                            : 'Não verificado'}
                        </span>
                      </div>
                      <button
                        className="a-alt"
                        onClick={() => addAvaliador(user, 'final')}>
                        Designar
                      </button>
                    </UserContainer>
                  ))}
                <h1>Barema</h1>
                <Table>
                  <thead>
                    <tr>
                      {columns2.map((col) => (
                        <th key={col.key} className="text-center">
                          <Tooltip content={col.value}>{col.label}</Tooltip>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{renderRow('final')}</tbody>
                  <tfoot>{renderMedias('final')}</tfoot>
                </Table>
                <span
                  className="text-white py-2 px-3"
                  style={{ backgroundColor: '#444' }}>
                  Somatório: {project.avaliacao.total}
                </span>
                {/* <div className="flex flex-col items-center justify-center w-100">
									<span className="text-lg my-3">Classificação</span>
									<div className="flex gap-3">
										<div className="flex flex-col items-center rounded bg-gray-300 p-6">
											<span className="font-semibold">Modalidade</span>
											<span className="text-orange-800 text-xl">4</span>
										</div>
										<div className="flex flex-col items-center rounded bg-gray-300 p-6">
											<span className="font-semibold">Categoria</span>
											<span className="text-orange-800 text-xl">4</span>
										</div>
										<div className="flex flex-col items-center rounded bg-gray-300 p-6">
											<span className="font-semibold">Área científica</span>
											<span className="text-orange-800 text-xl">4</span>
										</div>
									</div>
								</div> */}
                <h1>
                  Comentários em relação a avaliação conduzida e/ou
                  recomendações para aperfeiçoamento do trabalho.
                </h1>
                {project.avaliacao.barema.map((aval: any) => (
                  <div className="flex flex-col" key={aval.avaliador}>
                    <span>{aval.avaliador_nome}</span>
                    <span className="w-full py-2 pl-5 rounded bg-slate-200 mb-4">
                      {aval.comentario}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <h1>Este projeto não está aprovado para ser avaliado</h1>
            )}
          </TabPanel>
          <TabPanel>
            {project.winner.win && (
              <div className="flex flex-col">
                <label style={{ fontSize: 20 }}>Classificação: </label>
                <span style={{ color: '#444' }}>{project.winner.win_text}</span>
                <label style={{ fontSize: 20 }}>Modalidade: </label>
                <span style={{ color: '#444' }}>
                  {project.winner.win_subtext}
                </span>
              </div>
            )}
          </TabPanel>
        </Tabs>
      </ProjectDetails>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const projectData = await fetch(`${baseUrl}/project/getserverside/${id}`);
  const project = await projectData.json();

  let commissionPre = [];
  let commissionFinal = [];

  if ('recomendado,'.includes(project.status)) {
    const commission = await fetch(`${baseUrl}/project/commission/pre/${id}`);
    commissionPre = await commission.json();
  } else if ('finalista,confirmado,concluido'.includes(project.status)) {
    const commission = await fetch(`${baseUrl}/project/commission/final/${id}`);
    commissionFinal = await commission.json();
    console.log('fez essa query e retornoy', commissionFinal);
  }
  return {
    props: {
      project: project,
      commission: { commissionPre, commissionFinal },
    },
  };
};

export default ProjetoAdminView;
