import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiClipboard, FiSettings, FiX, FiFolder } from 'react-icons/fi';
import { ContainerMobile, Item } from './styles';

export default function MenuMobileAffiliate() {
  const [color, setColor] = useState('#1FB58F');
  const [page, setPage] = useState();

  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
    setPage(sessionStorage.getItem('page'));
  }, []);

  return (
    <ContainerMobile color={color}>
      <Link href="/home/feira" passHref>
        <Item>
          <label>Projetos</label>
          <FiClipboard size={24} color="#fff" />
        </Item>
      </Link>
      <Link href={`/feirahistorico`} passHref>
        <Item>
          <label>Histórico</label>
          <FiFolder size={24} color="#fff" />
        </Item>
      </Link>
      <Link href="/feiraperfil" passHref>
        <Item>
          <label>Perfil</label>
          <FiSettings size={24} color="#fff" />
        </Item>
      </Link>
    </ContainerMobile>
  );
}
