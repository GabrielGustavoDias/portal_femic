import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { ContainerAdmin, NavGroup, NavItem } from './styles';

export default function AdminSideBar() {
  const [showParticipantes, setShowParticipantes] = useState(false);
  const [showProjetos, setShowProjects] = useState(false);
  const [showRank, setShowRank] = useState(false);

  const router = useRouter();

  return (
    <ContainerAdmin>
      <NavGroup onClick={() => setShowParticipantes(!showParticipantes)}>
        Participantes
        {showParticipantes ? (
          <FiChevronUp color="#fff" size={22} />
        ) : (
          <FiChevronDown color="#fff" size={22} />
        )}
      </NavGroup>
      {showParticipantes && (
        <>
          <Link href="/admin/participantes?user=jun" passHref>
            <NavItem>
              <span>Júnior</span>
            </NavItem>
          </Link>
          <Link href="/admin/participantes?user=jov" passHref>
            <NavItem>
              <span>Jovens</span>
            </NavItem>
          </Link>
          <Link href="/admin/participantes?user=prof" passHref>
            <NavItem>
              <span>Mais</span>
            </NavItem>
          </Link>
          <Link href="/admin/participantes?user=crc" passHref>
            <NavItem>
              <span>CRC</span>
            </NavItem>
          </Link>
          <Link href="/admin/participantes?user=avaliador" passHref>
            <NavItem>
              <span>Avaliadores</span>
            </NavItem>
          </Link>
        </>
      )}
      <NavGroup onClick={() => setShowProjects(!showProjetos)}>
        Projetos
        {showProjetos ? (
          <FiChevronUp color="#fff" size={22} />
        ) : (
          <FiChevronDown color="#fff" size={22} />
        )}
      </NavGroup>
      {showProjetos && (
        <>
          <Link href="/admin/projetos?proj=jun" passHref>
            <NavItem>
              <span>Júnior</span>
            </NavItem>
          </Link>
          <Link href="/admin/projetos?proj=jov" passHref>
            <NavItem>
              <span>Jovem</span>
            </NavItem>
          </Link>
          <Link href="/admin/projetos?proj=mais" passHref>
            <NavItem>
              <span>Mais</span>
            </NavItem>
          </Link>
        </>
      )}
      <NavGroup onClick={() => router.push('/admin/feirasafiliadas')}>
        Feira Afiliadas
      </NavGroup>

      <NavGroup onClick={() => router.push('/admin/rooms')}>
        Videoconferência
      </NavGroup>
      <NavGroup onClick={() => setShowRank(!showRank)}>
        Ranking
        {showRank ? (
          <FiChevronUp color="#fff" size={22} />
        ) : (
          <FiChevronDown color="#fff" size={22} />
        )}
      </NavGroup>
      {showRank && (
        <>
          <Link href="/admin/rank?proj=jun" passHref>
            <NavItem>
              <span>Júnior</span>
            </NavItem>
          </Link>
          <Link href="/admin/rank?proj=jov" passHref>
            <NavItem>
              <span>Jovem</span>
            </NavItem>
          </Link>
          <Link href="/admin/rank?proj=mais" passHref>
            <NavItem>
              <span>Mais</span>
            </NavItem>
          </Link>
        </>
      )}
      <NavGroup onClick={() => router.push('/admin/datas')}>
        Calendário
      </NavGroup>
      <NavGroup onClick={() => router.push('/admin/export')}>Exportar</NavGroup>
      <NavGroup onClick={() => router.push('/admin/cursos')}>Cursos</NavGroup>
    </ContainerAdmin>
  );
}
