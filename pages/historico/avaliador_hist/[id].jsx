import { GetServerSideProps, NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Checkbox } from '@nextui-org/react';

import {
  BaremaContainer,
  Project,
  ProjectDetails,
  ProjectInfoAdmin,
} from '../../../styles/home/style.module';

import LayoutBase from '../../../styles/layout/base';
import {
  ListUsers,
  Table,
  UserCard,
} from '../../../styles/projetos/styles.module';

import { renderAreaProject } from '../../../utils/projects';
import api, { baseUrl } from '../../../config/api';
import ProjectConfirmacao from '../../../components/ProjectConfirmacao';

const AvaliadorProjeto = (prop) => {
  const { project } = prop;

  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0);

  const alert = useAlert();

  const { register, handleSubmit, watch, getValues, setValue, reset } = useForm(
    {
      defaultValues: {
        nota1: 0,
        nota2: 0,
        nota3: 0,
        nota4: 0,
        nota5: 0,
        nota6: false,
        comentario: '',
      },
    }
  );

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    getValues: getValues2,
    setValue: setValue2,
    reset: reset2,
  } = useForm({
    defaultValues: {
      nota1: 0,
      nota2: 0,
      nota3: 0,
      nota4: 0,
      nota5: 0,
      nota6: 0,
      nota7: 0,
      nota8: 0,
      comentario: '',
    },
  });
  useEffect(() => {
    if (
      project.pre_avaliacao.avaliadores.includes(
        sessionStorage.getItem('profile_id')
      )
    ) {
      const data = project.pre_avaliacao.barema.filter(
        (item) => item.avaliador == sessionStorage.getItem('profile_id')
      );
      reset(data[0]);
    } else if (
      project.avaliacao.avaliadores.includes(
        sessionStorage.getItem('profile_id')
      )
    ) {
      const data = project.avaliacao.barema.filter(
        (item) => item.avaliador == sessionStorage.getItem('profile_id')
      );
      reset2(data[0]);
    }
  }, []);

  useEffect(() => {
    let val =
      watch('nota1') +
      watch('nota2') +
      watch('nota3') +
      watch('nota4') +
      watch('nota5');

    if (watch('nota6')) {
      val = val + 10;
    }
    setTotal(val);
    let val2 =
      watch2('nota1') +
      watch2('nota2') +
      watch2('nota3') +
      watch2('nota4') +
      watch2('nota5') +
      watch2('nota6') +
      watch2('nota7') +
      watch2('nota8');

    setTotal2(val2);
  }, [watch()]);

  const sendBarema = async (data) => {
    data['avaliador'] = sessionStorage.getItem('profile_id');
    data['avaliador_nome'] = sessionStorage.getItem('name');
    data['somatorio'] = total;
    data['project'] = project._id;

    const projectFinalAval = 'finalista,confirmado'.includes(project.status);

    api
      .patch(
        `/project/barema/${
          projectFinalAval ? 'final_avaliacao' : 'pre_avaliacao'
        }`,
        data
      )
      .then(() => {
        alert.success('Avaliação feita com sucesso');
      })
      .catch((err) => {
        alert.error(err.response?.data.message);
      });
  };

  return (
    <LayoutBase title="Avaliador">
      <ProjectInfoAdmin>
        <Project>
          <div className="head">
            <img
              src={`${baseUrl}/project/logo/${project._id}`}
              alt="Logo do projeto"
            />
          </div>
        </Project>
        <div className="infos-project">
          <label htmlFor="">Título do projeto</label>
          <span>{project.title}</span>
          <label htmlFor="">ID do projeto</label>
          <span>{project.id_femic}</span>
        </div>
        <a className="auth" href="#barema">
          Barema
        </a>
      </ProjectInfoAdmin>
      <ProjectDetails>
        <div className="flex flex-1 w-full">
          <div className="details">
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
              {project?.keywords?.map((key, index) => (
                <span className="sub-label" key={`${key}-${index}`}>
                  {key}
                </span>
              ))}
              <label>Objetivo geral do projeto.</label>
              <span className="sub-label">{project.general_objective}</span>

              <label>Objetivos específicos do projeto.</label>
              <span className="sub-label">{project.especific_objectives}</span>

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
                <a href={project.others_links}>Outro: {project.others_links}</a>
              ) : (
                <span className="sub-label">Outro: Não informado</span>
              )}
            </div>
          </div>
        </div>
        {watch2('comentario').length > 0 && (
          <div className="details mt-8">
            <div className="details-it">
              <ProjectConfirmacao project={project} />
            </div>
          </div>
        )}
        {watch('comentario').length > 0 && (
          <div className="details mt-8">
            <div className="details-it">
              <h1 id="barema">Parecer Pré-avaliação</h1>
              <form
                onSubmit={handleSubmit(sendBarema)}
                className="items-center flex  flex-col justify-center">
                <Table style={{ width: '80%' }}>
                  <thead>
                    <tr>
                      <th>Critérios</th>
                      <th>Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Criatividade e Inovação
                      </td>
                      <td style={{ width: 200 }}>2</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register('nota1', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={20}
                          min={0}
                          disabled
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Profundidade da pesquisa
                      </td>
                      <td style={{ width: 200 }}>2</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register('nota2', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={20}
                          required
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Clareza e objetividade na exposição do projeto
                      </td>
                      <td style={{ width: 200 }}>2</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register('nota3', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={20}
                          required
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Uso da metodologia científica
                      </td>
                      <td style={{ width: 200 }}>2</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register('nota4', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={20}
                          required
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Aplicabilidade dos resultados no cotidiano da sociedade
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register('nota5', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={10}
                          required
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Aplicabilidade dos resultados no cotidiano da sociedade
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <label>
                          sim/não
                          <Checkbox
                            aria-label="check"
                            color="warning"
                            isDisabled
                            onChange={(e) => setValue('nota6', e)}
                            defaultChecked={watch('nota6')}
                          />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Somatório
                      </td>
                      <td style={{ width: 200 }}> </td>
                      <td style={{ width: 'fit-content' }}>
                        <label className="text-lg">{total}</label>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
                <h1 className="!text-xl">
                  Comentários em relação a avaliação conduzida e/ou
                  Recomendações para aperfeiçoamento do trabalho.
                </h1>
                <span className="sub-label">
                  Máximo de 500 caracteres com espaço.
                </span>
                <textarea
                  className="bg-slate-200 p-2 w-full"
                  maxLength={500}
                  {...register('comentario')}
                  disabled></textarea>
              </form>
            </div>
          </div>
        )}
        {watch2('comentario').length > 0 && (
          <div className="details mt-8">
            <div className="details-it">
              <h1 id="barema">Parecer avaliação final</h1>
              <form
                onSubmit={handleSubmit(sendBarema)}
                className="items-center flex  flex-col justify-center">
                <Table style={{ width: '80%' }}>
                  <thead>
                    <tr>
                      <th>Critérios</th>
                      <th>Peso</th>
                      <th>Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Criatividade e Inovação
                      </td>
                      <td style={{ width: 200 }}>2</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota1', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={20}
                          min={0}
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Profundidade da pesquisa
                      </td>
                      <td style={{ width: 200 }}>2</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota2', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={20}
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Relatório e Resumo científico
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota3', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 10,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={10}
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Pôster científico
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota4', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 10,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={10}
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Clareza e objetividade na exposição do projeto
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota5', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 20,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={10}
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Uso da metodologia científica{' '}
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota6', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 10,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={10}
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Aplicabilidade dos resultados no cotidiano da sociedade
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota7', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 10,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={10}
                          required
                          min={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Empolgação e comprometimento durante a apresentação do
                        projeto
                      </td>
                      <td style={{ width: 200 }}>1</td>
                      <td style={{ width: 'fit-content' }}>
                        <input
                          {...register2('nota8', {
                            required: true,
                            valueAsNumber: true,
                            min: 0,
                            max: 10,
                          })}
                          className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
                          type="number"
                          max={10}
                          disabled
                          min={0}
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
                        Somatório
                      </td>
                      <td style={{ width: 200 }}></td>
                      <td style={{ width: 'fit-content' }}>
                        <label className="text-lg">{total2}</label>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
                <h1 className="!text-xl">
                  Comentários em relação a avaliação conduzida e/ou
                  Recomendações para aperfeiçoamento do trabalho.
                </h1>
                <span className="sub-label">
                  Máximo de 500 caracteres com espaço.
                </span>
                <textarea
                  className="bg-slate-200 p-2 w-full"
                  maxLength={500}
                  disabled
                  {...register2('comentario')}></textarea>
              </form>
            </div>
          </div>
        )}
      </ProjectDetails>
    </LayoutBase>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  console.log(id);

  if (id == '1x') {
    return {
      props: {
        project: {},
      },
    };
  }

  const projectData = await fetch(`${baseUrl}/project/getserverside/${id}`);
  const project = await projectData.json();

  return {
    props: {
      project: project,
    },
  };
};

export default AvaliadorProjeto;
