import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiClipboard, FiSettings, FiFolder } from 'react-icons/fi';

import { ContainerBase, Label, NavGroup } from './styles';

export default function SideBar() {
  const [color, setColor] = useState('#1FB58F');
  const [active, setActive] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getColor = sessionStorage.getItem('color') || '#1FB58F';
    setColor(getColor);
    setActive(router.asPath.split('/')[router.asPath.split('/').length - 2]);
    if (
      router.asPath.split('/')[router.asPath.split('/').length - 1] ==
      'feiraperfil'
    ) {
      setActive('feiraperfil');
    }
  }, []);

  return (
    <ContainerBase color={color}>
      <Link href="/home/feira" passHref>
        <NavGroup
          style={active == 'home' ? { backgroundColor: '#54545460' } : {}}>
          <FiClipboard size={24} color="#fff" />
          <Label>Projetos</Label>
        </NavGroup>
      </Link>
      <Link href="/historico/feira" passHref>
        <NavGroup
          style={active == 'historico' ? { backgroundColor: '#54545460' } : {}}>
          <FiFolder size={24} color="#fff" />
          <Label>Histórico</Label>
        </NavGroup>
      </Link>
      <Link href="/feiraperfil" passHref>
        <NavGroup
          style={
            active == 'feiraperfil' ? { backgroundColor: '#54545460' } : {}
          }>
          <FiSettings size={24} color="#fff" />
          <Label>Perfil</Label>
        </NavGroup>
      </Link>
    </ContainerBase>
  );
}
