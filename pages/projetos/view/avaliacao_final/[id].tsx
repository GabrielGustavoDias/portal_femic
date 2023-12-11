import { GetServerSideProps, NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

import api, { baseUrl } from '../../../../config/api';
import {
	BaremaContainer,
	Project,
	ProjectDetails,
	ProjectInfoAdmin,
} from '../../../../styles/home/style.module';

import LayoutBase from '../../../../styles/layout/base';
import { ListUsers, Table, UserCard } from '../../../../styles/projetos/styles.module';

import { renderAreaProject } from '../../../../utils/projects';
import ProjectConfirmacao from '../../../../components/ProjectConfirmacao';

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
		value: 'Empolgação e comprometimento dos alunos no momento de apresentação do projeto',
	},
	{
		key: 'total',
		label: 'Total',
		value: 'Nota total dada pelo avaliador',
	},
];
const AvaliadorProjetoFinal: NextPage = (prop: any) => {
	const { project } = prop;

	const [total, setTotal] = useState(0);
	const [projectFinalAval, setProjectFinalAval] = useState(false);

	const alert = useAlert();

	const INITIAL_VALUES = projectFinalAval
		? {
				nota1: 0,
				nota2: 0,
				nota3: 0,
				nota4: 0,
				nota5: 0,
				nota6: 0,
				nota7: 0,
				nota8: 0,
				comentario: '',
		  }
		: {
				nota1: 0,
				nota2: 0,
				nota3: 0,
				nota4: 0,
				nota5: 0,
				nota6: false,
				comentario: '',
		  };

	const { register, handleSubmit, watch, getValues, setValue, reset } = useForm({
		defaultValues: {
			nota1: 0,
			nota2: 0,
			nota3: 0,
			nota4: 0,
			nota5: 0,
			nota6: 0,
			nota7: 0,
			nota8: 0,
			comentario: '',
		},
	});

	useEffect(() => {
		if (project.pre_avaliacao.avaliadores.includes(sessionStorage.getItem('profile_id'))) {
			const data = project.pre_avaliacao.barema.filter(
				(item: any) => item.avaliador == sessionStorage.getItem('profile_id')
			);
			reset(data[0]);
		} else if (project.avaliacao.avaliadores.includes(sessionStorage.getItem('profile_id'))) {
			const data = project.avaliacao.barema.filter(
				(item: any) => item.avaliador == sessionStorage.getItem('profile_id')
			);
			reset(data[0]);
		}
	}, []);

	useEffect(() => {
		let val =
			watch('nota1') +
			watch('nota2') +
			watch('nota3') +
			watch('nota4') +
			watch('nota5') +
			watch('nota6') +
			watch('nota7') +
			watch('nota8');
		setTotal(val);
	}, [watch()]);

	const sendBarema = async (data: any) => {
		data['avaliador'] = sessionStorage.getItem('profile_id');
		data['avaliador_nome'] = sessionStorage.getItem('name');
		data['somatorio'] = total;
		data['project'] = project._id;

		const projectFinalAval = 'finalista,confirmado,concluido'.includes(project.status);

		api
			.patch(`/project/barema/${projectFinalAval ? 'final_avaliacao' : 'pre_avaliacao'}`, data)
			.then(() => {
				alert.success('Avaliação feita com sucesso');
			})
			.catch((err: any) => {
				alert.error(err.response?.data.message);
			});
	};

	return (
		<LayoutBase title="Avaliador">
			<ProjectInfoAdmin>
				<Project>
					<div className="head">
						<img src={`${baseUrl}/project/logo/${project._id}`} alt="Logo do projeto" />
					</div>
				</Project>
				<div className="infos-project">
					<label htmlFor="">Título do projeto</label>
					<span>{project.title}</span>
					<label htmlFor="">ID do projeto</label>
					<span>{project.id_femic}</span>
				</div>
				<a className="auth" href="#barema">
					Barema
				</a>
			</ProjectInfoAdmin>
			<ProjectDetails>
				<div className="flex flex-1 w-full">
					<div className="details">
						<div className="details-it">
							<label>Categoria</label>
							<span className="sub-label">{project.category}</span>
							<label>Área científica</label>
							<span className="sub-label">{renderAreaProject(project.area)}</span>
							<label>Resumo científico</label>
							<span className="sub-label">{project.resume}</span>
							<label>Palavras-chave</label>
							{project?.keywords?.map((key: string, index: number) => (
								<span className="sub-label" key={`${key}-${index}`}>
									{key}
								</span>
							))}
							<label>Objetivo geral do projeto.</label>
							<span className="sub-label">{project.general_objective}</span>

							<label>Objetivos específicos do projeto.</label>
							<span className="sub-label">{project.especific_objectives}</span>

							<label>O projeto é continuidade de ano(s) anterior(es)?</label>
							<span className="sub-label">{project.continuation ? 'Sim' : 'não'}</span>

							{project.continuation && (
								<>
									<label>Informe os principais resultados alcançados nos últimos 12 meses.</label>
									<span className="sub-label">{project.results}</span>
								</>
							)}

							<label>O projeto possui credencial de alguma Feira Afiliada à FEMIC?</label>
							<span className="sub-label">{project.isAccredited ? 'Sim' : 'não'}</span>
							{project.isAccredited && (
								<>
									<label>Feira Afiliada.</label>
									<span className="sub-label">{project.affiliate}</span>
								</>
							)}
							<label>Canais de divulgação científica do projeto</label>
							{project.insta ? (
								<a href={project.insta}>Instagram: {project.insta}</a>
							) : (
								<span className="sub-label">Instagram: Não informado</span>
							)}
							{project.fanpage ? (
								<a href={project.fanpage}>Fanpage: {project.fanpage}</a>
							) : (
								<span className="sub-label">Fanpage: Não informada</span>
							)}
							{project.website ? (
								<a href={project.website}>Website: {project.website}</a>
							) : (
								<span className="sub-label">Website: Não informado</span>
							)}
							{project.youtube ? (
								<a href={project.youtube}>YouTube: {project.youtube}</a>
							) : (
								<span className="sub-label">YouTube: Não informado</span>
							)}
							{project.others_links ? (
								<a href={project.others_links}>Outro: {project.others_links}</a>
							) : (
								<span className="sub-label">Outro: Não informado</span>
							)}
						</div>
					</div>
				</div>
				<div className="details mt-8">
					<div className="details-it">
						<ProjectConfirmacao project={project} />
					</div>
				</div>
				<div className="details mt-8">
					<div className="details-it">
						<h1 id="barema">Parecer avaliação</h1>
						<form
							onSubmit={handleSubmit(sendBarema)}
							className="items-center flex  flex-col justify-center">
							<Table style={{ width: '80%' }}>
								<thead>
									<tr>
										<th>Critérios</th>
										<th>Nota</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
											Criatividade e Inovação
										</td>
										<td style={{ width: 500 }}>
											<input
												{...register('nota1', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 20,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={20}
												min={0}
												required
											/>
											<span style={{ fontSize: 12 }}> 0 a 20 pontos</span>
										</td>
									</tr>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
											Profundidade da pesquisa
										</td>
										<td style={{ width: 'fit-content' }}>
											<input
												{...register('nota2', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 20,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={20}
												required
												min={0}
											/>
											<span style={{ fontSize: 12 }}> 0 a 20 pontos</span>
										</td>
									</tr>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
											Relatório e Resumo científico
										</td>
										<td style={{ width: 'fit-content' }}>
											<input
												{...register('nota3', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 10,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={10}
												required
												min={0}
											/>
											<span style={{ fontSize: 12 }}> 0 a 10 pontos</span>
										</td>
									</tr>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>Pôster científico</td>
										<td style={{ width: 'fit-content' }}>
											<input
												{...register('nota4', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 10,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={10}
												required
												min={0}
											/>
											<span style={{ fontSize: 12 }}> 0 a 10 pontos</span>
										</td>
									</tr>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
											Clareza e objetividade na exposição do projeto
										</td>
										<td style={{ width: 'fit-content' }}>
											<input
												{...register('nota5', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 20,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={10}
												required
												min={0}
											/>
											<span style={{ fontSize: 12 }}> 0 a 10 pontos</span>
										</td>
									</tr>

									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
											Uso da metodologia científica{' '}
										</td>
										<td style={{ width: 'fit-content' }}>
											<input
												{...register('nota6', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 10,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={10}
												required
												min={0}
											/>
											<span style={{ fontSize: 12 }}> 0 a 10 pontos</span>
										</td>
									</tr>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
											Aplicabilidade dos resultados no cotidiano da sociedade
										</td>
										<td style={{ width: 'fit-content' }}>
											<input
												{...register('nota7', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 10,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={10}
												required
												min={0}
											/>
											<span style={{ fontSize: 12 }}> 0 a 10 pontos</span>
										</td>
									</tr>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>
											Empolgação e comprometimento durante a apresentação do projeto
										</td>
										<td style={{ width: 'fit-content' }}>
											<input
												{...register('nota8', {
													required: true,
													valueAsNumber: true,
													min: 0,
													max: 10,
												})}
												className="bg-gray-200 py-2 border border-gray-500 text-center w-14"
												type="number"
												max={10}
												required
												min={0}
											/>
											<span style={{ fontSize: 12, width: 300 }}>0 a 10 pontos</span>
										</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td style={{ flex: 1, width: '100%', textAlign: 'left' }}>Somatório</td>
										<td style={{ width: 'fit-content' }}>
											<label className="text-lg">{total}</label>
										</td>
									</tr>
								</tfoot>
							</Table>
							<h1 className="!text-xl">
								Comentários em relação a avaliação conduzida e/ou Recomendações para aperfeiçoamento
								do trabalho.
							</h1>
							<span className="sub-label">Máximo de 500 caracteres com espaço.</span>
							<textarea
								className="bg-slate-200 p-2 w-full"
								maxLength={500}
								required
								{...register('comentario')}></textarea>
							<button type="submit" className="!w-fit rounded bg-emerald-600 my-5 text-white">
								Enviar
							</button>
						</form>
					</div>
				</div>
			</ProjectDetails>
		</LayoutBase>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.query.id;

	if (id == '1x') {
		return {
			props: {
				project: {},
			},
		};
	}

	const projectData = await fetch(`${baseUrl}/project/getserverside/${id}`);
	const project = await projectData.json();

	return {
		props: {
			project: project,
		},
	};
};

export default AvaliadorProjetoFinal;
