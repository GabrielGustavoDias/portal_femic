import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import api, { baseUrl } from '../../../config/api';

import AdminLayout from '../../../styles/layout/admin';
import { ProjectContainer } from '../../../styles/admin/styles.module';
// import { IRooms } from '../../../types/rooms';
import { useAlert } from 'react-alert';
// import { IProject } from '../../../types/project';

// interface IRoomProps {
// 	room: IRooms;
// }

export default function Room({ room }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState < [] > [];
  const [projectsList, setProjectsList] = useState < [] > [];

  const alert = useAlert();
  const router = useRouter();

  const { register, handleSubmit, watch, reset, setValue } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    setProjectsList(room.projects_list);
    reset({
      day: new Date(room.date),
      hour: room.hour,
      link: room.link,
    });
  }, []);

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .patch(`/project/search`, {
        method: e.target[0].value,
        value: e.target[1].value,
      })
      .then((res) => {
        console.log('respondeu a query com:', res.data);
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const removeProject = (proj) => {
    const list = projectsList.filter((item) => item._id != proj._id);
    setProjectsList(list);
  };

  const addProject = (proj) => {
    const find = projectsList.filter((item) => item._id == proj._id);
    if (find.length > 0) {
      alert.info('Já tem esse projeto em sua lista');
      return;
    }
    const projects2 = [...projectsList, proj];
    setProjectsList(projects2);
    setProjects([]);
  };

  const saveRoom = (data) => {
    const newRoom = {
      day: data.day,
      hour: data.hour,
      link: data.link,
      name: room.name,
      projects: [''],
    };
    newRoom.projects = projectsList.map((proj) => proj._id);
    api
      .patch(`/rooms/${room._id}`, newRoom)
      .then((res) => {
        alert.success('Sala atualizada com sucesso');
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRoom = () => {
    api
      .delete(`/rooms/${room._id}`)
      .then((res) => {
        router.push('/admin/rooms');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AdminLayout>
      <form className="form-alt" onSubmit={handleSubmit(saveRoom)}>
        <h1>{room.name}</h1>
        <label>Dia</label>
        <input type="date" {...register('day')} required />
        <label>Hora</label>
        <input type="time" {...register('hour')} required />
        <label>Link</label>
        <input
          type="url"
          {...register('link')}
          style={{ width: 600 }}
          required
        />
        <h2>Projetos</h2>
        {projectsList.map((proj) => (
          <ProjectContainer key={proj._id}>
            <img
              src="/default.png"
              width={50}
              height={50}
              alt="Imagem do projeto"
            />
            <div className="flex flex-col">
              <label>{proj.title}</label>
              <span>{proj.id_femic}</span>
              <span>{proj.status}</span>
            </div>
            <div className="flex flex-col">
              <label>{proj?.instituition?.country || 'Não informado'}</label>
              <span>
                {(proj?.instituition?.city || '...') +
                  '/' +
                  (proj?.instituition?.state || '...')}
              </span>
            </div>
            <div className="flex flex-col">
              <label>
                Feira afiliada: <span>{proj.isAccredited ? 'sim' : 'não'}</span>
              </label>
              <label>
                Participantes:{' '}
                <span className="!text-orange-700">
                  {proj.team.length + proj.advisors.length}
                </span>
              </label>
            </div>
            <button className="delete" onClick={() => removeProject(proj)}>
              Remover
            </button>
          </ProjectContainer>
        ))}
        <button type="submit" className="button-project">
          Salvar
        </button>
      </form>
      <h2 style={{ marginLeft: '2vw' }}>Pesquisar projetos:</h2>
      <form
        onSubmit={search}
        className="flex items-center"
        style={{ marginLeft: '2vw', marginBottom: 20 }}>
        <select>
          <option value="id">ID</option>
          <option value="title">Titulo</option>
        </select>
        <input required />
        <button
          type="submit"
          className="button-project"
          style={{ margin: 0, padding: 0, height: 36 }}>
          Pesquisar
        </button>
      </form>
      {projects.length > 0 &&
        projects.map((project) => (
          <ProjectContainer key={project._id}>
            {project.status == 'rascunho' ? (
              <img
                src="/default.png"
                width={50}
                height={50}
                alt="Imagem alternativa"
              />
            ) : (
              <img
                src={`${baseUrl}/project/logo/${project._id}`}
                width={50}
                height={50}
                alt="Projeto logo"
              />
            )}
            <div className="flex flex-col">
              <label>{project.title}</label>
              <span>{project.id_femic}</span>
              <span>{project.status}</span>
            </div>
            <div className="flex flex-col">
              <label>{project?.instituition?.country || 'Não informado'}</label>
              <span>
                {(project?.instituition?.city || '...') +
                  '/' +
                  (project?.instituition?.state || '...')}
              </span>
            </div>
            <div className="flex flex-col">
              <label>
                Feira afiliada:{' '}
                <span>{project.isAccredited ? 'sim' : 'não'}</span>
              </label>
              <label>
                Participantes:{' '}
                <span className="!text-orange-700">
                  {project.team.length + project.advisors.length}
                </span>
              </label>
            </div>
            <button className="confirm" onClick={() => addProject(project)}>
              Adicionar
            </button>
          </ProjectContainer>
        ))}
      <button
        className="px-3 py-2 text-white mx-20 my-30"
        onClick={deleteRoom}
        style={{ backgroundColor: 'tomato' }}>
        Deletar Sala
      </button>
    </AdminLayout>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const roomData = await fetch(`${baseUrl}/rooms/${id}`);
  const { room, projects } = await roomData.json();
  room.projects_list = projects;
  return {
    props: {
      room,
    },
  };
};
