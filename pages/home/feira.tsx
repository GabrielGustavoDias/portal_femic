import Link from 'next/link';
import { useEffect, useState } from 'react';

import LayoutBase from '../../styles/layout/feiraBase';
import { Project, ProjectInfo } from '../../styles/home/style.module';

import api from '../../config/api';
import { IProject } from '../../types/project';

export default function Feira() {
	const [credentials, setCredentials] = useState(0);
	const [rest, setRest] = useState(0);
	const [projects, setProjects] = useState([]);
	const [initial, setInitial] = useState(false);

	useEffect(() => {
		api
			.get('/affiliate/dashboad', {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((res) => {
				setCredentials(res.data.credentials);
				setRest(res.data.rest);
				setInitial(res.data.initial);
				api
					.post(
						'/project/ids',
						res.data.projects.map((pro: any) => pro.project)
					)
					.then((res2) => {
						setProjects(res2.data);
					})
					.catch((err) => {
						console.warn(err);
					});
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	const renderCredentials = () => {
		if (credentials == 0) {
			if (initial) {
				return (
					<div className='flex flex-col pl-5'>
						<span>
							O cadastro da sua feira foi realizado com sucesso. <br />
							Em até 5 dias úteis, a comissão organizadora da FEMIC fará análise do seu pedido de
							afiliação.
							<br /> Mais informações em:{' '}
							<a target='_blank' rel='noreferrer' href='https://femic.com.br/feiras-afiliadas/'>
								clique aqui
							</a>
						</span>
					</div>
				);
			} else {
				return (
					<div className='flex flex-col pl-5'>
						<span>Infelizmente sua feira não conquistou credenciais para o ano vigente.</span>
						<span>
							Informe-se: <a href='https://femic.com.br/feiras-afiliadas/'>clique aqui</a>
						</span>
					</div>
				);
			}
		} else if (credentials == 1) {
			return (
				<div className='flex flex-col pl-5'>
					<span>Sua feira possui 1 credencial para a FEMIC neste ano. Já usadas: {rest}</span>
					<span>Projetos aguardando confirmação</span>
				</div>
			);
		} else {
			return (
				<div className='flex flex-col pl-5'>
					<span>
						Sua feira possui {credentials} credenciais para a FEMIC neste ano. Já usadas: {rest}
					</span>
					<span>Projetos aguardando confirmação</span>
				</div>
			);
		}
	};

	return (
		<LayoutBase title='Feira Afiliada'>
			<h1>{renderCredentials()}</h1>
			{projects &&
				projects.map((proj: IProject) => (
					<ProjectInfo style={{ marginBottom: 20 }} key={proj._id}>
						<Project>
							<div className='head'>
								<img src={`https://apiportal.femic.com.br/project/logo/${proj._id}`} />
							</div>
							<div className='button'>Projeto</div>
						</Project>
						<div className='infos-project'>
							<label htmlFor=''>Título do projeto</label>
							<span>{proj.title}</span>
							<label htmlFor=''>ID do projeto</label>
							<span>{proj.id_femic}</span>
							<Link href={`/projetos/view/affiliate/${proj._id}`} passHref>
								<button>ver projeto</button>
							</Link>
						</div>
					</ProjectInfo>
				))}
		</LayoutBase>
	);
}
