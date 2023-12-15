import {
  useForm,
  useFieldArray,
  Controller,
  useController,
} from 'react-hook-form';

import { FiPlus, FiTrash } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { FormCourse, Exercices } from '../../styles/admin/styles.module';
import api from '../../config/api';

export default function Questoes({ id, exerciceId, index, data }) {
  const [questType, setQuestType] = useState('');
  const { watch, reset, register, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quest',
  });

  useEffect(() => {
    const curso = JSON.parse(sessionStorage.getItem('curso') || '{}');
    const indexQuests = curso['questoes'].findIndex(
      (quest) => quest.id == exerciceId
    );
    if (curso['questoes'][indexQuests].data[index]?.quest?.length > 0) {
      reset({ quest: curso['questoes'][indexQuests].data[index].quest });
    }
  }, []);

  const submit = (data) => {
    data['type'] = 'atividade';
    data['exercice'] = exerciceId;
    data['index'] = index;
    data['id'] = id;

    api
      .patch(`/course/${id}`, data)
      .then((res) => {
        alert(
          'Salvo com sucesso, caso não esteja vendo sua edição atualize a página.'
        );
        sessionStorage.setItem('curso', JSON.stringify(res.data));
      })
      .catch(console.warn);
  };

  const addQuest = () => {
    console.log(questType);
    if (questType.length < 1) {
      alert('Escolha um tipo de questão');
      return;
    }
    append({ id: String(new Date().getTime()), type: String(questType) }); // adiciona um novo item no array

    setQuestType('');
  };

  const renderQuests = (item, index) => {
    if (item.type == 'mult') {
      return <MultQuest index={index} control={control} />;
    }
    if (item.type == 'open') {
      return <OpenQuest index={index} control={control} />;
    }
  };

  const removeOne = (exercice) => {
    api
      .patch(`/course/removeone/${id}`, {
        exercice: exerciceId,
        index: index,
      })
      .then((res) => {
        window.location.reload();
        console.log(res.data);
      })
      .catch(console.warn);
  };

  return (
    <FormCourse onSubmit={handleSubmit(submit)}>
      {fields.map((item, index) => (
        <div key={item.id} className="mt-2">
          {renderQuests(item, index)}
          <button
            type="button"
            className="danger ml-2"
            onClick={() => remove(index)}>
            Remover Questão
          </button>
        </div>
      ))}
      <div className="gap-2">
        <label>Qual tipo de questão?</label>
        <select
          value={questType}
          onChange={(e) => setQuestType(e.target.value)}>
          <option value="" selected disabled>
            Selecione aqui
          </option>
          <option value="mult">Multipla escolha</option>
          <option value="open">Questão aberta</option>
        </select>
        <button type="button" className="sucess" onClick={addQuest}>
          Adicionar Questão
        </button>
      </div>
      <section className="flex flex-row gap-2">
        <button className="sucess">Salvar</button>
        <button className="danger" onClick={() => removeOne(exerciceId)}>
          <FiTrash size={24} />
        </button>
      </section>
    </FormCourse>
  );
}

const OpenQuest = ({ index = 0, control }) => {
  const questaoPrefix = `quest[${index}]`;

  const { field } = useController({
    name: `${questaoPrefix}.enunciado`,
    control,
    defaultValue: '',
  });

  return (
    <div className="flex flex-col mb-2 ml-1">
      <label className="sub">Digite aqui a sua pergunta:</label>
      <Controller
        name={`${questaoPrefix}.enunciado`}
        control={control}
        defaultValue=""
        render={({ field }) => <textarea {...field} rows={4} />}
      />
    </div>
  );
};

const MultQuest = ({ index = 0, control }) => {
  const questaoPrefix = `quest[${index}]`;

  const { field } = useController({
    name: `${questaoPrefix}.enunciado`,
    control,
    defaultValue: '',
  });

  const { field: respostaField } = useController({
    name: `${questaoPrefix}.resposta`,
    control,
    defaultValue: 0,
  });

  return (
    <div>
      <div className="flex flex-col mb-2 ml-1">
        <Controller
          name={`${questaoPrefix}.enunciado`}
          control={control}
          defaultValue=""
          render={({ field }) => <textarea {...field} rows={4} />}
        />
      </div>

      {[0, 1, 2, 3].map((moduleIndex) => (
        <div key={moduleIndex} className="flex gap-2 my-2">
          <span>{String.fromCharCode(97 + moduleIndex)}&#41; </span>
          <Controller
            name={`${questaoPrefix}.alternativas.${moduleIndex}`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input {...field} placeholder={`Resposta ${moduleIndex + 1}`} />
            )}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <label htmlFor={`${questaoPrefix}.resposta`}>Resposta correta:</label>
        <Controller
          name={`${questaoPrefix}.resposta`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field} className="w-16">
              {[0, 1, 2, 3].map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                  {String.fromCharCode(97 + optionValue)}&#41;
                </option>
              ))}
            </select>
          )}
        />
      </div>
    </div>
  );
};
