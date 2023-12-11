import Link from 'next/link';
import SelectMult from 'react-select';
import makeAnimated from 'react-select/animated';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import { FiPaperclip, FiCamera, FiImage } from 'react-icons/fi';
import { Loading, Modal, Text } from '@nextui-org/react';

import api, { baseUrl } from '../config/api';

import LayoutBase from '../styles/layout/base';
import { Input, Select } from '../styles/layout/styles';
import { UpdateProfileForm, LabelFile, ProfileContainer } from '../styles/user/perfil';
import { defsTypes, idiomasTypes, formationTypes } from '../utils/user';

const animatedComponents = makeAnimated();

export default function Perfil() {
	const [color, setColor] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [verifyNewPass, setVerifyNewPass] = useState('');
	const [image, setImage] = useState<string | any>('');
	const [disabled, setDisabled] = useState(false);
	const [visible, setVisible] = useState(false);
	const [preview, setPreview] = useState<string | undefined>('');

	const alert = useAlert();

	const router = useRouter();

	const { register, handleSubmit, watch, setValue, reset } = useForm({
		mode: 'onBlur',
  });

	const [avatar, setAvatar] = useState('');

	useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
  
		if (!sessionStorage.getItem('token')) {
			alert.show('Faça login novamente');
			router.push('/');
		}

		api
			.get('/user/profile', {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((response) => {
        console.log(response.data);
        reset(response.data);
			})
			.catch((err) => {
				console.error(err);
				if (err.code == 'ERR_NETWORK') {
					alert.error('Servidor está fora do ar, tente novamente mais tarde');
				}
			});
		setAvatar(sessionStorage.getItem('avatar') || '');
	}, []);

	useEffect(() => {
		if (!image) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	const renderModality = () => {
		if (watch('modality') == 'jov') {
			return 'Jovem';
		} else if (watch('modality') == 'jun') {
			return 'Junior';
		} else if (watch('modality') == 'prof') {
			return 'Mais';
		}
	};

	const updateProfile = (data: any) => {
		setDisabled(true);
		if (!watch('fluent')) {
			alert.error('Precisa saber pelo menos 1 lingua');
			setDisabled(false);
			return;
		}

		const dataRequest = {
			email: data['email'],
			number: data['number'],
			color: data['color'],
			sex: data['sex'],
			country: data['country'],
			state: data['state'],
			city: data['city'],
			associated_ampic: data['associated_ampic'],
			especial: data['especial'],
			especial_type: data['especial_type'],
			fluent: data['fluent'],
		};

		api
			.patch('/user/profile', dataRequest, {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((res) => {
				alert.success('Dados atualizados com sucesso.');
				setDisabled(false);
			})
			.catch((err) => {
				if (err.response.status == 400) {
					alert.error('Este email já está sendo utilizado por outra pessoa');
				} else {
					alert.error(
						'Você precisa preencher corretamente todos os campos. Confira atentamente todas as informações prestadas.'
					);
				}
				setDisabled(false);
			});
	};

	const renderDate = () => {
		const date = new Date(watch('date_nas'));
		date.setDate(date.getDate() + 1);
		return date.toLocaleDateString();
	};

	const updatePassword = (e: any) => {
		e.preventDefault();
		setDisabled(true);
		api
			.patch(
				'/user/update/password',
				{ oldPass, newPass, verifyNewPass },
				{
					headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
				}
			)
			.then((res) => {
				alert.success('Senha alterada com sucesso');
				setDisabled(false);
			})
			.catch((err) => {
				console.log(err);
				setDisabled(false);
				alert.error(err.response.data.message);
			});
	};

	const onChangePhoto = (e: any) => {
		e.preventDefault();
		let files;
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}
		setImage(files[0]);
		var reader = new FileReader();
		var url = reader.readAsDataURL(files[0]);
		setPreview(`${url}`);
	};

	const updatePhoto = () => {
		if (!image) {
			alert.error('Selecione uma imagem');
			return;
		}
		const dataPhoto = new FormData();
		dataPhoto.append('photo', image);
		api
			.patch('user/profile/photo', dataPhoto, {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((res) => {
				console.log('imagem alterada');
				sessionStorage.setItem('avatar', `${baseUrl}/user/profile/image/${res.data.image}`);
				setAvatar(sessionStorage.getItem('avatar') || '');
				setVisible(false);
			})
			.catch((err) => {
				alert.error('Deu erro');
				console.warn(err);
				setVisible(false);
			});
	};

	return (
		<LayoutBase title="Perfil">
			<ProfileContainer>
				<div className="content-profile">
					<div className="content-image">
						<img alt="Perfil de usuário" width="200" height="200" className="image" src={avatar} />
						<button onClick={() => setVisible(true)}>
							<FiCamera size={18} color="#233" style={{ marginRight: 8 }} /> Editar
						</button>
						<Modal
							closeButton
							blur
							aria-labelledby="modal-title"
							open={visible}
							onClose={() => setVisible(false)}>
							<Modal.Header>
								<Text id="modal-title" size={18}>
									Selecione a nova foto
								</Text>
							</Modal.Header>
							<Modal.Body>
								<div className="flex flex-col items-center">
									<p className="text-sm text-gray-800">Tamanho máximo da imagem de 7MB</p>
									<p className="text-sm text-gray-800">Formatos: .png, .jpg, .jpeg, .svg</p>
									<LabelFile htmlFor="photo-up" className="mt-5">
										Arquivo: <FiImage size={18} style={{ marginLeft: 5 }} color="#fff" />
									</LabelFile>
									<input
										id="photo-up"
										type="file"
										onChange={onChangePhoto}
										style={{ display: 'none' }}
										accept="image/png, image/jpeg image/webp"
									/>
									{image && (
										<img src={preview} className="rounded w-32 h-32 mt-5" alt="Preview photo" />
									)}
									{image && (
										<button className="mt-5" onClick={updatePhoto}>
											<LabelFile>Salvar foto</LabelFile>
										</button>
									)}
								</div>
							</Modal.Body>
						</Modal>
					</div>
				</div>
				<div className="infos md:flex-row flex-col">
					<div className="flex flex-col name">
						<h2 className="font-semibold text-2xl">{watch('name')}</h2>
						<h3 className="text-base mb-1 text-slate-500">
							Participante desde {new Date(watch('singUp_date')).toLocaleDateString()}
						</h3>
					</div>
					<div className="flex flex-col">
						<p>CPF: {watch('identifier')}</p>
						<p>Data de Nascimento: {renderDate()}</p>
						<p className="flex items-center">
							<FiPaperclip color="#333" size={18} />
							FEMIC {renderModality()}
						</p>
					</div>
				</div>
			</ProfileContainer>
			<UpdateProfileForm onSubmit={handleSubmit(updateProfile)}>
				<h1>Atualizar perfil de usuário</h1>
				<label htmlFor="">E-mail</label>
				<Input type="email" placeholder="example@email.com" required {...register('email')} />
				<label htmlFor="">Telefone</label>
				<Input type="text" placeholder="(00) 9 9999-9999" required {...register('number')} />
				<label>Como você classifica sua cor?</label>
				<Select {...register('color')} required>
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
				<label>Sexo</label>
				<Select {...register('sex')} required>
					<option value="" disabled selected>
						Selecione aqui
					</option>
					<option value="m">Masculino</option>
					<option value="f">Feminino</option>
					<option value="+">Não quero me manifestar</option>
				</Select>
				<label htmlFor="">País</label>
				<Input type="text" placeholder="País" required {...register('country')} />
				<div className="flex w-full flex-row justify-between">
					<div className="flex flex-col mr-2">
						<label htmlFor="">Estado</label>
						<Input type="text" maxLength={2} size={2} required {...register('state')} />
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="">Cidade</label>
						<Input type="text" required {...register('city')} />
					</div>
				</div>
				<label htmlFor="">Associado AMPIC</label>
				<Select {...register('associated_ampic')}>
					<option value="" disabled selected>
						Selecione aqui
					</option>
					<option value="n">Não</option>
					<option value="s">Sim</option>
				</Select>
				<label htmlFor="">Nível de Escolaridade</label>
				<div className="flex items-center">
					<Input placeholder={`${watch('school')} (Este item não pode ser modificado)`} disabled />
					<span className="ml-5 text-sm">
						Para atualizar a sua escolaridade entre em contato com a FEMIC.{' '}
						<Link href="https://femic.com.br/contato/">
							<a>Clique aqui</a>
						</Link>
					</span>
				</div>
        <label htmlFor="">Formação </label>
						<SelectMult
							placeholder="Selecione"
							defaultValue={formationTypes.filter((e: any) => watch('formation')?.includes(e.label))}
							closeMenuOnSelect={false}
							components={animatedComponents}
							isMulti
							options={formationTypes}
							styles={{
								control: (theme) => ({
									display: 'flex',
									borderBottom: '2px solid #333',
									marginBottom: 28,
								}),
							}}
							onChange={(e: any) => setValue('formation', e.map((it: any) => it.label).join())}
						/>

				<label htmlFor="">Possui alguma necessidade especial?</label>
				<Select {...register('especial')}>
					<option value="n">Não</option>
					<option value="s">Sim</option>
				</Select>
				{watch('especial') == 's' && (
					<>
						<label htmlFor="">Que tipo(s) de necessidade(s)?</label>
						<SelectMult
							placeholder="Selecione"
							defaultValue={defsTypes.filter((e: any) => watch('especial_type')?.includes(e.label))}
							closeMenuOnSelect={false}
							components={animatedComponents}
							isMulti
							options={defsTypes}
							styles={{
								control: (theme) => ({
									display: 'flex',
									borderBottom: '2px solid #333',
									marginBottom: 28,
								}),
							}}
							onChange={(e: any) => setValue('especial_type', e.map((it: any) => it.label).join())}
						/>
					</>
				)}
				<label htmlFor="">Você é fluente em qual(is) idioma(s)?</label>
				{watch('fluent') && (
					<SelectMult
						placeholder="Selecione"
						defaultValue={idiomasTypes.filter((e: any) => watch('fluent')?.includes(e.label))}
						closeMenuOnSelect={false}
						components={animatedComponents}
						isMulti
						isClearable={false}
						options={idiomasTypes}
						styles={{
							control: (theme) => ({
								display: 'flex',
								borderBottom: '2px solid #333',
								marginBottom: 28,
							}),
						}}
						onChange={(e: any) => setValue('fluent', e.map((it: any) => it.label).join())}
					/>
				)}
				<button
					type="submit"
					style={{ backgroundColor: color }}
					disabled={disabled}
					className="update">
					{disabled? <Loading color="white"/> :'Salvar alterações'}
				</button>
			</UpdateProfileForm>
			<UpdateProfileForm onSubmit={updatePassword}>
				<h1>Alterar senha</h1>
				<label>Senha antiga</label>
				<Input
					type="password"
					onChange={(e) => setOldPass(e.target.value)}
					minLength={6}
					placeholder="Digite aqui sua senha antiga"
					required
					pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
				/>
				<label>Senha nova</label>
				<Input
					type="password"
					onChange={(e) => setNewPass(e.target.value)}
					minLength={6}
					placeholder="Digite aqui a nova senha de login"
					required
					pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
				/>
				<label>Repita a nova senha</label>
				<Input
					type="password"
					onChange={(e) => setVerifyNewPass(e.target.value)}
					placeholder="Repita a nova senha aqui"
					minLength={6}
					required
					pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
				/>
				<button
					type="submit"
					style={{ backgroundColor: color }}
					disabled={disabled}
					className="update">
					{disabled? <Loading color="white"/> :'Alterar senha'}
				</button>
			</UpdateProfileForm>
			<h1>Privacidade</h1>
			<Link href="/desativar" passHref>
			<a className="text-red-500">	
			Desativar minha conta
			</a>
			</Link>
		</LayoutBase>
	);
}
