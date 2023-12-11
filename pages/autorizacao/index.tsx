import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiXCircle } from 'react-icons/fi';
import { ContainerAutorization, Division } from '../../styles/autorizacao';

export default function Autorization() {
	const router = useRouter();

	return (
		<ContainerAutorization>
			<button className="exit" onClick={() => router.push('/')}>
				<FiXCircle size={36} color="#333" />
			</button>
			<Division>
				<h1>TERMO DE AUTORIZAÇÃO PARA CRIANÇAS E ADOLESCENTES </h1>
				<h3>
					Estudantes com até 18 anos de idade precisam de autorização dos pais ou responsáveis para
					participar da FEMIC.
				</h3>
				<a className="documento" href="/termos.pdf" target="_blank" download>
					termos.pdf
				</a>
				<p style={{ marginTop: 20, textAlign: 'center' }}>
					Preencha, assine e salve seu termo de autorização em formato PDF.
					<br /> Depois, clique em AVANÇAR.
				</p>
			</Division>
			<div className="btns flex flex-row items-center justify-center my-7">
				<a href="/termos.pdf" target="_blank" download rel="noreferrer">
					<button style={{ backgroundColor: '#1FB58F' }}>Baixar</button>
				</a>
				<Link href="/autorizacao/envio" passHref>
					<button style={{ backgroundColor: '#EAB126' }}> Avançar</button>
				</Link>
			</div>
		</ContainerAutorization>
	);
}
