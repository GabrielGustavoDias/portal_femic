import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import api from '../../config/api';

import { Form } from '../../styles/projetos/styles.module';

import LayoutBase from '../../styles/layout/base';

export default function Confirmacao() {
	const [color, setColor] = useState('#1FB58F');

	const alert = useAlert();

	useEffect(() => {
		setColor(sessionStorage.getItem('color') || '#1FB58F');
		api.get(`/project/getserverside/${sessionStorage.getItem('project_id')}`).then((res) => {
			const data = {
				banner: res.data.banner || '',
				keywords_string: res.data.keywords.join(),
				link_yt: res.data.link_yt || '',
				relatorio: res.data.relatorio || '',
				short_desc: res.data.short_desc || '',
				resumo: res.data.resume || '',
			};
			// reset(data);
		});
	}, []);

	const { register, handleSubmit, watch, reset, setValue } = useForm({
		mode: 'onBlur',
	});

	const router = useRouter();

	const sendConfirm = (data: any) => {
		const formData = new FormData();

		formData.append('id', sessionStorage.getItem('project_id') || '');
		formData.append('keywords', data['keywords_string']);
		formData.append('resume', data['resumo']);
		formData.append('short_desc', data['short_desc']);
		formData.append('link_yt', data['link_yt']);
		formData.append('banner', data['banner']);
		formData.append('relatorio', data['relatorio']);

		console.log(data['banner']);
		console.log(data['relatorio']);
		
		api
			.post(`/project/confirmation`, formData, {
				headers: {
					'Content-Type': `multipart/form-data`,
				},
			})
			.then((res) => {
				alert.success('dados enviados com sucesso');
			})
			.catch((err: any) => {
				console.log(err.response.data);
				alert.error(err.response?.data.message);
			});
	};

	return (
		<LayoutBase title="Confirmação de participação">
			<Form onSubmit={handleSubmit(sendConfirm)}>
				<div className="flex flex-col">
					<label>Resumo científico atualizado</label>
					<span className="sub-label">Mínimo de 1500 e máximo de 2000 caracteres com espaço.</span>
					<span className="sub-label">
						Dicas e informações para elaborar seu resumo:{' '}
						<a href="https://youtu.be/xMEiQkPdoaA">clique aqui</a>
					</span>
					<textarea
						rows={4}
						{...register('resumo')}
						minLength={1500}
						maxLength={2000}
						required></textarea>
				</div>
				<div className="flex flex-col">
					<label htmlFor="">Palavras-chaves atualizadas</label>
					<span className="sub-label">Separe com vírgulas.</span>
					<input
						type="text"
						placeholder="palavra1, palavra2"
						{...register('keywords_string')}
						required
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="">Breve descrição do Projeto</label>
					<span className="sub-label">
						Para apresentação do projeto em redes sociais, mídias e canais de comunicação da FEMIC e
						parceiros. Deverá ter entre 100 e 500 caracteres com espaço.
					</span>
					<textarea {...register('short_desc')} maxLength={500} minLength={100} rows={3} required />
				</div>

				<div className="flex flex-col">
					<label htmlFor="">Link do vídeo de apresentação do projeto no YouTube</label>
					<span className="sub-label">O vídeo deverá estar no modo público. </span>
					<span className="sub-label">
						Dicas e informações para elaborar seu vídeo:{' '}
						<a href="https://youtu.be/2rT-o_do540">clique aqui</a>
					</span>
					<input
						type="url"
						placeholder="https://youtu.be/xxxxxxxx"
						{...register('link_yt')}
						required
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="">Insira o pôster/banner científico do projeto</label>
					<span className="sub-label">Tamanho máximo: 2 MB. | Tipo de arquivo permitido: .pdf</span>
					<span className="sub-label">
						Dicas e informações para elaborar seu pôster:{' '}
						<a href="https://youtu.be/ZpDmvPn_qn8">clique aqui</a>
					</span>
					<input
						type="file"
						onChange={(e: any) => setValue('banner', e.target.files[0])}
						accept=".pdf"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="">Insira o Relatório científico do projeto</label>
					<span className="sub-label">Tamanho máximo: 2 MB. | Tipo de arquivo permitido: PDF</span>
					<span className="sub-label">
						Dicas e informações para elaborar seu relatório:{' '}
						<a href="https://youtu.be/Xr-0hXXhTBg">clique aqui</a>
					</span>
					<input
						type="file"
						onChange={(e: any) => setValue('relatorio', e.target.files[0])}
						accept=".pdf"
						required
					/>
				</div>
				<button
					type="submit"
					className="button-project"
					style={{ marginLeft: 0, backgroundColor: color }}>
					Enviar
				</button>
			</Form>
		</LayoutBase>
	);
}
