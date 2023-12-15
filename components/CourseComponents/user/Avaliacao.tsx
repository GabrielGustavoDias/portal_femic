import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';

import api from '../../../config/api';

export default function Atividade({ id, data }: any) {
  const [err, setErr] = useState(['']);
  const [tries, setTries] = useState(0);
  const [evaluationCompleted, setEvaluationCompleted] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    const dataStr = sessionStorage.getItem('user_course');
    const data = JSON.parse(dataStr || '{}');
    setTries(data.tentativas);
    setEvaluationCompleted(data.complete);
  }, []);

  const { register, handleSubmit } = useForm();

  const submit = (data: any) => {
    const dataStr = sessionStorage.getItem('user_course');
    const dataUsr = JSON.parse(dataStr || '{}');

    if (dataUsr.complete) {
      alert.show('Você ja concluiu esse curso');
      if (evaluationCompleted) {
        window.location.reload();
      }
      return;
    }

    data['id'] = id;
    api
      .patch(`/user/avaliacao/curso`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setErr(res.data.erros);
        setTries(res.data.user.tentativas);
        sessionStorage.setItem('user_course', JSON.stringify(res.data.user));
        if (res.data.erros.length < 1) {
          alert.success('Você concluiu o curso!');
        }
        console.log(res.data.erros);
      });
  };

  return (
    <div className="flex w-full bg-white rounded p-5 flex-col mb-5">
      <div className="flex w-full my-5 flex-row justify-between itens-center">
        <span className="text-3xl">Avaliação</span>
        <span className="text-slate-800">Tentativas: {tries}</span>
      </div>
      {evaluationCompleted ? (
        <button className="bg-gray-400 text-white w-fit px-4 py-2 rounded font-semibold">
          Avaliação Concluída
        </button>
      ) : (
        <>
          <p className="my-5 text-slate-800 whitespace-pre-line leading-7">
            Caro(a) Cursista, <br />
            A avaliação final contempla 10 questões de múltipla escolha que
            abrangem o conteúdo abordado neste curso. <br />
            Leia atentamente os enunciados e escolha uma resposta para cada
            questão. Após escolher uma alternativa de uma questão, aperte o
            botão "Enviar" para que essa questão seja respondida. Ao terminar de
            responder as questões, aperte o botão "Finalizar Minha Avaliação" no
            fim da página. <br />
            Você precisará obter um aproveitamento mínimo de 70% nas questões
            para aprovação. <br />
            Caso você obtenha pelo menos 70% de acertos, será gerado
            automaticamente um Certificado de Conclusão, que estará disponível
            na sua página de Certificados. <br />
            Se você não alcançar a pontuação necessária para a obtenção do
            Certificado, você poderá fazer uma nova avaliação. Você poderá
            realizar tantas tentativas quanto precisar. <br />
            Boa avaliação!
          </p>
          <form onSubmit={handleSubmit(submit)}>
            {data.map((questao: any, index: number) => (
              <div key={index} className="mb-12 bg-emerald-100 p-2 rounded">
                <h3>Questão {index + 1}/10</h3>
                {err.includes(String(index)) && (
                  <span className="text-red-500 ">Resposta errada</span>
                )}
                <span dangerouslySetInnerHTML={{ __html: questao.enunciado }} />
                <div>
                  {questao.alternativas.map(
                    (alternativa: any, alternativaIndex: number) => (
                      <div className="my-2" key={alternativaIndex}>
                        <label className="hover:bg-slate-100 p-2 rounded cursor-pointer">
                          <input
                            className="mx-1"
                            type="radio"
                            value={alternativaIndex}
                            required
                            {...register(`respostas[${index}]`)}
                          />
                          {String.fromCharCode(97 + alternativaIndex)}&#41;{' '}
                          {alternativa}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
            <button
              className="bg-emerald-500 text-white w-fit px-4 py-2 rounded font-semibold"
              type="submit">
              Enviar
            </button>
          </form>
        </>
      )}
    </div>
  );
}
