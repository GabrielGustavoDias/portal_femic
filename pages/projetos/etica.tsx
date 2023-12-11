import { Loading } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import api from '../../config/api';
import LayoutBase from '../../styles/layout/base';
import { Form } from '../../styles/projetos/styles.module';

export default function ProjetoEtica() {
	const [color, setColor] = useState('');
	const [disabled, setDisabled] = useState(false);
	const { register, handleSubmit, watch, reset, getValues } = useForm({
		mode: 'onBlur',
	});

	const router = useRouter();

	useEffect(() => {
		setColor(sessionStorage.getItem('color') || '#1FB58F');
		api
			.get(`/project/etica/${sessionStorage.getItem('project_id')}`)
			.then((response) => {
				reset(response.data);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	useEffect(() => {
		const values = getValues();
		if (watch('involve_human.check') == 'n') {
			values['involve_human'] = {
				involve_human: {
					check: 'n',
					'01': 'n',
					'02': 'n',
					'02_anexo': 'n',
					'03': 'n',
					'04': 'n',
					'05': {
						box1: false,
						box2: false,
						box3: false,
						box4: false,
						box5: false,
						box6: false,
						box7: false,
						caae: '',
					},
				},
			};
			reset(values);
		}
	}, [watch('involve_human.check')]);

	useEffect(() => {
		const values = getValues();
		if (watch('involve_animals.check') == 'n') {
			values['involve_animals'] = {
				parecer: '',
				check: 'n',
			};
			reset(values);
		}
	}, [watch('involve_animals.check')]);

	useEffect(() => {
		const values = getValues();
		if (watch('involve_agbio.check') == 'n') {
			values['involve_agbio'] = {
				check: 'n',
				box1: false,
				box2: false,
				box3: false,
				box4: false,
				box5: false,
				box6: false,
				box7: false,
				box8: false,
				box9: false,
				box10: false,
				_cel: '',
			};
			reset(values);
		}
	}, [watch('involve_agbio.check')]);

	useEffect(() => {
		const values = getValues();
		if (watch('involve_quimic.check') == 'n') {
			values['involve_quimic'] = {
				check: 'n',
				box1: false,
				box2: false,
				subs: '',
				ult_subs: '',
				descart: {
					box1: false,
					box2: false,
					box3: false,
					box4: false,
				},
			};
			reset(values);
		}
	}, [watch('involve_quimic.check')]);

	const render51 = () => {
		if (watch('involve_human.05.box5')) {
			return true;
		}
		if (watch('involve_human.05.box6')) {
			return true;
		}
		if (watch('involve_human.05.box7')) {
			return true;
		}
		return false;
	};

	const renderProjectInvalid = () => {
		if (watch('involve_quimic.descart.box2')) {
			return true;
		}

		if (watch('involve_quimic.descart.box3')) {
			return true;
		}

		if (watch('involve_quimic.descart.box4')) {
			return true;
		}
		return false;
	};

	const renderCaareBio = () => {
		if (watch('involve_agbio.box9')) {
			return true;
		}
		if (watch('involve_agbio.box10')) {
			return true;
		}
		return false;
	};

	const updateEtica = async (data: any) => {
		setDisabled(true);
		if (renderProjectInvalid()) {
			alert('seu projeto não está apto para continuar');
			setDisabled(false);
			return;
		}

		const file1 = data['involve_human']['02'] == 's' ? data['involve_human']['02_tcle'][0] : null;
		const file2 = data['involve_quimic']['box2'] ? data['involve_quimic']['02_perm'][0] : null;

		delete data['involve_human']['02_tcle'];
		delete data['involve_quimic']['02_perm'];

		data['id'] = sessionStorage.getItem('project_id');

		if (
			!renderProjectInvalid() &&
			!data['involve_quimic']['descart']['box1'] &&
			watch('involve_quimic.check') == 's'
		) {
			alert('Informe como foi descartada a substância química ou seus rejeitos.');
			setDisabled(false);
			return;
		}

		api
			.post('/project/etica', data)
			.then((res) => {
				if (data['involve_human']['02'] == 's') {
					api.patch(
						'/project/etica/file1',
						{ id: sessionStorage.getItem('project_id'), file: file1 },
						{ headers: { 'Content-Type': 'multipart/form-data' } }
					);
				}

				if (data['involve_quimic']['box2']) {
					api.patch(
						'/project/etica/file2',
						{ id: sessionStorage.getItem('project_id'), file: file2 },
						{ headers: { 'Content-Type': 'multipart/form-data' } }
					);
				}
				setDisabled(false);
				router.push('/projetos/finalizacao');
			})
			.catch((err) => {
				setDisabled(false);
			});
	};

	return (
		<LayoutBase title="Ética e Segurança">
			<Form onSubmit={handleSubmit(updateEtica)}>
				<label>Tipo de estudo</label>
				<select {...register('study_type')}>
					<option>Observacional</option>
					<option>Experimental</option>
				</select>
				<h1>Seres humanos</h1>
				<label>Seu projeto envolve procedimentos e/ou testes como seres humanos?</label>
				<span className="sub-label">
					Informe-se{' '}
					<a href="https://femic.com.br/etica-e-seguranca/" target="_blank" rel="noreferrer">
						clique aqui.
					</a>
				</span>
				<select {...register('involve_human.check')}>
					<option value="n">Não</option>
					<option value="s">Sim</option>
				</select>
				{watch('involve_human.check') == 's' && (
					<>
						<label>
							{' '}
							1. Seu projeto pode ser considerado uma pesquisa de opinião, no qual dados pessoais
							dos participantes (Ex: nome,idade, endereço, posses ou qualquer dado que identifique a
							pessoa) não são coletados e/ou divulgados?
						</label>
						<select {...register('involve_human.01')}>
							<option value="n">Não</option>
							<option value="s">Sim</option>
						</select>
					</>
				)}
				{watch('involve_human.check') == 's' && (
					<>
						<label>
							2. Os participantes foram esclarecidos sobre a pesquisa e registraram sua concordância
							de participação através de um documento impresso ou virtual (Ex: Termo de
							Consentimento Livre e Esclarecido - TCLE; Termo de Assentimento - TA)?
						</label>
						<select {...register('involve_human.02')}>
							<option value="n">Não</option>
							<option value="s">Sim</option>
						</select>
					</>
				)}
				{watch('involve_human.02') == 's' && (
					<div className="flex flex-col ml-5">
						<label>
							2.1. Anexe aqui o TCLE e/ou TA do seu projeto. Envie o modelo não preenchido por
							participantes. Caso haja mais de um documento, eles deverão ser enviados em arquivo
							único. O arquivo deve estar em formato PDF e deverá ter até 2MB de tamanho.
						</label>
						<input type="file" accept=".pdf" {...register('involve_human.02_tcle')} />
					</div>
				)}
				{watch('involve_human.check') == 's' && (
					<>
						<label>3. Os participantes responderam algum questionário/formulário?</label>
						<select {...register('involve_human.03')}>
							<option value="n">Não</option>
							<option value="s">Sim</option>
						</select>
					</>
				)}
				{watch('involve_human.03') == 's' && (
					<div className="flex flex-col ml-5">
						<label>3.1. Informe as questões do questionário/formulário aplicado.</label>
						<textarea maxLength={5000} {...register('involve_human.03_questions')}></textarea>
					</div>
				)}
				{watch('involve_human.check') == 's' && (
					<>
						<label>
							4. A pesquisa envolveu entrevistas gravadas seja apenas áudio (podcast) ou áudio e
							vídeo (vodcast)?
						</label>
						<select {...register('involve_human.04')}>
							<option value="n">Não</option>
							<option value="s">Sim</option>
						</select>
						<span>
							Observação: conforme legislação brasileira, toda pesquisa que envolve gravações de
							imagem ou voz de seres humanos deve ser realizada somente com o recolhimento de termo
							de autorização de imagem/voz. Tais termos de autorização devem ficar sob posse dos
							pesquisadores durante 5 anos e podem ser solicitados para verificação durante esse
							período.
						</span>
					</>
				)}
				{watch('involve_human.check') == 's' && (
					<>
						<label className="mt-2">
							5. Marque abaixo a(s) alternativa(s) que melhor apresenta(m) metodologia(s) às quais
							os participantes foram submetidos em seu projeto.
						</label>
						<div className="ml-5 flex flex-col">
							<label className="flex label-check">
								<input type="checkbox" {...register('involve_human.05.box1')} />
								Teste de produtos ou conceitos desenvolvidos pelos pesquisadores que não constituam
								riscos aos participantes por não haver a experimentação por ingestão ou uso tópico.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_human.05.box2')} />
								Teste de produtos ou conceitos desenvolvidos pelos pesquisadores que não constituam
								riscos aos participantes por não haver a análise de comportamento humano em grupos
								considerados vulneráveis.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_human.05.box3')} />
								Estudo de estatísticas de acesso público em bancos de dados (ex. estatísticas de
								jogos, índice de crimes, etc.) desde que não requeira interação com as pessoas das
								quais os dados foram coletados.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_human.05.box4')} />
								Estudos de análise de comportamento em espaços públicos, desde que os pesquisadores
								não interajam com os indivíduos estudados, não manipulem o ambiente e não registrem
								informações que os identifiquem.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_human.05.box5')} />
								Coleta de material biológico (Ex: sangue, urina, fezes, raspado jugal, cabelo, unha,
								outros).
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_human.05.box6')} />
								Experimentação de produtos do projeto, por ingestão ou uso tópico (Ex: produtos
								alimentícios de origem animal ou vegetal, creme, shampoo, outros)
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_human.05.box7')} />
								Análise de comportamento humano em grupos considerados vulneráveis, independente de
								ser uma condição física, psicológica ou social, utilizando metodologia presencial ou
								virtual.
							</label>
							{render51() && (
								<div className="flex flex-col ml-5">
									<label>
										5.1. Seu projeto requer um parecer consubstanciado emitido via Plataforma
										Brasil. Informe o CAAE de seu projeto
									</label>
									<span className="sub-label">
										Um parecer consubstanciado é uma avaliação feita por um Comitê de Ética em
										Pesquisa que atesta a adequação do projeto à legislação sobre Ética e Segurança
										em pesquisas envolvendo seres humanos. O CAAE é um Certificado de Apresentação
										de Apreciação Ética.
									</span>
									<input
										type="text"
										pattern="^[\d,.?!]+$"
										placeholder="00000000.1.2222.3333"
										{...register('involve_human.05.caae')}
									/>
								</div>
							)}
						</div>
					</>
				)}
				<h1>Animais Vertebrados</h1>
				<label>Seu projeto envolve procedimentos e/ou testes com animais?</label>
				<span className="sub-label">
					Informe-se{' '}
					<a href="https://femic.com.br/etica-e-seguranca/" target="_blank" rel="noreferrer">
						clique aqui.
					</a>
				</span>
				<select {...register('involve_animals.check')}>
					<option value="n">Não</option>
					<option value="s">Sim</option>
				</select>
				{watch('involve_animals.check') == 's' && (
					<>
						<span>
							Conforme Legislação Nacional, pesquisas com animais vertebrados deverão ser conduzidas
							obrigatoriamente em institutos de pesquisa ou locais devidamente autorizados pela
							CONCEA - Conselho Nacional de Controle da Experimentação Animal, e as pesquisas só
							poderão realizadas com a devida autorização da CEUA -Comissões de Ética no Uso de
							Animais da instituição.
						</span>
						<label style={{ marginTop: 12 }}>
							Anexe o PARECER CONSUBSTANCIADO do Comitê de Ética em Pesquisa (CEP).
						</label>
						<input
							placeholder="00000000.1.2222.3333"
							type="text"
							{...register('involve_animals.parecer')}
							style={{ marginBottom: 20 }}
						/>
					</>
				)}
				<h1>Agentes biológicos</h1>
				<label>
					Seu projeto envolve agentes biológicos como vírus, bactérias, fungos, protozoários,
					helmintos, plantas entre outros?
				</label>
				<span className="sub-label">
					Informe-se{' '}
					<a href="https://femic.com.br/etica-e-seguranca/" target="_blank" rel="noreferrer">
						clique aqui.
					</a>
				</span>

				<select {...register('involve_agbio.check')}>
					<option value="n">Não</option>
					<option value="s">Sim</option>
				</select>
				{watch('involve_agbio.check') == 's' && (
					<>
						<label>1. Informe qual(is) do(s) item(ns) a seguir sua pesquisa envolve.</label>
						<div className="flex flex-col ml-5">
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box1')} />
								Tecido vegetal.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box2')} />
								Cultura de células não patogênicas ou tecidos.
							</label>
							{watch('involve_agbio.box2') && (
								<>
									<label>Informe qual(ais). </label>
									<input {...register('involve_agbio._cel')} />
								</>
							)}

							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box3')} />
								Partes de órgãos animais obtidos em restaurantes, açougues ou comércios afins.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box4')} />
								Leites
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box5')} />
								Cabelos
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box6')} />
								Presas ou dentes esterilizados obtidos naturalmente.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box7')} />
								Tecidos fossilizados ou amostras arqueológicas.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box8')} />
								Cultura de microrganismos patogênico
							</label>
							{watch('involve_agbio.box8') && (
								<>
									<span>
										Seu projeto requer parceria com Instituto de Pesquisa regularizado pela
										legislação brasileira, que possua condições de execução destes experimentos.{' '}
									</span>
									<span>Informe o nome da instituição em que os testes foram realizados.</span>
									<input {...register('involve_agbio.insti')} />
									<span>
										Informe o nome do(a) profissional responsável pela orientação da pesquisa na
										instituição em que os testes foram realizados.
									</span>
									<input {...register('involve_agbio.prof_name')} />
								</>
							)}
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box9')} />
								Partes de órgãos ou fluidos frescos cuja necropsia seja realizada para a pesquisa.
							</label>
							{watch('involve_agbio.box9') && (
								<span>
									Seu projeto requer um parecer consubstanciado emitido via Plataforma Brasil.
									<br />
									Informe o CAAE de seu projeto.
								</span>
							)}
							<label className="label-check">
								<input type="checkbox" {...register('involve_agbio.box10')} />
								Tecnologias de recombinação gênica em que os microrganismos sofrem modificações
								genéticas.
							</label>
							{watch('involve_agbio.10') && (
								<span>
									Seu projeto requer um parecer consubstanciado emitido via Plataforma Brasil
									<br />
									Informe o CAAE de seu projeto
								</span>
							)}
							{renderCaareBio() && (
								<>
									<span className="sub-label">
										Um parecer consubstanciado é uma avaliação feita por um Comitê de Ética em
										Pesquisa que atesta a adequação do projeto à legislação sobre Ética e Segurança
										em pesquisas envolvendo seres humanos. O CAAE é um Certificado de Apresentação
										de Apreciação Ética
									</span>
									<input
										type="text"
										{...register('involve_agbio.caae')}
										placeholder="00000000.1.2222.3333"
									/>
								</>
							)}
						</div>
					</>
				)}
				<h1>Substâncias químicas</h1>
				<label>
					Seu projeto envolve substâncias químicas com potenciais riscos à saúde e ao meio ambiente?
				</label>
				<span className="sub-label">
					Informe-se{' '}
					<a href="https://femic.com.br/etica-e-seguranca/" target="_blank" rel="noreferrer">
						clique aqui.
					</a>
				</span>
				<select {...register('involve_quimic.check')}>
					<option value="n">Não</option>
					<option value="s">Sim</option>
				</select>
				{watch('involve_quimic.check') == 's' && (
					<>
						<label htmlFor="">
							1. Informe o(s) tipo(s) de produtos químicos, equipamentos ou atividades do seu
							projeto.
						</label>
						<div className="flex flex-col ml-5">
							<label className="label-check">
								<input type="checkbox" {...register('involve_quimic.box1')} />
								Substâncias químicas que não requerem permissão federal/estadual.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_quimic.box2')} />
								Substâncias químicas que requerem permissão federal/estadual.
							</label>
							{watch('involve_quimic.box2') && (
								<div className="flex flex-col ml-5">
									<label>
										Anexe aqui a permissão federal/estadual. Caso haja mais de um documento, eles
										deverão ser enviados em arquivo único.
										<br />O arquivo deve estar em formato PDF e deverá ter até 2MB de tamanho.
									</label>
									<input
										type="file"
										{...register('involve_quimic.02_perm')}
										accept=".pdf"
										required
									/>
								</div>
							)}
						</div>
						<label htmlFor="">
							2. Descreva qual(ais) substância(s) foi(ram) utilizada(as) no projeto.
						</label>
						<textarea {...register('involve_quimic.subs')} required></textarea>
						<label htmlFor="">
							3. Descreva como foi(ram) utilizada(as) a(s) substância(s) no projeto. Informe, ainda,
							os equipamentos de segurança utilizados, caso se aplique.
						</label>
						<textarea {...register('involve_quimic.ult_subs')} required></textarea>
						<label htmlFor="">
							4. Informe como foi descartada a substância química ou seus rejeitos.
						</label>
						<div className="flex flex-col ml-5">
							<label className="label-check">
								<input type="checkbox" {...register('involve_quimic.descart.box1')} />
								Acondicionamento em recipiente fechado e transporte para local adequado para
								descarte.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_quimic.descart.box2')} />
								Jogando na pia, vaso sanitário ou outra rede de esgoto.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_quimic.descart.box3')} />
								Jogando no solo e/ou num curso d’água.
							</label>
							<label className="label-check">
								<input type="checkbox" {...register('involve_quimic.descart.box4')} />
								Incinerando.
							</label>
						</div>
						{renderProjectInvalid() && (
							<span>
								Atenção!
								<br />A FEMIC não aceita a submissão de projetos que não respeitam a legislação
								brasileira de descartes de resíduos. Adéque as experimentações que envolvem
								substâncias químicas para continuar.
							</span>
						)}
					</>
				)}
				<div className="flex flex-row">
					<Link href="/projetos/dados">
						<a className="button-project" style={{ backgroundColor: color }}>
							Voltar
						</a>
					</Link>
					<button
						type="submit"
						className="button-project"
						style={{ backgroundColor: color }}
						disabled={disabled}>
						{disabled ? <Loading color="white" /> : 'Próxima'}
					</button>
				</div>
			</Form>
		</LayoutBase>
	);
}
