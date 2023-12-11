import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import Image from 'next/image';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { useAlert } from 'react-alert';
import api from '../../../config/api';

import { TabsStyle } from '../../../styles/layout/styles';
import Questoes from './Questoes';

export default function Atividade({ test, id, moduleId, index }: any) {
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(1);
  const [activities, setActivities] = useState<any[]>([{ id: '2e', data: [] }]);
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    const courseData = JSON.parse(sessionStorage.getItem('course') || '{}');
    setActivities(courseData.questoes || []);
  }, []);

  const renderActivity = (activity: any, index: number) => {
    const idRef = router.asPath.split('/')[router.asPath.split('/').length - 1];

    const aulaDados = JSON.parse(sessionStorage.getItem('user_course') || '{}');

    if (activity.type == 'aula') {
      return (
        <div className="flex flex-col w-full">
          <Aula
            id={idRef}
            exerciceId={moduleId}
            index={index}
            data={activity}
            concluido={
              aulaDados.activities.find(
                (item: any) => item.module_id == moduleId
              ).concluido
            }
          />
        </div>
      );
    } else if (activity.type == 'canva') {
      return (
        <div className="flex flex-col w-full">
          <Canva
            id={idRef}
            exerciceId={moduleId}
            index={index}
            data={activity}
            concluido={
              aulaDados.activities.find(
                (item: any) => item.module_id == moduleId
              ).concluido
            }
          />
        </div>
      );
    } else if (activity.type == 'texto' || activity.type == 'leitura') {
      return (
        <div className="flex flex-col w-full">
          <Texto
            id={idRef}
            exerciceId={moduleId}
            index={index}
            data={activity}
            concluido={
              aulaDados.activities.find(
                (item: any) => item.module_id == moduleId
              ).concluido
            }
          />
        </div>
      );
    } else if (activity.type == 'atividade') {
      return (
        <Questoes
          id={idRef}
          exerciceId={moduleId}
          index={index}
          data={activity}
        />
      );
    }
  };

  return (
    <div className="flex flex-col">
      <TabsStyle>
        <div className="p-5">
          <Tabs
            className="tabs"
            disabledTabClassName="disabled-tab"
            selectedTabClassName="abled-icon"
            onSelect={(index) => setSelectedExercise(index)}>
            <TabList className="tab-label">
              {activities
                .find((item: any) => item.id == moduleId)
                ?.data.map(
                  (item: any, index: number) =>
                    item?.type &&
                    item?.type !== 'not' && (
                      <Tab className="tab-icons" key={String(index * 17)}>
                        {item.type === 'aula' && (
                          <Image
                            src="/icons/video.png"
                            alt="Aula"
                            width={45}
                            height={30}
                            style={{ objectFit: 'cover' }}
                          />
                        )}

                        {item.type === 'atividade' && (
                          <Image
                            src="/icons/atividades.png"
                            alt="Aula"
                            width={45}
                            height={30}
                          />
                        )}

                        {(item.type === 'texto' || item.type === 'leitura') && (
                          <Image
                            src="/icons/aula.png"
                            alt="Aula"
                            width={45}
                            height={30}
                          />
                        )}

                        {item.type === 'canva' && (
                          <Image
                            src="/icons/video.png"
                            alt="Aula"
                            width={45}
                            height={30}
                          />
                        )}
                      </Tab>
                    )
                )}
            </TabList>
            {activities
              .find((item: any) => item.id == moduleId)
              ?.data.map(
                (aula: any, index: number) =>
                  aula?.type &&
                  aula?.type !== 'not' && (
                    <TabPanel key={String(index * 910)}>
                      <div className="rounded bg-white w-full shadow-sm p-5">
                        {renderActivity(aula, index)}
                      </div>
                    </TabPanel>
                  )
              )}
          </Tabs>
        </div>
      </TabsStyle>
    </div>
  );
}

function extractVideoCodeFromUrl(url = '..') {
  var match = url.match(/(?:\/|%3D|v=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/);
  return match ? match[1] : '';
}

export function Aula({ id, exerciceId, index, data, concluido = false }: any) {
  const submit = () => {
    api
      .patch(
        `/user/course/update/${id}`,
        {
          activity_id: exerciceId,
          id,
          index,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem('user_course', JSON.stringify(res.data));
      });
  };

  return (
    <div className="flex flex-col gap-6  w-full items-center justify-center my-5">
      {concluido && (
        <span className="text-lg text-emerald-500">Aula concluida</span>
      )}
      {!concluido && <span className="text-lg">Aula não concluida</span>}
      <span className="">{data['descricao']}</span>
      <YouTube
        className="self-center"
        videoId={extractVideoCodeFromUrl(data['aula_url'])}
        onEnd={submit}
      />
      <span className="self-center text-slate-500">
        Assista até o video terminar para a aula ser concluida.
      </span>
    </div>
  );
}

export const Canva = ({
  id,
  exerciceId,
  index,
  data,
  concluido = false,
}: any) => {
  const submit = () => {
    api
      .patch(
        `/user/course/update/${id}`,
        {
          activity_id: exerciceId,
          id,
          index,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem('user_course', JSON.stringify(res.data));
      });
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center justify-center my-5">
      {concluido && (
        <span className="text-lg text-emerald-500">Aula concluida</span>
      )}
      {!concluido && <span className="text-lg">Aula não concluida</span>}
      <span>{data['descricao']}</span>
      <iframe
        className="h-96 w-full"
        loading="lazy"
        src={data['canva_url'] + '?embed'}
        allowFullScreen
        allow="fullscreen"></iframe>
      <button
        className="rounded text-white font-semibold bg-emerald-500 w-fit px-4 py-2"
        onClick={submit}>
        Concluir
      </button>
    </div>
  );
};

export const Texto = ({
  id,
  exerciceId,
  index,
  data,
  concluido = false,
}: any) => {
  const alert = useAlert();
  const submit = () => {
    api
      .patch(
        `/user/course/update/${id}`,
        {
          activity_id: exerciceId,
          id,
          index,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem('user_course', JSON.stringify(res.data));
        alert.success('aula concluida, va para a proxima');
        concluido = true;
      });
  };
  return (
    <div className="flex flex-col gap-6  w-full items-center justify-center my-5">
      {concluido && (
        <span className="text-lg text-emerald-500">Aula concluida</span>
      )}
      {!concluido && <span className="text-lg">Aula não concluida</span>}
      <span>{data['text']}</span>
      <button
        className={`rounded text-white font-semibold ${
          concluido ? 'bg-gray-300 cursor-default' : 'bg-emerald-500'
        } w-fit px-4 py-2`}
        onClick={concluido ? undefined : submit}
        disabled={concluido}>
        {concluido ? 'Concluído' : 'Concluir'}
      </button>
    </div>
  );
};
