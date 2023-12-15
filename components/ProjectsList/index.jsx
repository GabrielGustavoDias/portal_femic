import { Loading, Modal, Text, Tooltip } from '@nextui-org/react';
import { NextPage } from 'next';
import { FiFilePlus } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import api, { baseUrl } from '../../config/api';
import { ProjectInfo, Project } from '../../styles/home/style.module';
import { useAlert } from 'react-alert';
import TooltipLive from '../TooltipLive';
import { IProject } from '../../types/project';

// type IProps = {
//   profile: String;
//   projects: any[] | [any];
// };
const ProjectsList = ({ profile, projects }) => {
  const [disabledNewProject, setDisabledNewProject] = useState(false);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState('#1FB58F');
  const [modalOrientador, setModalOrientador] = useState(false);
  const [cert, setCert] = useState(false);

  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
  }, []);

  const createProjectOri = (modality) => {
    sessionStorage.setItem('modality_project', modality);

    window.document.body.style.overflow = 'auto';
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'auto';

    let res = true;

    if (res) {
      api
        .post(
          `project/initial/${sessionStorage.getItem('profile_id')}`,
          {
            title: 'Título ainda não informado pelos autores',
            modality: modality,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          sessionStorage.setItem('project_id', response.data._id);
          setVisible(false);
          router.push('/projetos/time');
        })
        .catch((err) => {
          console.warn(err);
          alert.error(err?.response?.data?.message || 'Erro ao criar projeto');
          if (err.response.status == 308) {
            setVisible(true);
          }
        });
    } else {
      setVisible(false);
    }
  };

  const createNewProject = () => {
    setDisabledNewProject(true);
    if (profile == 'orientador') {
      setModalOrientador(true);
      return;
    }

    let res = true;
    if (projects.length > 0) {
      res = confirm(
        'Você já possui um projeto em submissão. Confira seu(s) projeto(s) antes de seguir. Lembre-se que você não poderá excluir projetos criados desnecessariamente. '
      );
    }

    if (res) {
      api
        .post(
          `project/initial/${sessionStorage.getItem('profile_id')}`,
          {
            title: 'Título ainda não informado pelos autores',
            modality: sessionStorage.getItem('page'),
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          sessionStorage.setItem('project_id', response.data._id);
          setDisabledNewProject(false);
          sessionStorage.setItem(
            'modality_project',
            sessionStorage.getItem('page') || ''
          );
          router.push('/projetos/time');
        })
        .catch((err) => {
          console.warn(err);
          alert.error(err?.response?.data?.message || 'Erro ao criar projeto');
          if (err.response.status == 308) {
            setVisible(true);
          }
          setDisabledNewProject(false);
        });
    } else {
      setDisabledNewProject(false);
    }
  };

  const viewProject = (id, status) => {
    if (status == 'finalista') {
      // return;
    }
    router.push(`/projetos/view/${id}`);
  };

  const navigateToProject = (id, status) => {
    sessionStorage.setItem('project_id', id);
    router.push('/projetos/time');
  };

  const navigateToConfirmProject = (id, finalized) => {
    if (finalized == true) {
      alert.success('Você já enviou seus dados :)');
      return;
    }
    sessionStorage.setItem('project_id', id);
    router.push('/projetos/confirmacao');
  };
  const getCertificate = (proj, win) => {
    let doc = win ? proj?.winner?.cert : proj?.certificate;
    if (!doc) {
      doc = 'n';
    }

    api
      .post(`/certificate`, {
        id: proj._id,
        doc: doc,
        win,
      })
      .then((res) => {
        router.push(`${baseUrl}/certificate/${res.data.doc}`);
      })
      .catch((err) => {
        console.warn(err);
        setCert(false);
      });
  };

  const renderDate = (data) => {
    const date = new Date(data);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
  };

  const renderCreateProject = () => {
    return (
      <ProjectInfo>
        <Project style={{ marginBottom: 20 }}>
          <div className="head">
            <FiFilePlus size={24} color="#333" />
          </div>
          <button
            style={{ backgroundColor: color }}
            onClick={() => createNewProject()}
            disabled={disabledNewProject}
            className="button">
            {disabledNewProject ? <Loading color="white" /> : 'Novo Projeto'}
          </button>
        </Project>
        <div className="infos-project">
          {profile == 'jovem' && (
            <>
              <label htmlFor="">FEMIC jovem:</label>
              <span>
                Modalidade que envolve projetos de autoria de estudantes dos
                Anos Finais do Ensino Fundamental (6º ao 9º ano), Ensino Médio
                ou Ensino Técnico juntamente com seus orientadores.
              </span>
              <span className="ml-3">
                A equipe deverá ser formada por até 3 estudantes e até 3
                orientadores.
              </span>
            </>
          )}
          {profile == 'mais' && (
            <>
              <label htmlFor="">FEMIC MAIS:</label>
              <span>
                Modalidade que envolve projetos de autoria de universitários,
                pesquisadores, professores do ensino superior e da educação
                básica, entre outros profissionais.
              </span>
              <span className="ml-3">
                A equipe somente pode ser formada por autores e autoras com no
                mínimo ensino superior em andamento.
              </span>
            </>
          )}
          {profile == 'junior' && (
            <>
              <label htmlFor="">FEMIC Júnior:</label>
              <span>
                Modalidade que envolve projetos de autoria de estudantes da
                Educação Infantil e dos Anos Iniciais do Ensino Fundamental (1º
                ao 5º ano) juntamente com seus orientadores.
              </span>
              <span className="ml-3">
                A equipe deverá ser formada por até 3 estudantes e até 3
                orientadores.{' '}
              </span>
            </>
          )}
          {profile == 'orientador' && <></>}
        </div>
      </ProjectInfo>
    );
  };

  const renderProjectEdit = (proj) => {
    return (
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${proj._id}`}
              alt="Logo do projeto"
            />
          </div>
          <button
            style={{ backgroundColor: color }}
            className="button"
            onClick={() => navigateToProject(proj._id, proj.status)}>
            Editável
          </button>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{proj.title}</span>
          <label>ID do projeto</label>
          <span>{proj.id_femic}</span>

          <button
            style={{ backgroundColor: color }}
            onClick={() => navigateToProject(proj._id, proj.status)}>
            Editar
          </button>
        </div>
      </ProjectInfo>
    );
  };

  const renderProjectRascunho = (proj) => {
    return (
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${proj._id}`}
              alt="Logo do projeto"
            />
          </div>
          <button
            style={{ backgroundColor: color }}
            className="button capitalize"
            onClick={() => navigateToProject(proj._id, proj.status)}>
            rascunho
          </button>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{proj.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{proj.id_femic}</span>
          <button
            style={{ backgroundColor: color }}
            onClick={() => navigateToProject(proj._id, proj.status)}>
            Editar
          </button>
        </div>
      </ProjectInfo>
    );
  };

  const renderProjectFinalized = (proj) => {
    return (
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${proj._id}`}
              alt="Logo do projeto"
            />
          </div>
          <button
            style={{ backgroundColor: color }}
            className="button capitalize">
            {'finalista,'.includes(proj.status) ? 'Finalista' : proj.status}
          </button>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{proj.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{proj.id_femic}</span>
          {proj.status == 'finalista' && <label>Projeto Finalista!</label>}
          <button
            className="capitalize"
            style={{ backgroundColor: color }}
            onClick={() => viewProject(proj._id, proj.status)}>
            {'finalista,'.includes(proj.status)
              ? 'Ok'
              : proj.status.replace('-', ' ')}
          </button>
        </div>
      </ProjectInfo>
    );
  };

  const renderProjectConfirm = (proj) => {
    return (
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${proj._id}`}
              alt="Logo do projeto"
            />
          </div>
          <button
            style={{ backgroundColor: color }}
            className="button"
            onClick={() => navigateToConfirmProject(proj._id, proj.finalized)}>
            {proj.finalized ? 'Finalista' : 'Finalista'}
          </button>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{proj.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{proj.id_femic}</span>
          <label>
            {!proj.finalized
              ? 'Complete as informações para confirmar sua participação'
              : 'Você já enviou seus dados'}
          </label>
          <button
            style={{ backgroundColor: color }}
            onClick={() => navigateToConfirmProject(proj._id, proj.finalized)}>
            {proj.finalized ? 'Enviado' : 'Confirmar'}
          </button>
        </div>
      </ProjectInfo>
    );
  };

  const renderProjectConfirmado = (proj) => {
    return (
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${proj._id}`}
              alt="Logo do projeto"
            />
          </div>
          <button
            style={{ backgroundColor: color }}
            onClick={() => viewProject(proj._id, proj.status)}
            className="button">
            Confirmado
          </button>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{proj.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{proj.id_femic}</span>
          <label
            className="flex justify-between pb-3"
            style={{ width: '100%' }}>
            Seus dados foram confirmados
            {proj?.live?.link && (
              <Tooltip
                color="invert"
                content={<TooltipLive live={proj.live} />}>
                <a
                  className="err"
                  href={proj.live.link}
                  rel="noreferrer"
                  target="_blank">
                  Videoconferência
                </a>
              </Tooltip>
            )}
          </label>
          <button
            onClick={() => viewProject(proj._id, proj.status)}
            style={{ backgroundColor: color }}>
            Ver Projeto
          </button>
        </div>
      </ProjectInfo>
    );
  };

  const renderProjectConcluido = (proj) => {
    return (
      <ProjectInfo>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${proj._id}`}
              alt="Logo do projeto"
            />
          </div>
          <button
            style={{ backgroundColor: color }}
            onClick={() => viewProject(proj._id, proj.status)}
            className="button">
            Concluído
          </button>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{proj.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{proj.id_femic}</span>
          {!'crc,avaliador'.includes(String(profile)) && (
            <div className="flex w-full gap-2 items-end justify-end">
              {proj?.winner?.win && (
                <button
                  className="mb-1"
                  style={cert ? { cursor: 'wait' } : {}}
                  disabled={cert}
                  onClick={() => {
                    setCert(true);
                    getCertificate(proj, true);
                  }}>
                  Certificado de Premiação
                </button>
              )}
              <button
                className="mb-1"
                style={cert ? { cursor: 'wait' } : {}}
                disabled={cert}
                onClick={() => {
                  setCert(true);
                  getCertificate(proj, false);
                }}>
                Certificado de Participação
              </button>
            </div>
          )}
          <button
            onClick={() => viewProject(proj._id, proj.status)}
            style={{ backgroundColor: color }}>
            Ver Projeto
          </button>
        </div>
      </ProjectInfo>
    );
  };

  return (
    <>
      {profile != 'avaliador' && renderCreateProject()}
      {projects.map((project) => {
        if (project.status == 'edit') {
          return renderProjectEdit(project);
        } else if (project.status == 'rascunho') {
          return renderProjectRascunho(project);
        } else if (
          'em-avaliacao,recomendado,reprovado,'.includes(project.status)
        ) {
          return renderProjectFinalized(project);
        } else if (
          'finalista' == project.status &&
          Date.now() < 1663729200000
        ) {
          return renderProjectFinalized(project);
        } else if (
          'finalista' == project.status &&
          Date.now() > 1663729200000
        ) {
          return renderProjectConfirm(project);
        } else if ('confirmado' == project.status) {
          return renderProjectConfirmado(project);
        } else if ('concluido' == project.status) {
          return renderProjectConcluido(project);
        }
      })}
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}>
        <Modal.Body>
          <div className="flex flex-col items-center">
            <span>
              O prazo para submeter um novo projeto foi encerrado. Para mais
              informações:
            </span>
            <a
              className="mt-3 p-4 hover:bg-gray-100 rounded transition"
              target="_blank"
              rel="noreferrer"
              href="https://femic.com.br/datas-importantes/">
              clique aqui
            </a>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={modalOrientador}
        onClose={() => {
          setModalOrientador(false);
          setDisabledNewProject(false);
        }}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Selecione a modalidade que deseja orientar um projeto
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row items-center justify-center">
            <button
              className="py-2 px-3 rounded text-white mx-3"
              style={{ backgroundColor: '#1FB58F' }}
              onClick={() => createProjectOri('jovem')}>
              Jovem
            </button>
            <button
              className="py-2 px-3 rounded text-white mx-3"
              style={{ backgroundColor: '#1FB58F' }}
              onClick={() => createProjectOri('junior')}>
              Júnior
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <iframe hidden id="pdf"></iframe>
    </>
  );
};

export default ProjectsList;
