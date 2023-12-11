import { useForm } from 'react-hook-form';
import { Loading } from '@nextui-org/react';
import { useEffect } from 'react';
import { FormCourse } from '../../styles/admin/styles.module';
import api from '../../config/api';

interface IProps {
  id: string;
  data: string;
}

export default function AulaInaugural({ id, data }: IProps) {
  const { register, control, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    reset({
      description: data,
      first_class: String(sessionStorage.getItem('aux_first_class') || ''),
    });
  }, []);

  const submit = (data: any) => {
    sessionStorage.setItem('aux_first_class', data['first_class']);
    api
      .patch(`/course/${id}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch(console.warn);
  };
  
  function extractVideoCodeFromUrl(url = '..') {
    var match = url.match(/(?:\/|%3D|v=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/);
    return match ? match[1] : null;
  }

  return (
    <FormCourse onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="">Digite a descrição.</label>
        <span className="sub">
    Digite o texto que irá aparecer na tela de apresentação do curso.
        </span>
        <textarea required {...register('description')} rows={4}></textarea>
      </div>
      <input type="text" {...register('type')} hidden value="aula_inaugural" />
      <div>
        <label>Digite o link da aula no Youtube</label>
        <input type="url" {...register('first_class')} />
      </div>
      {!extractVideoCodeFromUrl(watch('first_class')) &&
          !watch('first_class') && <span>Videoaula aparecerá aqui.</span>}
      {!extractVideoCodeFromUrl(watch('first_class')) &&
        watch('first_class')?.length > 0 && <Loading color="warning" />}
      {extractVideoCodeFromUrl(watch('first_class')) && (
        <iframe
          width="50%"
          height="350px"
          onLoad={(e) =>
            (e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px')
          }
          src={
            'https://youtube.com/embed/' +
            extractVideoCodeFromUrl(watch('first_class'))
          }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      )}

      <button type="submit" className="sucess mt-2">
        Salvar
      </button>
    </FormCourse>
  );
}
