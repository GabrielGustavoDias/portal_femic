/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps } from 'next';
import { useEffect, useState, createRef } from 'react';
import { FaArrowDown, FaGlobe, FaIdeal, FaSchool } from 'react-icons/fa';
import { ContainerProject } from '../../components/AmostaProjeto/styles';
import CardPeople from '../../components/CardPeople';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

import api, { baseUrl } from '../../config/api';
import { ListUsers } from '../../styles/projetos/styles.module';
import { renderAreaProject } from '../../utils/projects';
import { IProject } from '../../types/project';

// interface IProjetoView {
// 	project: IProject;
// }

export default function Projeto({ project }) {
  const [team, setTeam] = useState({
    team: [{}],
    advisors: [{}],
  });

  function extractVideoCodeFromUrl(url) {
    var match = url.match(/(?:\/|%3D|v=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/);
    return match ? match[1] : null;
  }

  // const ref = createRef();
  useEffect(() => {
    api.get(`/project/team/${project._id}`).then((res) => {
      setTeam(res.data);
    });
    // ref.current.style.width = '50%';
  }, []);

  return (
    <>
      <NavBar />
      <ContainerProject style={{ marginTop: 75 }}>
        <h1 className="title" style={{ color: '#1FB58F', fontSize: 40 }}>
          {project.title}
        </h1>
        <span className="sub text-xl">{project.id_femic}</span>
        <span className="sub" style={{ lineHeight: '180%' }}>
          {project.short_desc}
        </span>
        <iframe
          width="50%"
          height="350px"
          onLoad={(e) =>
            (e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px')
          }
          src={
            'https://youtube.com/embed/' +
            extractVideoCodeFromUrl(project.link_yt)
          }
          title={project.title}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
        <ListUsers style={{ maxWidth: '93vw', marginTop: 20 }}>
          {team.team.map((part) => (
            <CardPeople key={part._id} integrante={part} escuro />
          ))}
          {team.advisors?.map((adv) => (
            <CardPeople key={adv._id} integrante={adv} escuro />
          ))}
        </ListUsers>
        <div className="details">
          <div className="item">
            <FaGlobe size={24} color="#333" />
            <span>
              {project.instituition.city}/{project.instituition.state}
            </span>
          </div>
          <div className="item">
            <FaSchool size={24} color="#333" />
            <span>{project.instituition.name}</span>
          </div>
          <div className="item">
            <FaIdeal size={24} color="#333" />
            <span>{renderAreaProject(project.area)}</span>
          </div>
        </div>
        <a
          className="poster"
          download
          href={`${baseUrl}/project/docs/${project.banner}`}
          target="_blank"
          rel="noreferrer">
          <FaArrowDown size={20} color="#fff" /> Pôster Científico
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="poster mt-3"
          download
          href={`${baseUrl}/project/docs/${project.relatorio}`}>
          <FaArrowDown size={20} color="#fff" />
          Relatório
        </a>
        <h3>Palavras-chave</h3>
        <p>{project.keywords.map((key) => key).join(',')}</p>
        <h3>Resumo Científico</h3>
        <p style={{ lineHeight: '180%', marginBottom: 40 }}>{project.resume}</p>
      </ContainerProject>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const projectData = await fetch(`${baseUrl}/project/getserverside/${id}`);
  const project = await projectData.json();

  return {
    props: {
      project: project,
    },
  };
};
