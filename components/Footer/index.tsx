import Link from 'next/link';
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

import { FooterContainer } from './styles';

export default function Footer() {
	return (
		<FooterContainer>
			<div className="flex flex-col items-center">
				<h1>
					Siga-nos nas
					<br />
					redes sociais
				</h1>
				<div className="flex flex-row icons space-between itens-center mt-2">
					<Link href="https://www.instagram.com/feirafemic/" passHref>
						<a className="icon" target="_blank">
							<FiInstagram color="#fff" size={24} />
						</a>
					</Link>
					<Link href="https://www.facebook.com/feirafemic/">
						<a className="icon" target="_blank">
							<FiFacebook color="#fff" size={24} />
						</a>
					</Link>
					<Link href="https://www.youtube.com/channel/UCir8GT2PT6hIK4INl7ubE8Q">
						<a className="icon" target="_blank">
							<FiYoutube color="#fff" size={24} />
						</a>
					</Link>
				</div>
			</div>
			<div className="flex flex-col links">
				<Link href="https://femic.com.br/sobre-a-femic-2/" passHref>
					<a target="_blank">Sobre a FEMIC</a>
				</Link>
				<Link href="https://femic.com.br/missao-visao-e-valores/" passHref>
					<a target="_blank">Missão e valores</a>
				</Link>
				<Link href="https://femic.com.br/quem-faz-a-femic/" passHref>
					<a target="_blank">Quem faz a FEMIC</a>
				</Link>
				<Link href="https://femic.com.br/contato/" passHref>
					<a target="_blank">Contato</a>
				</Link>
			</div>
			<div className="flex flex-1 itens-center justify-center">
				{/* eslint-disable-next-line @next/next/no-img-element*/}
				<img id="logo-femic" src="/imagens/femic_logo2x.png" width="320" alt="logo da femic" />
			</div>
		</FooterContainer>
	);
}
