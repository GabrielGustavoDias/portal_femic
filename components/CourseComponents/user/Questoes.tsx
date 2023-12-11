import { useEffect, useState } from 'react';

export default function Questoes({ id, exerciceId, index, data }: any) {
   const [questoes, setQuestoes] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState<any[]>([]);
  const [respostasCorretas, setRespostasCorretas] = useState<any[]>([]);
  const [mostrarRespostas, setMostrarRespostas] = useState(false);

  useEffect(() => {
    setQuestoes(data.quest);
    setRespostasCorretas(data.quest.map((questao: any) => questao.resposta));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const respostas = questoes.map((questao: any, index: number) => ({
      enunciado: questao.enunciado,
      resposta: questao.type === 'mult' ? e.target[`questao_${questao.id}`].value : e.target[`questao_${questao.id}`].value.trim(),
      correta: questao.type === 'mult' && e.target[`questao_${questao.id}`].value === questao.resposta
    }));

    setRespostasUsuario(respostas);
    setMostrarRespostas(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questoes.map((questao: any, index: number) => (
        <div key={questao.id} className={`mt-2 ${questao.type === 'mult' && !questao.correta ? 'errada' : ''}`}>
          <h3>Questão {index + 1}</h3>
          <p className="font-regular text-lg my-2">{questao.enunciado}</p>
          {questao.type === 'mult' && (
            <div>
              {questao.alternativas.map((alternativa: any, altIndex: number) => (
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
            <div className='w-full'>
              <textarea className="w-full border rounded bg-slate-100 p-2" name={`questao_${questao.id}`} rows={4} required />
            </div>
          )}
          {mostrarRespostas && questao.type === 'mult' && respostasUsuario[index].resposta !== questao.resposta &&  (
            <p className="text-red-600">Resposta Errada! Tente novamente.</p>
          )}
        </div>
      ))}
      <button className="bg-emerald-500 text-white w-fit px-4 py-2 rounded font-semibold" type="submit">Enviar Respostas</button>
    </form>
  );
}
