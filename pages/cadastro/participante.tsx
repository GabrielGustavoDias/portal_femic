import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SelectMult from 'react-select';
import makeAnimated from 'react-select/animated';

import LayoutForm from '../../styles/layout/form';
import { Input, Select, SubmitButton } from '../../styles/layout/styles';

import api from '../../config/api';
import { countryes, TCountry, ufs } from '../../config/dados';
import { cpfPassportMask, phoneMask } from '../../utils/masks';
import { idiomasTypes } from '../../utils/user';
import { useAlert } from 'react-alert';

const options = [
	{ value: 'c_exatas_terra', label: 'Ciências Exatas e da Terra' },
	{ value: 'c_biologicas', label: 'Ciências Biológicas' },
	{ value: 'engenharias', label: 'Engenharias' },
	{ value: 'c_saude', label: 'Ciências da Saúde' },
	{ value: 'c_agrarias', label: 'Ciências Agrárias' },
	{ value: 'c_sociais_aplicadas', label: 'Ciências Sociais Aplicadas' },
	{ value: 'c_humanas', label: 'Ciências Humanas' },
	{ value: 'letras_letras_artes', label: 'Linguística, Letras e Artes' },
];

const defsTypes = [
	{ value: 'def_fisica', label: 'Deficiência Física' },
	{ value: 'def_auditiva', label: 'Deficiência auditiva' },
	{ value: 'def_visual', label: 'Deficiência visual' },
	{ value: 'def_mental', label: 'Deficiência mental' },
	{ value: 'def_mult', label: 'Deficiência múltipla' },
];

const animatedComponents = makeAnimated();

