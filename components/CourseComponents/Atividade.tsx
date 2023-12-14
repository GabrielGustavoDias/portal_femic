import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Loading } from '@nextui-org/react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { TabsStyle } from '../../styles/layout/styles';
import { FormCourse, Exercices } from '../../styles/admin/styles.module';
import Questoes from './Questoes';

import { ICourse, IModule } from '../../types/course';

import api from '../../config/api';

interface Exercice {
  id: string;
  type: string;
  link: string;
}

interface Module {
  name: string;
  exercices: Exercice[];
}

interface SelectedExercice {
  type: string;
  id: string;
}

interface IPropsAtv {
  modulos: any[];
  id: string;
}
interface Iquest {
  id: string;
  data: any[];
}
export default function Atividade({ data, id, moduleId }: any) {
  const [selectedExercice, setSelectedExercice] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(1);

  const [activities, setActivities] = useState<Iquest[]>([
    {
      id: '2e',
      data: [],
    },
  ]);
  const { register, handleSubmit, watch } = useForm();

  const router = useRouter();

  useEffect(() => {
    const course = JSON.parse(sessionStorage.getItem('curso') || '{}');
    
    setActivities(course.questoes || []);
  }, []);

  const addNewExercice = (data: any) => {
    activities[activities.findIndex((item) => item.id == moduleId)].data.push({
      type: data.type,
    });
    setActivities(activities);
    setExerciseCount(exerciseCount + 1);
  };

  const renderActivity = (item: any, index: number) => {
    const idRef = router.asPath.split('/')[router.asPath.split('/').length - 1];
    if (item.type == 'aula') {
      return (
        <Aula id={idRef} exerciceId={moduleId} index={index} data={item} />
      );
    } else if (item.type == 'canva') {
      return (
        <Canva id={idRef} exerciceId={moduleId} index={index} data={item} />
      );
    } else if (item.type == 'texto') {
      return (
        <Text id={idRef} exerciceId={moduleId} index={index} data={item} />
      );
    }
    return (
      <Questoes id={idRef} exerciceId={moduleId} index={index} data={item} />
    );
  };

  return (
    <TabsStyle>
      <div className="p-5">
        <Tabs
          className="tabs"
          disabledTabClassName="disabled-tab"
          selectedTabClassName="abled-tab"
          onSelect={(index) => setSelectedExercice(index)}>
          <TabList className="tab-label">
            {activities
              .find((item: any) => item.id == moduleId)
              ?.data.map(
                (item: any, index: number) =>
                  item?.type &&
                  item?.type !== 'not' && (
                    <Tab className="tab-alt" key={String(index * 17)}>
                      {item.type}
                    </Tab>
                  )
              )}
            <Tab className="tab-alt">
              <FiPlus size={28} color="#FFF" />
            </Tab>
          </TabList>
          {activities
            .find((item: any) => item.id == moduleId)
            ?.data.map(
              (item: any, index: number) =>
                item?.type &&
                item?.type !== 'not' && (
                  <TabPanel key={String(index * 910)}>
                    {renderActivity(item, index)}
                  </TabPanel>
                )
            )}
          <TabPanel>
            <FormCourse onSubmit={handleSubmit(addNewExercice)}>
              <div>
                <label>Selecione o tipo de ação</label>
                <select {...register('type')}>
                  <option value="aula" selected>
                    Aula do youtube
                  </option>
                  {/* <option value="canva">Slide do Canva</option>
                  <option value="atividade">Atividade</option>
                  <option value="texto">Texto</option> */}
                </select>
              </div>
              <button className="sucess mt-2">Adicionar</button>
            </FormCourse>
          </TabPanel>
        </Tabs>
      </div>
    </TabsStyle>
  );
}

interface IProps {
  module?: any;
  id?: string;
  courseId?: string;
}

