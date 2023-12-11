import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiClipboard, FiSettings } from 'react-icons/fi';
import { ContainerMobile, Item } from './styles';

export default function MenuMobile() {
	const [color, setColor] = useState<string>('#1FB58F');
	const [page, setPage] = useState<string | null>();

	useEffect(() => {
		setColor(sessionStorage.getItem('color') || '#1FB58F');
		setPage(sessionStorage.getItem('page'));
	}, []);

	return (
		<ContainerMobile color={color}>
			<Link href={`/home/${page}`} replace shallow passHref>
				<Item>
					<label>Projetos</label>
					<FiClipboard size={24} color="#fff" />
				</Item>
			</Link>
			<Link href="/perfil" passHref>
				<Item>
					<label>Perfil</label>
					<FiSettings size={24} color="#fff" />
				</Item>
			</Link>
		</ContainerMobile>
	);
}
