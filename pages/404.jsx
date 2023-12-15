import { useRouter } from 'next/router';

export default function Custom404() {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center flex-1 h-screen w-screen">
			<h1 className="font-semibold text-8xl">404!</h1>
			<h2 className="font-semibold text-5xl my-4">Oops! pagina não encontrada</h2>
			<button
				className="text-white text-2xl font-semibold px-4 py-3 rounded"
				style={{ backgroundColor: '#1FB58F' }}
				onClick={() => router.back()}>
				Voltar de onde estava
			</button>
		</div>
	);
}