function extractVideoCodeFromUrl(url = '..') {
  var match = url.match(/(?:\/|%3D|v=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/);
  return match ? match[1] : null;
}

const Aula = ({ id, exerciceId, index, data }: any) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [change, setChange] = useState(false);

  useEffect(() => {
    reset(data);
  }, []);

  const submit = (data: any) => {
    data['id'] = id;
    data['exercice'] = exerciceId;
    data['index'] = index;
    api
      .patch(`/course/${id}`, data)
      .then((res) => {
        sessionStorage.setItem('curso', JSON.stringify(res.data));
        window.location.reload();
      })
      .catch(console.warn);
  };

  const removeOne = (exercice: string) => {
    console.log(exercice, index);
    api
      .patch(`/course/removeone/${id}`, {
        exercice: exercice,
        index: index,
      })
      .then((res) => {
        //window.location.reload();
        setChange(!change);
        console.log(res.data);
      })
      .catch(console.warn);
  };

  return (
    <FormCourse onSubmit={handleSubmit(submit)}>
      <div>
        <label>Digite o link da aula no Youtube</label>
        <input type="url" {...register('aula_url')} />
      </div>
      {!extractVideoCodeFromUrl(watch('aula_url')) && !watch('aula_url') && (
        <span>video aula aparecerecará aqui</span>
      )}
      {!extractVideoCodeFromUrl(watch('aula_url')) &&
        watch('aula_url')?.length > 0 && <Loading color="warning" />}
      {extractVideoCodeFromUrl(watch('aula_url')) && (
        <iframe
          width="50%"
          height="350px"
          onLoad={(e) =>
            (e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px')
          }
          src={
            'https://youtube.com/embed/' +
            extractVideoCodeFromUrl(watch('aula_url'))
          }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      )}
      <div>
        <label>Digite a desccrição.</label>
        <textarea rows={10} {...register('descricao')} />
      </div>
      <input
        type="text"
        hidden
        {...register('type', {
          value: 'aula',
        })}
      />
      <input
        type="text"
        hidden
        {...register('id', {
          value: id,
        })}
      />
      <input
        type="text"
        hidden
        {...register('exercice', {
          value: exerciceId,
        })}
      />
      <section className="flex flex-row gap-2">
        <button className="sucess">Salvar</button>
        <button className="danger" onClick={() => removeOne(exerciceId)}>
          <FiTrash size={24} />
        </button>
      </section>
    </FormCourse>
  );
};

const Canva = ({ id, exerciceId, index, data }: any) => {
  const { register, handleSubmit, watch, reset } = useForm();

  useEffect(() => {
    reset(data);
  }, []);

  const submit = (data: any) => {
    data['id'] = id;
    data['exercice'] = exerciceId;
    data['index'] = index;
    api
      .patch(`/course/${id}`, data)
      .then((res) => {
        sessionStorage.setItem('curso', JSON.stringify(res.data));
        window.location.reload();
      })
      .catch(console.warn);
    window.location.reload();
  };

  const removeOne = (exercice: string) => {
    console.log(exercice, index);
    api
      .patch(`/course/removeone/${id}`, {
        exercice: exercice,
        index: index,
      })
      .then((res) => {
        //window.location.reload();
      })
      .catch(console.warn);
  };

  const isValidUrl = (url: string) => {
    const regex = /^https:\/\/www.canva.com\/design\/[A-Za-z0-9]+\/view$/;
    return regex.test(url);
  };

  return (
    <FormCourse onSubmit={handleSubmit(submit)}>
      <div>
        <label>Digite o slide do Canva</label>
        <input type="url" {...register('canva_url')} />
      </div>
      <input
        type="text"
        {...register('type', {
          value: 'canva',
        })}
        hidden
      />
      <input
        type="text"
        hidden
        {...register('id', {
          value: id,
        })}
      />
      <input
        type="text"
        hidden
        {...register('exercice', {
          value: exerciceId,
        })}
      />
      {watch('canva_url')?.length > 0 && !isValidUrl(watch('canva_url')) && (
        <Loading color="warning" />
      )}
      {isValidUrl(watch('canva_url')) && (
        <iframe
          className="h-96"
          loading="lazy"
          src={watch('canva_url') + '?embed'}
          allowFullScreen
          allow="fullscreen"></iframe>
      )}
      <div>
        <label>Digite a desccrição.</label>
        <textarea rows={10} {...register('descricao')} />
      </div>
      <section className="flex flex-row gap-2">
        <button className="sucess">Salvar</button>
        <button className="danger" onClick={() => removeOne(exerciceId)}>
          <FiTrash size={24} />
        </button>
      </section>
    </FormCourse>
  );
};

const Text = ({ id, exerciceId, index, data }: any) => {
  const { register, handleSubmit, watch, reset } = useForm();

  useEffect(() => {
    reset(data);
  }, []);

  const submit = (data: any) => {
    data['id'] = id;
    data['exercice'] = exerciceId;
    data['index'] = index;
    api
      .patch(`/course/${id}`, data)
      .then((res) => {
        sessionStorage.setItem('curso', JSON.stringify(res.data));
        // window.location.reload();
      })
      .catch(console.warn);
    // window.location.reload();
  };

  const removeOne = (exercice: string) => {
    console.log(exercice, index);
    api
      .patch(`/course/removeone/${id}`, {
        exercice: exercice,
        index: index,
      })
      .then((res) => {
        //window.location.reload();
      })
      .catch(console.warn);
  };

  return (
    <FormCourse onSubmit={handleSubmit(submit)}>
      <div>
        <label>Digite o texto de apresentação/introdução.</label>
      </div>
      <textarea {...register('text')} rows={10}></textarea>
      <input
        type="text"
        {...register('type', {
          value: 'texto',
        })}
        hidden
      />
      <input
        type="text"
        hidden
        {...register('id', {
          value: id,
        })}
      />
      <input
        type="text"
        hidden
        {...register('exercice', {
          value: exerciceId,
        })}
      />
      <section className="flex flex-row gap-2">
        <button className="sucess">Salvar</button>
        <button className="danger" onClick={() => removeOne(exerciceId)}>
          <FiTrash size={24} />
        </button>
      </section>
    </FormCourse>
  );
};
