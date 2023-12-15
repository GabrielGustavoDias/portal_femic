import { useEffect, useState } from 'react';

export default function Questoes({ data }) {
  const [questoes, setQuestoes] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState([]);
  const [respostasErradas, setRespostasErradas] = useState([]);
  const [mostrarRespostas, setMostrarRespostas] = useState(false);

  useEffect(() => {
    setQuestoes(data.quest);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const respostas = questoes.map((questao) => {
      const resposta =
        questao.type === 'mult'
          ? e.currentTarget[`questao_${questao.id}`].value
          : e.currentTarget[`questao_${questao.id}`].value.trim();

      return {
        enunciado: questao.enunciado,
        resposta,
        correta: questao.type === 'mult' && resposta == questao.resposta,
      };
    });

    const resErradas = respostas.filter((questao) => questao.correta === false);

    setRespostasErradas(resErradas);
    setRespostasUsuario(respostas);
    setMostrarRespostas(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questoes.map((questao, index) => (
        <div
          key={questao.id}
          className={`mt-2 ${
            questao.type === 'mult' && !questao.correta ? 'errada' : ''
          }`}>
          <h3>Questão {index + 1}</h3>
          <p className="font-regular text-lg my-2">{questao.enunciado}</p>
          {questao.type === 'mult' && (
            <div>
              {questao.alternativas.map((alternativa, altIndex) => (
                <div key={altIndex} className="my-2 ">
                  <label className="hover:bg-slate-100 p-2 rounded cursor-pointer">
                    <input
                      className="mx-1"
                      type="radio"
                      name={`questao_${questao.id}`}
                      value={altIndex}
                      required
                    />
                    {String.fromCharCode(97 + altIndex)}&#41; {alternativa}
                  </label>
                </div>
              ))}
            </div>
          )}
          {questao.type === 'open' && (
            <div className="w-full">
              <textarea
                className="w-full border rounded bg-slate-100 p-2"
                name={`questao_${questao.id}`}
                rows={4}
                required
              />
            </div>
          )}
          {mostrarRespostas &&
            questao.type === 'mult' &&
            respostasUsuario[index]?.resposta != questao.resposta && (
              <p className="text-red-600">Resposta Errada! Tente novamente.</p>
            )}
          {mostrarRespostas &&
            questao.type === 'mult' &&
            respostasUsuario[index]?.resposta == questao.resposta && (
              <p className="text-emerald-500">Parabéns! Você acertou</p>
            )}
        </div>
      ))}
      <button
        className="bg-emerald-500 text-white w-fit px-4 py-2 rounded font-semibold"
        type="submit">
        Enviar Respostas
      </button>
    </form>
  );
}
