import { NextPage } from 'next';
import { useEffect } from 'react';

type IProps = {
	project: any;
};

const Etica: NextPage<IProps> = ({ project }) => {
	useEffect(() => {}, []);

	return (
		<>
			{project?.etica?.study_type && (
				<div className="details-it">
					<label>Tipo de estudo</label>
					<span className="sub-label">{project.etica.study_type}</span>
					<label>Seres humanos</label>
					<span className="sub-label">
						{project.etica.involve_human.check == 's' ? 'Sim' : 'Não'}
					</span>
					{project.etica.involve_human.check == 's' && (
						<div className="ml-4 flex flex-col">
							<span className="sub-label">
								Seu projeto pode ser considerado uma pesquisa de opinião, na qual dados pessoais dos
								participantes (Ex: nome, idade, endereço, posses ou qualquer dado que identifique a
								pessoa) não são coletados e/ou divulgados:{' '}
								{project.etica.involve_human['01'] == 's' ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								2. Os participantes foram esclarecidos sobre a pesquisa e registraram sua
								concordância de participação através de um documento impresso ou virtual (Ex: Termo
								de Consentimento Livre e Esclarecido - TCLE; Termo de Assentimento - TA):{' '}
								{project.etica.involve_human['02'] == 's' ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Os participantes responderam algum questionário/formulário:{' '}
								{project.etica.involve_human['03'] == 's' ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								A pesquisa envolveu entrevistas gravadas seja apenas áudio (podcast) ou áudio e
								vídeo (vodcast): {project.etica.involve_human['04'] == 's' ? 'Sim' : 'Não'}
							</span>
							<div className="ml-4 flex flex-col">
								<span className="sub-label">
									Teste de produtos ou conceitos desenvolvidos pelos pesquisadores que não
									constituam riscos aos participantes por não haver a experimentação por ingestão ou
									uso tópico:
									{project.etica.involve_human['05'].box1 ? 'Sim' : 'Não'}
								</span>
								<span className="sub-label">
									Teste de produtos ou conceitos desenvolvidos pelos pesquisadores que não
									constituam riscos aos participantes por não haver a análise de comportamento
									humano em grupos considerados vulneráveis:{' '}
									{project.etica.involve_human['05'].box2 ? 'Sim' : 'Não'}
								</span>
								<span className="sub-label">
									Estudo de estatísticas de acesso público em bancos de dados (ex. estatísticas de
									jogos, índice de crimes, etc.) desde que não requeira interação com as pessoas das
									quais os dados foram coletados:{' '}
									{project.etica.involve_human['05'].box3 ? 'Sim' : 'Não'}
								</span>
								<span className="sub-label">
									Estudos de análise de comportamento em espaços públicos, desde que os
									pesquisadores não interajam com os indivíduos estudados, não manipulem o ambiente
									e não registrem informações que os identifiquem:{' '}
									{project.etica.involve_human['05'].box4 ? 'Sim' : 'Não'}
								</span>
								<span className="sub-label">
									Coleta de material biológico (Ex: sangue, urina, fezes, raspado jugal, cabelo,
									unha, outros): {project.etica.involve_human['05'].box5 ? 'Sim' : 'Não'}
								</span>
								<span className="sub-label">
									Experimentação de produtos do projeto, por ingestão ou uso tópico (Ex: produtos
									alimentícios de origem animal ou vegetal, creme, shampoo, outros):{' '}
									{project.etica.involve_human['05'].box6 ? 'Sim' : 'Não'}
								</span>
								<span className="sub-label">
									{' '}
									Análise de comportamento humano em grupos considerados vulneráveis, independente
									de ser uma condição física, psicológica ou social, utilizando metodologia
									presencial ou virtual: {project.etica.involve_human['05'].box7 ? 'Sim' : 'Não'}
								</span>
								{(project.etica.involve_human['05'].box7 ||
									project.etica.involve_human['05'].box6 ||
									project.etica.involve_human['05'].box5) && (
									<span className="sub-label">CAAE: {project.etica.involve_human['05'].caae}</span>
								)}
							</div>
						</div>
					)}
					<label>Animais Vertebrados</label>
					<span className="sub-label">
						{project.etica.involve_animals.check == 's' ? 'Sim' : 'Não'}
					</span>
					{project.etica.involve_animals.check == 's' && (
						<div className="ml-4 flex flex-col">
							<span className="sub-label">
								PARECER CONSUBSTANCIADO do Comitê de Ética em Pesquisa (CEP):{' '}
								{project.etica.involve_animals.parecer}
							</span>
						</div>
					)}
					<label>Agentes biológicos</label>
					<span className="sub-label">
						{project.etica.involve_agbio.check == 's' ? 'Sim' : 'Não'}
					</span>
					{project.etica.involve_agbio.check == 's' && (
						<div className="ml-4 flex flex-col">
							<label>sua pesquisa envolve.</label>
							<span className="sub-label">
								Tecido vegetal: {project.etica.involve_agbio.box1 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Cultura de células não patogênicas ou tecidos:{' '}
								{project.etica.involve_agbio.box2 ? 'Sim' : 'Não'}
							</span>
							{project.etica.involve_agbio.box2 && (
								<span className="sub-label ml-4">celulas: {project.etica.involve_agbio._cel}</span>
							)}
							<span className="sub-label">
								Partes de órgãos animais obtidos em restaurantes, açougues ou comércios afins:{' '}
								{project.etica.involve_agbio.box3 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Leites: {project.etica.involve_agbio.box4 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Cabelos: {project.etica.involve_agbio.box5 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Presas ou dentes esterilizados obtidos naturalmente:{' '}
								{project.etica.involve_agbio.box6 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Tecidos fossilizados ou amostras arqueológicas:{' '}
								{project.etica.involve_agbio.box7 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Cultura de microrganismos patogênico:{' '}
								{project.etica.involve_agbio.box8 ? 'Sim' : 'Não'}
							</span>
							{project.etica.involve_agbio.box8 && (
								<div className="ml-4 flex flex-col">
									<span className="sub-label">
										Parceria com Instituto de Pesquisa: {project.etica.involve_agbio.insti}
									</span>
									<span className="sub-label">
										Nome do(a) profissional responsável pela orientação da pesquisa:{' '}
										{project.etica.involve_agbio.prof_name}
									</span>
								</div>
							)}
							<span className="sub-label">
								Partes de órgãos ou fluidos frescos cuja necropsia seja realizada para a pesquisa:{' '}
								{project.etica.involve_agbio.box9 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Tecnologias de recombinação gênica em que os microrganismos sofrem modificações
								genéticas: {project.etica.involve_agbio.box10 ? 'Sim' : 'Não'}
							</span>
							{(project.etica.involve_agbio.box9 || project.etica.involve_agbio.box10) && (
								<span className="sub-label ml-4">CAAE: {project.etica.involve_agbio.caae}</span>
							)}
						</div>
					)}
					<label>Substâncias químicas</label>
					<span className="sub-label">
						{project.etica.involve_quimic.check == 's' ? 'Sim' : 'Não'}
					</span>
					{project.etica.involve_quimic.check == 's' && (
						<div className="flex flex-col ml-4">
							<span className="sub-label">
								Substâncias químicas que não requerem permissão federal/estadual:{' '}
								{project.etica.involve_quimic.box1 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Substâncias químicas que requerem permissão federal/estadual:{' '}
								{project.etica.involve_quimic.box2 ? 'Sim' : 'Não'}
							</span>
							<span className="sub-label">
								Substância(s) foi(ram) utilizada(as) no projeto: <br />
								{project.etica.involve_quimic.subs}
							</span>
							<span className="sub-label">
								Como foi(ram) utilizada(as) a(s) substância(s) no projeto. Informe, ainda, os
								equipamentos de segurança utilizados, caso se aplique: <br />
								{project.etica.involve_quimic.ult_subs}
							</span>
							<span className="sub-label">
								Como foi descartada a substância química ou seus rejeitos: <br /> Acondicionamento
								em recipiente fechado e transporte para local adequado para descarte.
							</span>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Etica;
