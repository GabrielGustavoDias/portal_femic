import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import AdminLayout from '../../../styles/layout/admin';
import { FormCourse } from '../../../styles/admin/styles.module';

import api, { baseUrl } from '../../../config/api';
import { GetServerSideProps } from 'next';

export default function Cursos({ course }: any) {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'modulos',
  });

  const router = useRouter();

  const addModule = () => {
    append({ id: String(new Date().getTime()) });
  };

  const onSubmit = (data: any) => {
    if (course._id) {
      delete data['modulos'];
      data['type'] = 'infos';
      api
        .patch(`/course/${course._id}`, data)
        .then((res) => router.push(`/admin/curso/modulos/${course._id}`))
        .catch((err) => console.warn(err));
    } else {
      api
        .post('/course', data)
        .then((res) => {
          router.push(`/admin/curso/modulos/${res.data._id}`);
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <AdminLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">Dados do curso</h1>
        <FormCourse onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Titulo do curso</label>
            <span className="sub">
              Mínimo de 25 e máximo de 50 caracteres com espaço.
            </span>
            <input
              type="text"
              placeholder="Titulo"
              {...register('title', {
                value: course.title,
              })}
              required
            />
          </div>
          <div>
            <label>Sobre o Curso</label>
            <span className="sub">
              Mínimo de 150 e máximo de 300 caracteres com espaço.
            </span>
            <textarea
              rows={3}
              {...register('about', {
                value: course.about,
              })}
              required></textarea>
          </div>
          {/* <div>
            <label>Público-alvo</label>
            <span className="sub">Máximo de 300 caracteres com espaço. </span>
            <textarea
              rows={3}
              {...register('public', {
                value: course.public,
              })}
              required></textarea>
          </div> */}
          <div>
            <label>Selecione o público-alvo do curso</label>
            <select
              {...register('public', {
                value: course.public,
              })}
              required>
              <option value="junior" selected>
                Júnior
              </option>
              <option value="jovem">Jovem</option>
              <option value="prof">Mais</option>
              <option value="crc">CRC</option>
              <option value="avaliador">Avaliador</option>
            </select>
          </div>
          <div>
            <label>Objetivos</label>
            <span>
              Mínimo de 300 e máximo de 800 caracteres com espaço. Apresente o
              objetivo geral e os objetivos específico.
            </span>
            <textarea
              rows={3}
              {...register('objectives', {
                value: course.objectives,
              })}
              required>
              {course?.objectives}
            </textarea>
          </div>
          <div>
            <label>Estrutura Curricular</label>
            <span className="sub">
              Adicione os módulos formativos, conforme ementa do curso.{' '}
            </span>
            {fields.map((item: any, index) => (
              <div key={item.id} className="mt-2">
                <input
                  type="text"
                  {...register(`modulos.${index}.name`, {
                    value: course.modulos,
                  })}
                  defaultValue={item.name}
                />
                <button
                  type="button"
                  className="danger ml-2"
                  onClick={() => remove(index)}>
                  Remover
                </button>
              </div>
            ))}
            {course._id ? (
              <></>
            ) : (
              <button type="button" className="sucess mt-2" onClick={addModule}>
                Adicionar módulo
              </button>
            )}
          </div>
          <div>
            <label>Nível de dificuldade</label>
            <span className="sub">
              Especifique de acordo com os objetivos de aprendizagem do curso.{' '}
            </span>
            <select
              {...register('dificult', {
                value: course.dificult,
              })}
              required>
              <option>Básico</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>
          </div>
          <div>
            <label>Duração do curso</label>
            <span className="sub">
              Mínimo de 8 horas e máximo de 100 horas. Especifique de acordo com
              o quantitativo de atividades nos módulos formativos do curso.
            </span>
            <input
              type="number"
              min={0}
              {...register('time', {
                value: course.time,
              })}
              placeholder="60"
            />
          </div>
          <div>
            <label>Vídeo de apresentação</label>
            <span className="sub">Link do vídeo no youtube.</span>
            <input
              type="url"
              {...register('presentation_video', {
                value: course.presentation_video,
              })}
              required
              placeholder="Link do vídeo no youtube"
            />
          </div>
          <button type="submit" className="sucess self-center text-xl">
            {course._id ? 'Salvar' : 'Criar novo curso'}
          </button>
        </FormCourse>
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  if (id == 'new') {
    return {
      props: {
        course: {
          title: '',
          about: '',
          public: '',
          objective: '',
          modulos: [''],
          dificult: '',
          presentation_video: '',
          time: 0,
        },
      },
    };
  }

  const courseData = await fetch(`${baseUrl}/course/${id}`);
  const data = await courseData.json();

  return {
    props: {
      course: data,
    },
  };
};
