import { Loading } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

import api from '../../../config/api';

interface AulaInauguralProps {
  id: any;
  idModuleOne: any;
  setIdModule: (moduleId: any) => void;
}

export default function AulaInaugural({
  id,
  idModuleOne,
  setIdModule,
}: AulaInauguralProps) {
  const [data, setData] = useState<any>({});
  const [videoWatched, setVideoWatched] = useState(false);

  useEffect(() => {
    const course = JSON.parse(sessionStorage.getItem('course') || '{}');
    setData(course);
  }, []);

  const submit = () => {
    api
      .patch(
        `/user/course/update/${id}`,
        {
          id,
          type: 'aula_inalgural',
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  function extractVideoCodeFromUrl(url = '..') {
    var match = url.match(/(?:\/|%3D|v=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/);
    return match ? match[1] : '';
  }

  return (
    <div className="bg-white rounded p-5 m-4 gap-6 shadow flex flex-col">
      <h2 className="font-semibold text-2xl">Aula Inaugural</h2>
      <span>{data['description']}</span>
      <span>
        Assista a nossa aula Inaugural e conheça mais sobre o curso de{' '}
        {data.title}
      </span>
      <YouTube
        className="self-center"
        videoId={extractVideoCodeFromUrl(data['first_class'])}
        onEnd={() => {
          setVideoWatched(true);

          submit();
        }}
      />
      <span className="self-center text-slate-500">
        Assista até o final do video para a aula ser concluída.
      </span>
      {videoWatched && (
        <span className="text-emerald-500 font-semibold text-lg">
          Aula concluída
        </span>
      )}
      <button
        onClick={() => setIdModule(idModuleOne)}
        className="bg-emerald-500 text-white font-semibold w-fit px-4 py-2 rounded mt-2">
        Próximo
      </button>
    </div>
  );
}