export default function Participante() {
	const [name, setName] = useState('');
	const [identifier, setIdentifier] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dateNas, setDateNas] = useState(new Date().toISOString());
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [sex, setSex] = useState('');
	const [color, setColor] = useState('');
	const [ampic, setAmpic] = useState('');
	const [school, setSchool] = useState('');
	const [modality, setModality] = useState('');
	const [atuationArea, setAtuationArea] = useState('');
	const [def, setDef] = useState('');
	const [defType, setDefTypes] = useState('');
	const [fluent, setFluent] = useState('');
	const [pass, setPass] = useState('');
	const [passConfirm, setPasConfirm] = useState('');
	const [photo, setPhoto] = useState<Blob | ''>('');
	const [prof, setProf] = useState('');
	const [validateTerms, setValidateTerms] = useState(false);

	const [disabledCity, setDisabledCity] = useState(true);

	const [cityes, setCityes] = useState<[{ nome: string; id: string }] | []>([]);
	const [paises, setPaises] = useState(countryes);

	const router = useRouter();
	const alert = useAlert();

	useEffect(() => {
		window.document.body.style.overflowX = 'hidden';
		window.document.body.style.overflowY = 'auto';
	}, []);

	const singUp = (e: any) => {
		e.preventDefault();

		if (fluent == '') {
			alert.show('Digite pelo menos 1 idioma');
			return;
		}

		if (pass !== passConfirm) {
			alert.error('As senhas não correspondem');
			return;
		}

		const requestData = new FormData();

		requestData.append('name', name);
		requestData.append('identifier', identifier);
		requestData.append('email', email);
		requestData.append('number', phone);
		requestData.append('date_nas', dateNas);
		requestData.append('country', country);
		requestData.append('state', state);
		requestData.append('city', city);
		requestData.append('sex', sex);
		requestData.append('color', color);
		requestData.append('associated_ampic', ampic);
		requestData.append('school', school);
		requestData.append('modality', modality);
		requestData.append('formation', atuationArea);
		requestData.append('especial', def);
		requestData.append('especial_type', defType);
		requestData.append('fluent', fluent);
		requestData.append('password', pass);
		requestData.append('photo', photo);
		requestData.append('singUp_date', `${new Date().toISOString()}`);

		api
			.post('/user', requestData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				router.push('/login');
			})
			.catch((err) => {
				if (err.code == 'ERR_NETWORK') {
				alert.error('Servidor está fora do ar, tente novamente mais tarde');
				return;
			}
				alert.error(err.response.data.message);
			});
		return false;
	};

	const checkProfile = (value: string) => {
		setProf(value.split(';')[1]);
		setModality(value.split(';')[1]);
		setSchool(value.split(';')[0]);
	};

	const stateChanged = (value: string) => {
		if (value.length < 2) {
			return;
		}
		fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`)
			.then((response) => {
				response.json().then((data) => {
					setCityes(data);
				});
				setDisabledCity(false);
				setState(value);
			})
			.catch((err) => {
				alert.show('digite uma uf valida');
			});
	};

	const especializationSelected = (e: any) => {
		const test = e.map((item: any) => item.label);
		setAtuationArea(test.join());
	};

	const defSelected = (e: any) => {
		const defsaux = e.map((item: any) => item.label);
		setDefTypes(defsaux.join());
	};

	function fileSelected(event: ChangeEvent) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || !files[0]) return;

		setPhoto(files[0]);
	}

	return (
		<>
		<Head>
			<title>Cadastro de novo participante FEMIC</title>
		</Head>
			<LayoutForm color1="#EAB126" color2="#1FB58F">
				<form id="singup_participante" autoComplete="off" onSubmit={singUp}>
					<label>Nome completo</label>
					<Input
						type="text"
						name="name"
						placeholder="Nome completo sem abreviações."
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<label htmlFor="">CPF ou PASSAPORTE</label>
					<span>Digitar somente números (e letras no caso de Passaporte)</span>
					<Input
						type="text"
						name="identifier"
						placeholder="CPF ou passaporte aqui"
						value={identifier}
						maxLength={11}
						onChange={(e) => setIdentifier(cpfPassportMask(e.target.value))}
						required
					/>
					<label htmlFor="">E-mail</label>
					<Input
						type="email"
						name="email"
						placeholder="exemplo@email.com"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label htmlFor="">Telefone (número de celular)</label>
					<Input
						type="tel"
						name="number"
						maxLength={15}
						placeholder="(00) 9 9999-9999"
						value={phone}
						onChange={(e) => setPhone(phoneMask(e.target.value))}
						required
					/>
					<label htmlFor="">Data de nascimento</label>
					<Input
						type="date"
						name="data_nas"
						onChange={(e) => setDateNas(e.target.value)}
						required
					/>
					<label htmlFor="">País</label>
					<Input
						type="text"
						name="country"
						placeholder="País"
						list="paises"
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
					<datalist id="paises" style={{ display: 'none' }}>
						{paises &&
							paises.map((paisItem) => (
								<option key={paisItem['pais-ISO-ALPHA-3']} value={paisItem['pais-nome']}></option>
							))}
					</datalist>
					{country.toLowerCase() == 'brasil' ? (
						<div className="flex w-full flex-row justify-between">
							<div className="flex flex-col mr-2">
								<label htmlFor="">Estado</label>
								<Input
									type="text"
									name="state"
									maxLength={2}
									size={2}
									placeholder="MG"
									list="list-ufs"
									style={{ textTransform: 'uppercase' }}
									onChange={(e) => stateChanged(e.target.value)}
									required
								/>
								<datalist style={{ display: 'none' }} id="list-ufs">
									{ufs.map((uf) => (
										<option key={uf.nome} value={uf.sigla} label={uf.nome}></option>
									))}
								</datalist>
							</div>
							<div className="flex flex-col w-full">
								<label htmlFor="">Cidade</label>
								<Input
									type="text"
									name="city"
									placeholder="Cidade"
									list="cidades"
									onChange={(e) => setCity(e.target.value)}
									required
								/>
								<datalist id="cidades" style={{ display: 'none' }}>
									{cityes &&
										cityes.map((cityItem) => (
											<option key={cityItem.id} value={cityItem.nome}></option>
										))}
								</datalist>
							</div>
						</div>
					) : (
						<div className="flex w-full flex-row justify-between">
							<div className="flex flex-col mr-2">
								<label htmlFor="">Estado</label>
								<Input
									type="text"
									name="state"
									maxLength={2}
									size={2}
									placeholder="MG"
									style={{ textTransform: 'uppercase' }}
									onChange={(e) => stateChanged(e.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col w-full">
								<label htmlFor="">Cidade</label>
								<Input
									type="text"
									name="city"
									placeholder="Cidade"
									onChange={(e) => setCity(e.target.value)}
									required
								/>
							</div>
						</div>
					)}
					<label htmlFor="">Sexo</label>
					<Select onChange={(e) => setSex(e.target.value)} required>
						<option value="" disabled selected>
							Selecione aqui
						</option>
						<option value="m">Masculino</option>
						<option value="f">Feminino</option>
						<option value="+">Não quero me manifestar</option>
					</Select>
					<label>Como você classifica sua cor?</label>
					<Select onChange={(e) => setColor(e.target.value)} required>
						<option value="" disabled selected>
							Selecione aqui
						</option>
						<option value="parda">Parda</option>
						<option value="branca">Branca</option>
						<option value="preta">Preta</option>
						<option value="indigena">Indígena</option>
						<option value="oriental">Oriental</option>
						<option value="+">Não quero me manifestar</option>
					</Select>
					<label htmlFor="">Associado AMPIC</label>
					<Select onChange={(e) => setAmpic(e.target.value)} required>
						<option value="" disabled selected>
							Selecione aqui
						</option>
						<option value="n">Não</option>
						<option value="s">Sim</option>
					</Select>
					<label htmlFor="">Nível de Escolaridade</label>
					<Select onChange={(e) => checkProfile(e.target.value)} required>
						<option value="" disabled selected>
							Selecione aqui
						</option>
						<option value="Educação infantil;jun">Educação Infantil</option>
						<option value="Anos iniciais do ensino fundamental;jun">
							Anos Iniciais do Ensino Fundamental
						</option>
						<option value="Anos finais do ensino fundamental;jov">
							Anos Finais do Ensino Fundamental
						</option>
						<option value="Ensino medio;jov">Ensino Médio</option>
						<option value="Ensino técnico;jov">Ensino Técnico</option>
						<option value="Ensino técnico;prof">Ensino Superior em andamento</option>
						<option value="Ensino Superior completo;prof">Ensino Superior completo</option>
						<option value="Especialista;prof">Especialista</option>
						<option value="Mestre;prof">Mestre</option>
						<option value="Doutor;prof">Doutor</option>
					</Select>
					{prof == 'prof' && (
						<>
							<label>Área de Atuação profissional</label>
							<SelectMult
								placeholder="Selecione"
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								options={options}
								onChange={(e) => especializationSelected(e)}
							/>
							<div style={{ marginBottom: 20 }} />
						</>
					)}
					<label htmlFor="">Possui alguma necessidade especial?</label>
					<Select onChange={(e) => setDef(e.currentTarget.value)} required>
						<option value="" disabled selected>
							Informe aqui
						</option>
						<option value="n">Não</option>
						<option value="s">Sim</option>
					</Select>
					{def == 's' && (
						<>
							<label htmlFor="">Que tipo(s) de necessidade(s)?</label>
							<SelectMult
								placeholder="Selecione"
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								options={defsTypes}
								onChange={(e) => defSelected(e)}
							/>
							<div style={{ marginBottom: 20 }} />
						</>
					)}
					<label htmlFor="">Você é fluente em qual(is) idioma(s)?</label>
					<SelectMult
						placeholder="Selecione"
						closeMenuOnSelect={false}
						components={animatedComponents}
						isMulti
						options={idiomasTypes}
						onChange={(e: any) => setFluent(e.map((it: any) => it.label).join())}
					/>
					<div style={{ marginBottom: 20 }} />
					<label htmlFor="">Senha</label>
					<span style={{ fontSize: 14, color: '#777' }}>A senha deve ter no mínimo:</span>
					<span style={{ fontSize: 14, color: '#777' }}>6 dígitos</span>
					<span style={{ fontSize: 14, color: '#777' }}>Letras maiúsculas e minúsculas.</span>
					<span style={{ fontSize: 14, color: '#777' }}>Números</span>
					<span style={{ fontSize: 14, color: '#777', marginBottom: 10 }}>
						Caracteres especiais {'@#&;*'}
					</span>
					<Input
						type="password"
						placeholder="Digite sua senha"
						id="pass"
						minLength={6}
						pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
						onChange={(e) => setPass(e.currentTarget.value)}
						required
					/>
					<label htmlFor="">Confirme sua senha</label>
					<Input
						type="password"
						placeholder="Digite sua senha novamente"
						id="pass_check"
						minLength={6}
						pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
						onChange={(e) => setPasConfirm(e.currentTarget.value)}
						required
					/>
					<h1>Faça parte da comunidade FEMIC</h1>
					<h4>Envie sua foto</h4>
					<div className="image-upload">
						<label htmlFor="photo">Clique aqui</label>
						<Input type="file" onChange={(e) => fileSelected(e)} accept="image/*" required />
					</div>
					<div className="m-4">
						<input
							type="checkbox"
							style={{ marginRight: 10 }}
							onChange={() => setValidateTerms(!validateTerms)}
						/>
						<label htmlFor="">
							Concordo com as{' '}
							<Link passHref href="https://femic.com.br/politica-de-privacidade/">
								<a target="_blank">regras e políticas de privacidade</a>
							</Link>{' '}
							da FEMIC.
						</label>
					</div>
					<SubmitButton type="submit">Cadastrar</SubmitButton>
					<a href="/">Já sou cadastrado.</a>
				</form>
			</LayoutForm>
		</>
	);
}
