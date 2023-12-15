import { useForm } from 'react-hook-form';
import { Loading } from '@nextui-org/react';
import { useEffect } from 'react';
import { FormCourse } from '../../styles/admin/styles.module';
import api from '../../config/api';
import { TextEdit } from '../InputFormater';
import { useAlert } from 'react-alert';

// interface IProps {
//   id: string;
//   data: string;
// }

export default function AulaInaugural({ id, data }) {
  const { register, control, handleSubmit, reset, setValue, watch } = useForm();
  const alert = useAlert();

  const handleQuillChange = (field, value) => {
    setValue(field, value);
  };

  useEffect(() => {
    reset({
      description: data,
      first_class: String(sessionStorage.getItem('aux_first_class') || ''),
    });
  }, []);

  const submit = (data) => {
    sessionStorage.setItem('aux_first_class', data['first_class']);
    api
      .patch(`/course/${id}`, data)
      .then((res) => {
        console.log(res.data);
        alert.success('Aula inaugural salva com sucesso!');
        window.location.reload();
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
        <TextEdit
          placeholder={
            'Digite o texto que irá aparecer na tela de apresentação do curso.'
          }
          onQuillChange={(value) => handleQuillChange('description', value)}
        />
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
