import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LayoutBase from '../../styles/layout/base';

import { Form } from '../../styles/projetos/styles.module';
import api from '../../config/api';

export default function ProjetoInstituicao() {
  const [aditional, setAditional] = useState('');
  const [color, setColor] = useState('');
  const router = useRouter();

  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
  }, []);

  const submitFinalization = (e) => {
    e.preventDefault();
    api
      .post('/project/finalization', {
        aditional_info: aditional,
        id: sessionStorage.getItem('project_id'),
      })
      .then((res) => {
        router.push(`/home/${sessionStorage.getItem('page')}`);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <LayoutBase title="Finalização">
      <Form onSubmit={submitFinalization}>
        <h2>
          Espaço para Informações adicionais e/ou comentários relevantes sobre o
          projeto.
        </h2>
        <span className="alert">Máximo de 1000 caracteres com espaço.</span>
        <textarea
          maxLength={1000}
          onChange={(e) => setAditional(e.target.value)}></textarea>
        <h1 style={{ marginBottom: 20 }}>Termos e condições</h1>
        <label className="confirm">
          <input type="checkbox" required />
          Declaramos que o trabalho submetido para participação na FEMIC (Feira
          Mineira de Iniciação Científica) é original, de única e exclusiva
          autoria das pessoas informadas como membros(as) da equipe e não se
          trata de cópia integral ou parcial de textos e trabalhos de autoria de
          outrem, seja em formato de papel, eletrônico, digital, audiovisual ou
          qualquer outro meio.
        </label>
        <label className="confirm">
          <input type="checkbox" required />
          Declaramos ter total conhecimento e compreensão do que é considerado
          plágio, não apenas a cópia integral do trabalho, mas também de parte
          dele, inclusive de artigos e/ou parágrafos, sem citação do autor ou de
          sua fonte.
        </label>
        <label className="confirm">
          <input type="checkbox" required />
          Declaramos ter ciência e estar de acordo com as Regras e Políticas de
          Privacidade da FEMIC, disponível no site{' '}
          <a
            style={{ marginLeft: 10 }}
            target="_blank"
            href="https://femic.com.br/politica-de-privacidade/"
            rel="noreferrer">
            https://femic.com.br/politica-de-privacidade/
          </a>
          .
        </label>

        <span className="text-2xl font-semibold my-5">
          Sua submissão chegou ao final. Confira atentamente todas as
          informações antes de enviar. Após enviar você não poderá mais editar
          os dados.
        </span>
        <button></button>
        <div className="flex flex-row">
          <Link href="/projetos/etica">
            <a className="button-project" style={{ backgroundColor: color }}>
              Voltar
            </a>
          </Link>
          <button
            className="button-project"
            style={{ backgroundColor: color }}
            type="submit">
            Enviar
          </button>
        </div>
      </Form>
    </LayoutBase>
  );
}
