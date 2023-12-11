import { FiFilePlus, FiTrash } from 'react-icons/fi';
import {
  CourseContainer,
  CreateCourse,
  FormQuery,
} from '../../styles/admin/styles.module';
import AdminLayout from '../../styles/layout/admin';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import Link from 'next/link';
import { ICourse } from '../../types/course';

export default function Cursos() {
  const [cursos, setCursos] = useState<ICourse[] | []>();
  const [count, setCount] = useState(1);
  const router = useRouter();

  useEffect(() => {
    api.get('/course?adm=true').then((res) => {
      setCursos(res.data);
    });
  }, []);

  const deleteCourse = (id: string) => {
    const ok = confirm('Certeza que deseja apagar o curso?');
    if (ok) {
      api
        .delete(`/course/${id}`)
        .then(() => window.location.reload())
        .catch(console.warn);
    }
  };

  return (
    <AdminLayout>
      <CreateCourse>
        <div className="head">
          <FiFilePlus size={24} color="#333" />
        </div>
        <button
          onClick={() => router.push('/admin/curso/create')}
          className="button">
          Criar Novo Curso
        </button>
      </CreateCourse>
      <FormQuery>
        <div className="flex flex-col"></div>
      </FormQuery>
      {cursos?.map((curso: ICourse) => (
        <CourseContainer key={curso._id}>
          <div id="div_image">
            <img src="/default.png" alt="default banner" />
            <div>
              <h4>{curso.title}</h4>
              <span>{curso.published ? 'Ativo' : 'Em planejamento'}</span>
            </div>
          </div>

          <div id="div_course_duration">
            <h4>Duração do curso</h4>
            <span>{curso.time} horas</span>
          </div>

          <div className="flex gap-2">
            <Link href={`/admin/curso/modulos/${curso._id}`} passHref>
              <a>Ver curso</a>
            </Link>
            <button onClick={() => deleteCourse(curso._id)} className="danger">
              <FiTrash size={24} />
            </button>
          </div>
        </CourseContainer>
      ))}
    </AdminLayout>
  );
}
