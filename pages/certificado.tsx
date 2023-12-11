import { useState } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

import NavBar from '../components/NavBar';

import api from '../config/api';

import {
	ContainerCertificate,
	SearchInput,
	SearchButton,
	ContainerProject,
} from '../styles/certificados';

export default function Certificado() {
	const [project, setProject] = useState<any | null>(null);
	const [user, setUser] = useState<any | null>(null);
	const [err, setErr] = useState(false);

	const searchCertificate = (e: any) => {
		e.preventDefault();
		setErr(false);
		setProject({});
		setUser({});

		api
			.get(`/certificate/find/${e.target[0].value}`)
			.then((res) => {
				if (res.data.type == 'project') {
					setProject(res.data.content);
				} else {
					setUser(res.data.content);
				}
			})
			.catch((err) => {
				setErr(true);
			});
	};

	const renderProfileLabel = (text: string) => {
		if (text == 'crc') {
			return 'CRC';
		} else {
			return text.charAt(0) + text.slice(1);
		}
	};
	return (
		<div className="w-full h-full">
			<NavBar />
			<ContainerCertificate>
				<h2 className="text-2xl text-green-500 text-bold mt-5">AUTENTICAÇÃO DE CERTIFICADOS</h2>
				<h3>
					Digite o código de validação que aparece no certificado para conferir autenticidade.
				</h3>
				<form onSubmit={searchCertificate} className="flex">
					<SearchInput />
					<SearchButton>
						<FiSearch size={24} color="#fff" />
					</SearchButton>
				</form>
			</ContainerCertificate>
			{project?.id && (
				<ContainerProject>
					<h1 className="text-green-500">Certificado válido</h1>
					<span style={{ fontSize: 22 }} className="text-gray-700">
						{project.titulo}
					</span>
					<span style={{ fontSize: 18 }}>Participantes: {project.participantes}</span>
					<Link href={`/projeto/${project._id}`}>
						<a
							className="px-4 py-2 rounded text-white mt-3"
							style={{ backgroundColor: '#1FB58F', fontSize: 18 }}>
							Ver Projeto
						</a>
					</Link>
				</ContainerProject>
			)}
			{user?.user_name && (
				<ContainerProject>
					<h1 className="text-green-500">Certificado válido</h1>
					<span style={{ fontSize: 18 }}>
						{renderProfileLabel(user.value)}: {user.user_name}
					</span>
				</ContainerProject>
			)}
			{err && (
				<ContainerProject>
					<h1 className="text-red-600">Oops!</h1>
					<span>Este código não corresponde a nem um dos nossos certificados :(</span>
				</ContainerProject>
			)}
		</div>
	);
}
