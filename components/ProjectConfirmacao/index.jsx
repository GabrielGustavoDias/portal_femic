import { Tooltip } from '@nextui-org/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import api, { baseUrl } from '../../config/api';
import { IProject } from '../../types/project';

// interface IProjectConfirm {
// 	project: IProject;
// }

const ProjectConfirmacao = ({ project }) => {
  const [url, setUrl] = useState(project.link_yt);

  const alert = useAlert();

  const updateUrl = () => {
    api
      .patch(`admin/projects/update/${project._id}`, {
        link_yt: url,
      })
      .then((res) => {
        alert.success('URL atualizada');
      })
      .catch((err) => {
        alert.error('Ocorreu um erro ao alterar');
      });
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>Confirmação de participação</h1>
      <label>Resumo cientifico atualizado</label>
      <textarea
        className="rounded p-2 border"
        defaultValue={project.resume}
        rows={5}></textarea>
      <label>Palavras-chaves atualizadas</label>
      <span className="sub-label">
        {project.keywords.map((key) => key).join(',')}
      </span>
      <label>Breve descrição do projeto</label>
      <span className="sub-label">{project.short_desc}</span>
      <Tooltip
        color="invert"
        content="ideal é o link clicando no botão compartilhar, não o link copiado da url">
        <label htmlFor="">
          Link do vídeo de apresentação do projeto no YouTube
        </label>
      </Tooltip>
      <span className="sub-label flex gap-4">
        <input
          className="h-8 px-2"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={updateUrl} className="text-black">
          atualizar
        </button>
      </span>
      <label htmlFor="">Pôster/banner científico do projeto</label>
      <a
        href={`${baseUrl}/project/docs/${project.banner}`}
        download
        target="_blank"
        rel="noreferrer">
        {project.banner}
      </a>
      <label htmlFor="">Relatório e Resumo científico</label>
      <a
        href={`${baseUrl}/project/docs/${project.relatorio}`}
        download
        target="_blank"
        rel="noreferrer">
        {project.relatorio}
      </a>
    </div>
  );
};

export default ProjectConfirmacao;
