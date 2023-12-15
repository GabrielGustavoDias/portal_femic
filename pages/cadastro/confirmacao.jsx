import { useRouter } from 'next/router';

export default function Confirmacao() {
	const router = useRouter();

	const navigate = () => {
		router.push('/login');
	};

	return (
		<div className="flex flex-1 flex-col items-center justify-center h-screen">
			<h1 style={{ fontSize: 36, fontWeight: 'bold' }}>Cadastrada com sucesso!</h1>
			<h3 style={{ fontSize: 20 }}>Este é o ID da sua feira:</h3>
			<p style={{ color: '#1FB58F', fontSize: 20 }}>{router.query.id}</p>
			<button
				style={{
					padding: '7px 12px',
					backgroundColor: '#EAB126',
					color: '#fff',
					fontWeight: 'bold',
				}}
				onClick={navigate}>
				Ir para página de LOGIN.
			</button>
		</div>
	);
}
