import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import Link from 'next/link';

import api, { baseUrl } from '../../config/api';
import AdminLayout from '../../styles/layout/admin';
import { renderModality } from '../../utils/user';
import { WelcomeHeader, FormQuery, ProjectContainer } from '../../styles/admin/styles.module';
import { Loading, Pagination } from '@nextui-org/react';
import { ufs } from '../../config/dados';
import { FiFilePlus } from 'react-icons/fi';

export default function Participantes() {
	const [year, setYear] = useState<string | number>(new Date().getFullYear());
	const [state, setState] = useState('');
	const [uf, setUf] = useState('');
	const [category, setCategory] = useState('');
	const [area, setArea] = useState('');
	const [search, setSearch] = useState('default');

	const [name, setName] = useState('');

	const [projects, setProjects] = useState([]);
	const [totalProjects, setTotalProjects] = useState(0);
	const [loading, setLoading] = useState(false);

	const [modality, setModality] = useState('');

	const alert = useAlert();
	const router = useRouter();

	useEffect(() => {
		setModality(router.asPath.split('=')[1]);
		setName(sessionStorage.getItem('name') || '');
		if (!sessionStorage.getItem('key')) {
			alert.error('Autenticação não está mais valida, faça login novamente');
			router.push('/');
		}
		setProjects([]);
		setTotalProjects(0);
	}, [router.asPath]);

	const queryProjects = (e: any) => {
		e.preventDefault();
		setProjects([]);
		setLoading(true);
		const data = {
			year: String(year),
			status: state == 'todos' ? '' : state,
			category,
			area,
		};

		api
			.get(
				`/admin/projects/search/query?year=${year}&status=${
					data['status']
				}&category=${category}&area=${area}&modality=${modality}&page=${1}&state=${uf}`
			)
			.then((res) => {
				setProjects(res.data['projects']);
				setTotalProjects(res.data['count']);
				setLoading(false);
			})
			.catch((err) => {
				console.warn(err);
				setLoading(false);
			});
	};

	const searchForm = (e: any) => {
		e.preventDefault();
		setLoading(true);
		setProjects([]);
		api
			.patch(`/project/search`, { method: e.target[0].value, value: e.target[1].value })
			.then((res) => {
				setProjects(res.data);
				setTotalProjects(1);
				setLoading(false);
				setSearch('query');
			})
			.catch((err) => {
				setLoading(false);
				console.error(err);
			});
	};

	const searchAgain = (page: number) => {
		setProjects([]);
		setLoading(true);
		const data = {
			year: String(year),
			status: state == 'todos' ? '' : state,
			category,
			area,
		};

		api
			.get(
				`/admin/projects/search/query?year=${year}&status=${data['status']}&category=${data.category}&area=${area}&modality=${modality}&page=${page}&state=${uf}`
			)
			.then((res) => {
				setProjects(res.data['projects']);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.warn(err);
			});
	};

	return (
		<AdminLayout>
			<WelcomeHeader>
				<form onSubmit={searchForm}>
					<select>
						<option value="id">ID</option>
						<option value="title">Titulo</option>
					</select>
					<input required />
					<button type="submit">Pesquisar</button>
				</form>
				<h1>Olá {name}, seja bem-vinda!</h1>
				<p>Projetos FEMIC {renderModality(modality)}</p>
			</WelcomeHeader>
			<FormQuery onSubmit={queryProjects}>
				<div className="flex flex-col">
					<label>Ano</label>
					<input
						className="input"
						type="number"
						defaultValue={new Date().getFullYear()}
						onChange={(e) => setYear(e.target.value)}
						min={2022}
					/>
				</div>
				<div className="flex flex-col">
					<label>Status</label>
					<select className="input" onChange={(e) => setState(e.target.value)}>
						<option value="todos">Todos</option>
						<option value="rascunho">Rascunho</option>
						<option value="em-avaliacao">Em avaliação</option>
						<option value="recomendado">Recomendado</option>
						<option value="finalista">Finalista</option>
						<option value="confirmado">Confirmado</option>
						<option value="desistente">Desistente</option>
						<option value="reprovado">Reprovado</option>
						<option value="concluido">CONCLUÍDO</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label>Categoria</label>
					<select className="input" onChange={(e) => setCategory(e.target.value)}>
						<option value="">Todos</option>
						<option>Educação Infantil</option>
						<option>Anos Iniciais do Ensino Fundamental</option>
						<option>Anos finais do Ensino Fundamental</option>
						<option>Ensino Médio</option>
						<option>Ensino Técnico</option>
						<option>Ensino Superior em andamento</option>
						<option>Professores da Educação Básica</option>
						<option>Professores e/ou estudantes do Ensino Superior</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label>Área científica</label>
					<select className="input" onChange={(e) => setArea(e.target.value)}>
						<option value="">Todos</option>
						<option value="c_exatas_terra">Ciências Exatas e da Terra</option>
						<option value="c_biologicas">Ciências Biológicas</option>
						<option value="engenharias">Engenharias</option>
						<option value="c_saude">Ciências da Saúde</option>
						<option value="c_agrarias">Ciências Agrárias</option>
						<option value="c_sociais_aplicadas">Ciências Sociais Aplicadas</option>
						<option value="c_humanas">Ciências Humanas</option>
						<option value="letras_letras_artes">Linguística, Letras e Artes</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label>Localização</label>
					<select className="input" onChange={(e) => setUf(e.target.value)}>
						<option value="">Todos</option>
            <option value="int">INT</option>
						{ufs.map((uf) => (
							<option key={uf.id} value={String(uf.sigla).toUpperCase()}>
								{String(uf.sigla).toUpperCase()}
							</option>
						))}
					</select>
				</div>
				<button type="submit">Pesquisar</button>
			</FormQuery>
			{loading && <Loading color="warning" />}
			{projects.length > 0 &&
				projects.map((project: any) => (
					<ProjectContainer key={project._id}>
						{project.status == 'rascunho' ? (
							<img src="/default.png" width={50} height={50} alt="Imagem alternativa" />
						) : (
							<img
                src={ true ? "/default.png": `${baseUrl}/project/logo/${project._id}`}
								width={50}
								height={50}
								alt="Projeto logo"
							/>
						)}
						<div className="flex flex-col">
							<label>{project.title}</label>
							<span>{project.id_femic}</span>
							<span>
								{project.status} {project.finalized && project.status == 'finalista' && (
									<FiFilePlus size={24} color="#555" />
								)}
								{project.hidden ? '/(oculto)' : ''}
							</span>
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
								Feira afiliada: <span>{project.isAccredited ? 'sim' : 'não'}</span>
							</label>
							<label>
								Participantes:{' '}
								<span className="!text-orange-700">
									{project.team.length + project.advisors.length}
								</span>
							</label>
						</div>
						<Link href={`/admin/projetos/${project._id}`}>
							<a>Ver Projeto</a>
						</Link>
					</ProjectContainer>
				))}
			<Pagination
				css={{ alignSelf: 'center' }}
				color="warning"
				rounded
				total={Math.floor(totalProjects / 10) + 1}
				initialPage={1}
				onChange={(e) => searchAgain(e)}
			/>
		</AdminLayout>
	);
}
