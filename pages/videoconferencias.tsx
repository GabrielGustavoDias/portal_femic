import { useEffect, useState } from 'react';

import api, { baseUrl } from '../config/api';

import LayoutBase from '../styles/layout/base';
import ProjectsList from '../components/ProjectsList';

import { ProjectDetails } from '../styles/home/style.module';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { IProject } from '../types/project';

export default function AvaliadorHistorico() {
	const [projects, setProjects] = useState<any | []>([]);
	const [salas, setSalas] = useState<string[] | any[]>([]);

	useEffect(() => {
		api
			.get(`project/profile/${sessionStorage.getItem('profile_id')}`)
			.then((res) => {
				console.log(res.data);
				setProjects(res.data);
				if (res.data) {
					const data = new Set(res.data.map((proj: IProject) => `${proj.live.name}`));
					setSalas(Array.from(data));
					console.log(res.data.map((proj: IProject) => proj.live.name));
				}
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	return (
		<LayoutBase title="Videoconferências">
			<ProjectDetails>
				{salas.length <= 0 && <h1>Você não tem projetos para avaliar</h1>}
				<Tabs className="tabs" disabledTabClassName="disabled-tab" selectedTabClassName="abled-tab">
					<TabList className="tab-label">
						{salas.map((name: string) => (
							<Tab className="tab-alt" key={`${name}`}>
								{name}
							</Tab>
						))}
					</TabList>
					{salas.map((name: string) => (
						<TabPanel key={`${name}`}>
							<ProjectsList
								profile="avaliador"
								projects={projects.filter((proj: IProject) => proj.live.name == name)}
							/>
						</TabPanel>
					))}
				</Tabs>
			</ProjectDetails>
		</LayoutBase>
	);
}
