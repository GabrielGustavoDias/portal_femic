import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { ContainerAutorizationAdult } from '../../styles/autorizacao';

export default function AdultoAutorizacao() {
	const [UserName, setName] = useState('');
	const [UserIdentifier, setIdentifier] = useState('');
	const [UserDateNas, setDateNas] = useState('');

	const router = useRouter();

	useEffect(() => {
		api
			.get('/user/profile', {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((res) => {
				const { name, identifier, date_nas } = res.data;
				setName(name);
				setIdentifier(identifier);
				setDateNas(date_nas);
			});
	}, []);

	const submitTerms = (e: any) => {
		e.preventDefault();
		api
			.get('/user/termos/adulto', {
				headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
			})
			.then((response) => {
				const res = confirm(
					'Recebemos seu cadastro com sucesso.\nVocê será direcionado para a tela inicial para fazer login novamente.'
				);
				if (res) {
					router.push('/login');
				} else {
				}
			});
	};

	return (
		<ContainerAutorizationAdult>
			<h1>TERMO DE AUTORIZAÇÃO FEMIC – FEIRA MINEIRA DE INICIAÇÃO CIENTÍFICA </h1>
			<div className="term-text">
				<p>
					Pelo presente termo, eu, {UserName}, inscrito no CPF: {UserIdentifier}, data de
					nascimento: {new Date(UserDateNas).toLocaleDateString()}, em razão do interesse em
					participar da FEMIC (Feira Mineira de Iniciação Científica), AUTORIZO, a utilização, pela
					FEMIC e parceiras, dos dados pessoais essenciais para a realização das atividades, como
					uso de minha imagem e voz em vídeo ou áudio, uso de obras produzidas, a título gratuito
					por tempo indeterminado em território nacional e exterior.
				</p>
				<p>
					I. A autorização acima concedida poderá ser revogada a qualquer tempo por meio do link:{' '}
					<a href="http://portal.femic.com.br" rel="noopener noreferrer" target="_blank">
						http://portal.femic.com.br
					</a>
					, mas, nesse caso, o menor perderá o direito à participação da FEMIC bem como a seus
					benefício
				</p>
				<p>
					II. Além da autorização essencial acima, AUTORIZO o compartilhamento de meus dados
					pessoais como uso da imagem e voz em vídeo ou áudio, uso de obras por mim produzidas, a
					título gratuito, por tempo indeterminado em território nacional e exterior para fins de
					campanha publicitária da FEMIC e parceiras, sendo certo que tal autorização poderá ser
					revogada a qualquer tempo sem prejuízo.
				</p>
				<p>
					III. Diante dos termos acima, reconheço que fui orientado a respeito das finalidades do
					tratamento dos dados fornecidos à FEMIC e da possibilidade de revogação do meu
					consentimento a qualquer momento, ciente das consequências de cada revogação.{' '}
				</p>
				<p>
					IV. Declaro ter ciência de que a participação em quaisquer eventos da FEMIC deverá ocorrer
					seguindo as boas normas e urbanidade e que, portanto, agirei sempre de forma respeitosa e
					descente diante dos eventos.
				</p>
				<p>
					V. Pelo presente instrumento, declaro que submeterei à FEMIC somente projetos originais e
					de autoria ou coautoria própria.
				</p>
				<p>
					VI. Declaro ter total conhecimento e compreensão de que a FEMIC não admitirá plágio,
					fraudes científicas quaisquer más condutas nas pesquisas realizadas ou durante a exposição
					de projetos e que, caso ocorra quaisquer dessas condutas, os projetos serão
					desclassificados e não poderão concorrer a prêmios.
				</p>
				<p>
					VII. Por fim, declaro ter ciência e estar de acordo com as Regras e Políticas de
					Privacidade da FEMIC, disponíveis no site https://femic.com.br/politica-de-privacidade/.
				</p>
			</div>
			<form onSubmit={submitTerms} className="confirma">
				<label>
					<input type="checkbox" required style={{ marginRight: 10 }} />
					Declaro que li e entendi as informações acima
				</label>
				<label>
					<input type="checkbox" required style={{ marginRight: 10 }} />
					Autorizo minha participação na FEMIC, conforme termos e condições apresentadas acima.
				</label>
				<button type="submit">Confirmar</button>
			</form>
		</ContainerAutorizationAdult>
	);
}
