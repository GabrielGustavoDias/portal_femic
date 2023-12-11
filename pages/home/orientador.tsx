import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAlert } from 'react-alert';
import { FiFilePlus } from 'react-icons/fi';
import { Modal, Text } from '@nextui-org/react';

import api, { baseUrl } from '../../config/api';

import LayoutBase from '../../styles/layout/base';
import { Project, ProjectInfo, ListProjects } from '../../styles/home/style.module';
import ProjectsList from '../../components/ProjectsList';
import { IProject } from '../../types/project';

export default function Orientador() {
	const [projects, setProjects] = useState<[] | IProject[] | any>([]);
	const [disabledNewProject, setDisabledNewProject] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);

	const router = useRouter();
	const alert = useAlert();

	useEffect(() => {
		const id = sessionStorage.getItem('profile_id');
		api
			.get(`project/profile/${id}`)
			.then((res) => {
				setProjects(res.data);
			})
			.catch((err) => {
				console.warn(err);
				if (err.code == 'ERR_NETWORK') {
					alert.error('Servidor está fora do ar, tente novamente mais tarde');
				}
			});
		if (router.query.code == 'refresh') {
			window.location.reload();
		}
		if (sessionStorage.getItem('tutorial_orientador') !== 's') {
			setVisible3(true);
		}
	}, []);

	const handleProjecEntrain = (project: IProject) => {
		sessionStorage.setItem('project_id', project._id);
		router.push(`/projetos/time`);
	};

	const viewProject = (id: string) => {
		router.push(`/projetos/view/${id}`);
	};

	const createNewProject = (modality: string) => {
		sessionStorage.setItem('modality_project', modality);

		window.document.body.style.overflow = 'auto';
		window.document.body.style.overflowX = 'hidden';
		window.document.body.style.overflowY = 'auto';

		let res = true;

		if (res) {
			api
				.post(
					`project/initial/${sessionStorage.getItem('profile_id')}`,
					{ title: 'Título ainda não informado pelos autores', modality: modality },
					{ headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
				)
				.then((response) => {
					sessionStorage.setItem('project_id', response.data._id);
					setVisible(false);
					router.push('/projetos/time');
				})
				.catch((err) => {
					console.warn(err);
					setVisible(false);
				});
		} else {
			setVisible(false);
		}
	};

	return (
		<LayoutBase title="Orientador">
			<ProjectsList profile="orientador" projects={projects} />
		</LayoutBase>
	);

	return (
		<>
			<Modal
				closeButton
				blur
				aria-labelledby="modal-title"
				open={visible3}
				onClose={() => {
					setVisible3(false);
					sessionStorage.setItem('tutorial_orientador', 's');
				}}>
				<Modal.Body>
					<div className="flex flex-col items-center">
						<span className="text-center mb-2">
							Caso você queira criar um projeto para uma equipe de juniors ou jovens, clique no
							canto superior direito da tela e troque seu perfil para orientador
						</span>
						<Image src="/toca_perfil.gif" width={250} height={144} alt="git de troca de perfil" />
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				closeButton
				blur
				aria-labelledby="modal-title"
				open={visible}
				onClose={() => setVisible(false)}>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Selecione a modalidade que deseja orientar um projeto
					</Text>
				</Modal.Header>
				<Modal.Body>
					<div className="flex flex-row items-center justify-center">
						<button
							className="py-2 px-3 rounded text-white mx-3"
							style={{ backgroundColor: '#1FB58F' }}
							onClick={() => createNewProject('jovem')}>
							Jovem
						</button>
						<button
							className="py-2 px-3 rounded text-white mx-3"
							style={{ backgroundColor: '#1FB58F' }}
							onClick={() => createNewProject('junior')}>
							Júnior
						</button>
					</div>
				</Modal.Body>
			</Modal>
			<LayoutBase title="Orientador">
				<ProjectInfo>
					<Project style={{ marginBottom: 20 }}>
						<div className="head">
							<FiFilePlus size={24} color="#333" />
						</div>
						<button
							onClick={() => setVisible2(true)}
							style={{ backgroundColor: '#F24C4E' }}
							disabled={disabledNewProject}
							className="button">
							Novo projeto
						</button>
					</Project>
				</ProjectInfo>
				<ListProjects>
					{projects.length > 0 &&
						projects.map((project: IProject) => {
							if (project.finalized) {
								return (
									<ProjectInfo key={project._id}>
										<Project>
											<div className="head">
												<img
													alt="Logo do projeto aqui"
													height={166}
													width={220}
													src={`${baseUrl}/project/logo/${project._id}`}
												/>
											</div>
											<button className="button">
												{'desistente,'.includes(project.status)
													? 'Projeto desistente'
													: 'Em avaliação'}
											</button>
										</Project>
										<div className="infos-project">
											<label htmlFor="">Título do projeto</label>
											<span>{project.title}</span>
											<label htmlFor="">ID do projeto</label>
											<span>{project.id_femic}</span>
											<button onClick={() => viewProject(project._id)}>ver projeto</button>
										</div>
									</ProjectInfo>
								);
							} else {
								return (
									<ProjectInfo key={project._id}>
										<Project>
											<div className="head">
												<img
													alt="Logo do projeto aqui"
													height={166}
													width={220}
													src={`${baseUrl}/project/logo/${project._id}`}
												/>
											</div>
											<button className="button" onClick={() => handleProjecEntrain(project)}>
												Rascunho
											</button>
										</Project>
										<div className="infos-project">
											<label htmlFor="">Título do projeto</label>
											<span>{project.title}</span>
											<label htmlFor="">ID do projeto</label>
											<span>{project.id_femic}</span>
										</div>
									</ProjectInfo>
								);
							}
						})}
				</ListProjects>
			</LayoutBase>
		</>
	);
}
