import { Checkbox, Tooltip } from '@nextui-org/react';
import { ListUsers, Table } from '../../styles/projetos/styles.module';
// import { IEvaluation2, IEvaluation } from '../../types/project';

// interface Props {
// 	project: any;
// }

const columns = [
  {
    key: 'name',
    label: 'Avaliadores',
    value: 'Nome dos avaliadores',
  },
  {
    key: 'nota1',
    label: 'Criatividade',
    value: 'Criatividade e Inovação',
  },
  {
    key: 'nota2',
    label: 'Pesquisa',
    value: 'Profundidade da pesquisa',
  },
  {
    key: 'nota3',
    label: 'Clareza',
    value: 'Clareza e objetivo',
  },
  {
    key: 'nota4',
    label: 'Metodologia',
    value: 'Uso da metodologia científica',
  },
  {
    key: 'nota5',
    label: 'Aplicabilidade',
    value: 'Aplicabilidade dos resultados no cotidiano da sociedade',
  },
  {
    key: 'nota6',
    label: 'Relevância',
    value: 'Temática com relevância social',
  },
  {
    key: 'total',
    label: 'Total',
    value: 'Nota total dada pelo avaliador',
  },
];

const columns2 = [
  {
    key: 'name',
    label: 'Avaliadores',
    value: 'Nome dos avaliadores',
  },
  {
    key: 'nota1',
    label: 'Criatividade',
    value: 'Criatividade e Inovação',
  },
  {
    key: 'nota2',
    label: 'Pesquisa',
    value: 'Profundidade da pesquisa',
  },
  {
    key: 'nota3',
    label: 'Resumo',
    value: 'Relatório e Resumo científico',
  },
  {
    key: 'nota4',
    label: 'Pôster',
    value: 'Pôster científico',
  },
  {
    key: 'nota5',
    label: 'Clareza',
    value: 'Clareza e objetividade na exposição do projeto',
  },
  {
    key: 'nota6',
    label: 'Metodologia',
    value: 'Uso da metodologia científica',
  },
  {
    key: 'nota7',
    label: 'Aplicabilidade',
    value: 'Aplicabilidade dos resultados no cotidiano da sociedade',
  },
  {
    key: 'nota8',
    label: 'Empolgação',
    value:
      'Empolgação e comprometimento dos alunos no momento de apresentação do projeto',
  },
  {
    key: 'total',
    label: 'Total',
    value: 'Nota total dada pelo avaliador',
  },
];
export default function AvaliationView({ project }) {
  const finalAval = project.avaliacao.barema;
  const renderRow = (model) => {
    if (model == 'final') {
      return finalAval.map((item) => (
        <tr key={item.avaliador}>
          <td className="!text-left">{item.avaliador_nome}</td>
          <td className="text-orange-700">{item.nota1}</td>
          <td className="text-orange-700">{item.nota2}</td>
          <td className="text-orange-700">{item.nota3}</td>
          <td className="text-orange-700">{item.nota4}</td>
          <td className="text-orange-700">{item.nota5}</td>
          <td className="text-orange-700">{item.nota6}</td>
          <td className="text-orange-700">{item.nota7}</td>
          <td className="text-orange-700">{item.nota8}</td>
          <td className="text-orange-500">{item.somatorio}</td>
        </tr>
      ));
    }
  };

  const renderMedias = (model) => {
    const data = finalAval;
    const quant = data.length;
    let media6 = 0;

    if (data.length > 0 && model == 'pre') {
      data.forEach((item) => {
        if (item.nota6) {
          media6 += 10;
        }
      });

      return (
        <tr>
          <td>Medias:</td>
          <td>
            {data.map((item) => item.nota1).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota2).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota3).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota4).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota5).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>{media6 / quant}</td>
          <td className="text-orange-100 underline">
            {data.map((item) => item.somatorio).reduce((soma, i) => soma + i) /
              quant}
          </td>
        </tr>
      );
    } else if (data.length > 0 && model == 'final') {
      return (
        <tr>
          <td>Medias:</td>
          <td>
            {data.map((item) => item.nota1).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota2).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota3).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota4).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota5).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota6).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota7).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td>
            {data.map((item) => item.nota8).reduce((soma, i) => soma + i) /
              quant}
          </td>
          <td className="text-orange-100 underline">
            {data.map((item) => item.somatorio).reduce((soma, i) => soma + i) /
              quant}
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div className="px-4">
      <Table>
        <thead>
          <tr>
            {columns2.map((col) => (
              <th key={col.key} className="text-center">
                <Tooltip content={col.value}>{col.label}</Tooltip>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRow('final')}</tbody>
        <tfoot>{renderMedias('final')}</tfoot>
      </Table>
      <span
        className="text-white py-2 px-3"
        style={{ backgroundColor: '#444' }}>
        Somatório: {project.avaliacao.total}
      </span>
      <h1 className="my-4">
        Comentários em relação a avaliação conduzida e/ou recomendações para
        aperfeiçoamento do trabalho.
      </h1>
      {project.avaliacao.barema.map((aval) => (
        <div className="flex flex-col" key={aval.avaliador}>
          <span>{aval.avaliador_nome}</span>
          <span className="w-full py-2 pl-5 rounded bg-slate-200 mb-4">
            {aval.comentario}
          </span>
        </div>
      ))}
      {project?.winner?.win && (
        <div className="flex flex-col">
          <h1>Premiação: </h1>
          <span className="font-semibold">{project.winner.win_text}</span>
          <span className="font-semibold">{project.winner.win_subtext}</span>
        </div>
      )}
    </div>
  );
}
