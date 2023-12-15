/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Loading } from '@nextui-org/react';

import api, { baseUrl } from '../../../config/api';

import LayoutBase from '../../../styles/layout/base';

export default function CursoInfo() {
  const [user, setUser] = useState({});
  const [curso, setCurso] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const path = router.asPath;
      const id = path.split('/')[path.split('/').length - 1];
      const dataCourse = await api.get(`/course/${id}`);
      const dataUser = await api.get(`/user/dashboard`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      setCurso(dataCourse.data);
      setUser(dataUser.data);
      const userCourse = dataUser.data.courses.find(
        (item) => item.id === curso._id
      );
      if (userCourse) {
        sessionStorage.setItem('user_course', JSON.stringify(userCourse));
      }
    };

    fetchData().then(() => setLoading(false));
  }, []);

  function extractVideoCodeFromUrl(url = '..') {
    var match = url.match(/(?:\/|%3D|v=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/);
    return match ? match[1] : null;
  }

  const subscribeCourse = () => {
    api
      .patch(
        `user/course/sign`,
        { course_id: curso._id, date: new Date() },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem('user_course', JSON.stringify(res.data));
        sessionStorage.setItem('course', JSON.stringify(curso));
        router.push(`/curso/${curso._id}`);
      })
      .catch((err) => {
        console.warn(err);
        alert(err.response.data.message);
      });
  };

  const continueCourse = () => {
    if (user.courses.find((item) => item.id == curso._id)) {
      sessionStorage.setItem(
        'user_course',
        JSON.stringify(user.courses.find((item) => item.id == curso._id))
      );
      sessionStorage.setItem('course', JSON.stringify(curso));
      router.push(`/curso/${curso._id}`);
    } else {
      subscribeCourse();
    }
  };

  const openPDFInBrowser = (pdfData) => {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);

    window.open(pdfUrl, '_blank');
  };

  // Exemplo de uso:
  const getCert = async () => {
    try {
      const res = await api.get(
        `/user/avaliacao/certificado?course_name=${curso.title}&course_time=${curso.time}&course_id=${curso._id}&username=${user.name}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          responseType: 'arraybuffer', // Indica que a resposta deve ser tratada como um array de bytes
        }
      );

      openPDFInBrowser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutBase>
      {loading && <Loading />}
      {loading == false && (
        <>
          <img
            src={`${baseUrl}/course/banner/${curso.banner}`}
            alt="Banner do curso"
          />
          <div className="flex items-start justify-between bg-white m-3 p-4 shadow-md rounded gap-4 max-w-[100%]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xl">Titulo</span>
                <span className="text-slate-800 whitespace-normal break-all max-w-3xl">
                  {curso.title}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl">Sobre o curso</span>
                <span className="text-slate-800 whitespace-normal break-all max-w-3xl">
                  {curso.about}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl">Público-alvo</span>
                <span className="text-slate-800">
                  {curso.public.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl">Objetivos</span>
                <span className="text-slate-800 whitespace-normal break-all max-w-3xl">
                  {curso.objectives}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl">Estrutura do Curricular</span>
                <ul>
                  {curso.modulos
                    .slice(1, curso.modulos.length - 1)
                    .map((item) => (
                      <div
                        className="flex gap-1 items-center "
                        key={item.name + '-' + 12}>
                        <li className="flex gap-1 items-center">
                          <div className="w-5 h-5 bg-emerald-500 items-center justify-center"></div>
                          <span>{item.name}</span>
                        </li>
                      </div>
                    ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <iframe
                width={320}
                height={200}
                src={
                  'https://youtube.com/embed/' +
                  extractVideoCodeFromUrl(curso.presentation_video)
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
              <button
                onClick={continueCourse}
                className="w-full h-11 text-center text-white rounded font-semibold bg-emerald-500">
                {user.courses.find((item) => item.id == curso._id)
                  ? 'Continuar'
                  : 'Inscrever-me'}
              </button>
              {user.courses.find((item) => item.id == curso._id)?.complete && (
                <button
                  onClick={getCert}
                  className="w-full h-11 text-center text-white rounded font-semibold bg-yellow-500">
                  Certificado
                </button>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-xl">Duração do curso</span>
                <span className="text-slate-800 max-w-xs">
                  {curso.time} horas
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl">Nível de dificuldade</span>
                <span className="text-slate-800 max-w-xs">
                  {curso.dificult}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl">Certificado</span>
                <span className="text-slate-800  max-w-xs">
                  Certificação digital online.Mediante realização de atividades
                  avaliativas com desempenho mínimo de 70%.{' '}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </LayoutBase>
  );
}
