import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';

import { FormCourse } from '../../styles/admin/styles.module';
// import { IQuestion } from '../../types/course';
import api from '../../config/api';
import { TextEdit } from '../InputFormater';

// interface IProps {
//   id: string;
//   data: IQuestion[];
// }

export default function Avaliacao({ id, data }) {
  const { register, handleSubmit, setValue, reset } = useForm();

  const alert = useAlert();

  const handleQuillChange = (field, value) => {
    setValue(field, value);
  };

  useEffect(() => {
    if (data && data.length >= 1) {
      reset({ avaliacao: data });
    }
  }, [data]);

  const submit = (data) => {
    api
      .patch(`/course/${id}`, data)
      .then((res) => {
        alert.success('Avaliação atualizada');
        window.location.reload();
      })
      .catch(console.warn);
  };

  const renderQuestions = (index) => {
    const questao = data && data[index]; 
    const questaoPrefix = `avaliacao[${index}]`;

    return (
      <div key={index}>
        <div className="flex flex-col mb-2 ml-1">
          <label htmlFor={`${questaoPrefix}.enunciado`}>
            Questão {index + 1}
          </label>
          <TextEdit
            className="rounded border"
            placeholder={'Enunciado da questão'}
            id={`${questaoPrefix}.enunciado`}
            onQuillChange={(value) =>
              handleQuillChange(`${questaoPrefix}.enunciado`, value)
            }
            defaultValue={questao ? questao.enunciado : ''}
          />
          {/* <textarea
            rows={4}
            className="rounded border"
            id={`${questaoPrefix}.enunciado`}
            placeholder="Enunciado da questão"
            {...register(`${questaoPrefix}.enunciado`)}
          /> */}
        </div>

        {[0, 1, 2, 3].map((moduleIndex) => (
          <div key={moduleIndex} className="flex gap-2 my-2">
            <span>{String.fromCharCode(97 + moduleIndex)}&#41; </span>
            <input
              placeholder={`Resposta ${moduleIndex + 1}`}
              {...register(`${questaoPrefix}.alternativas.${moduleIndex}`)}
            />
          </div>
        ))}

        <div className="flex gap-2 mt-2">
          <label htmlFor={`${questaoPrefix}.resposta`}>Resposta correta:</label>
          <select
            id={`${questaoPrefix}.resposta`}
            className="w-16"
            {...register(`${questaoPrefix}.resposta`)}>
            {[0, 1, 2, 3].map((optionValue) => (
              <option key={optionValue} value={optionValue}>
                {String.fromCharCode(97 + optionValue)}&#41;
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <FormCourse onSubmit={handleSubmit(submit)}>
      {Array.from({ length: 10 }).map((_, index) => renderQuestions(index))}
      <input
        type="text"
        {...register('type', {
          value: 'avaliation',
        })}
        hidden
      />
      <button type="submit" className="sucess mt-2">
        Salvar
      </button>
    </FormCourse>
  );
}
