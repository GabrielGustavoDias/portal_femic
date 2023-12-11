import { useState, useEffect, ChangeEvent } from 'react';
import { ContainerAutorizationSend, Division } from '../../styles/autorizacao';
import { Input } from '../../styles/layout/styles';

import api from '../../config/api';
import { FiXCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function EnvioTermo() {
	const [termos, setTermos] = useState<any>({});
	const [document, setDocument] = useState<Blob | ''>('');

	const router = useRouter();

	useEffect(() => {
		api
			.get('user/termos/', {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((response) => {
				setTermos(response.data);
			});
	}, []);

	const sendNewTerms = () => {
		const formData = new FormData();
		formData.append('doc', document);
		api
			.post('user/termos/cadastro', formData, {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((response) => {
				alert('Documento enviado com sucesso');
				window.location.reload();
			})
			.catch((err) => {
				alert('Você deve inserir arquivo no formato PDF e no tamanho de até 2 MB');
				console.warn(err);
			});
	};

	function fileSelected(event: ChangeEvent) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || !files[0]) return;

		setDocument(files[0]);
	}
	return (
		<ContainerAutorizationSend>
			<button className="exit" onClick={() => router.push('/')}>
				<FiXCircle size={36} color="#333" />
			</button>
			<h1>
				TERMO DE AUTORIZAÇÃO PARA CRIANÇAS E ADOLESCENTES FEMIC – FEIRA MINEIRA DE INICIAÇÃO
				CIENTÍFICA
			</h1>
			<div className="content-terms-send">
				<div className="flex flex-col">
					<label>Tipo de arquivo permitido: PDF</label>
					<Input type="file" onChange={(e) => fileSelected(e)} accept=".pdf" />
				</div>
				<button onClick={sendNewTerms}>Enviar</button>
			</div>
			{termos.document_ref && (
				<div className="backup">
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://apiportal.femic.com.br/user/termos/doc/${termos.document_ref}`}
						download>
						<span className="document_in">{termos.document_ref}</span>
					</a>
					<span className="label">
						Aguardando conferência pela coordenação da FEMIC. Prazo de até 2 dias uteis.
					</span>
				</div>
			)}
		</ContainerAutorizationSend>
	);
}
