import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FiAward,
  FiClipboard,
  FiFileText,
  FiSettings,
  FiRotateCcw,
  FiCamera,
} from 'react-icons/fi';
import { ContainerBase, Label, NavGroup } from './styles';

export default function SideBar() {
  const [color, setColor] = useState < string > '#1FB58F';
  const [page, setPage] = useState < string > '';
  const [active, setActive] = useState('');
  const [profiles, setProfiles] = useState(['']);

  const router = useRouter();

  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
    setPage(sessionStorage.getItem('page') || '');
    setActive(router.asPath.split('/')[router.asPath.split('/').length - 2]);

    if (sessionStorage.getItem('profiles_json')) {
      const profilesString = sessionStorage.getItem('profiles_json') || '';
      const profilesObj = JSON.parse(profilesString);
      setProfiles(profilesObj.map((prof) => prof.value));
    }

    setActive(router.asPath.split('/')[router.asPath.split('/').length - 1]);
  }, []);

  return (
    <ContainerBase color={color}>
      <Link href={`/home/${page}`} passHref>
        <NavGroup active={active == 'home'}>
          <FiClipboard size={24} color="#fff" />
          <Label active={active == 'home'}>Projetos</Label>
        </NavGroup>
      </Link>
      {'crc,avaliador,jovem,mais,junior,orientador'.includes(page) && (
        <Link href={`/historico/${page}`} passHref>
          <NavGroup active={active == 'historico'}>
            <FiRotateCcw size={24} color="#fff" />
            <Label>Histórico</Label>
          </NavGroup>
        </Link>
      )}
      {'avaliador,'.includes(page) && (
        <Link href={`/videoconferencias`} passHref>
          <NavGroup active={active == 'videoconferencias'}>
            <FiCamera size={24} color="#fff" />
            <Label>Videoconferências</Label>
          </NavGroup>
        </Link>
      )}
      <Link href="/certificados" passHref>
        <NavGroup active={active == 'certificados'}>
          <FiFileText size={24} color="#fff" />
          <Label>Certificados</Label>
        </NavGroup>
      </Link>
      <Link href="/perfil" passHref>
        <NavGroup active={active == 'perfil'}>
          <FiSettings size={24} color="#fff" />
          <Label>Perfil</Label>
        </NavGroup>
      </Link>
      <Link onClick={() => window.location.reload()} href="/cursos" passHref>
        <NavGroup active={active == 'cursos'}>
          <FiAward size={24} color="#fff" />
          <Label>Cursos</Label>
        </NavGroup>
      </Link>
    </ContainerBase>
  );
}
