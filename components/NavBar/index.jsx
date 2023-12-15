import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { Modal, Row, Text, Button, Dropdown } from '@nextui-org/react';
import { SessionButton, ButtonAlt, Container } from './styles';
import { useState } from 'react';

import logo from '../../public/imagens/femic_logo.png';
import { FaArrowCircleDown, FaChevronDown, FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function NavBar() {
  const [visible, setVisible] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const router = useRouter();
  return (
    <Container>
      <button
        className="btn-mobile-menu"
        onClick={() => setVisibleMenu(!visibleMenu)}>
        <FiMenu color="#333" size={22} />
      </button>
      <Modal
        scroll
        fullScreen
        closeButton
        open={visibleMenu}
        onClose={() => setVisibleMenu(false)}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Portal FEMIC está em fase{' '}
            <a
              target="_blank"
              style={{ backgroundColor: '#F24C4E' }}
              className="text-white py-1 px-2 rounded cursor-pointer"
              href="https://femic.com.br/contato/"
              rel="noreferrer">
              Beta
            </a>
          </Text>
        </Modal.Header>
        <Modal.Body
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ul className="menu-mobile">
            <li>
              <button onClick={() => setVisibleMenu(false)}>Inicio</button>
            </li>
            <li>
              <Dropdown isBordered>
                <Dropdown.Button
                  auto
                  light
                  css={{
                    px: 0,
                    dflex: 'center',
                    svg: { pe: 'none' },
                    fontSize: 18,
                  }}
                  iconRight={<FaChevronDown size={12} color="#333" />}
                  ripple={false}>
                  Projetos
                </Dropdown.Button>
                <Dropdown.Menu
                  selectionMode="single"
                  css={{
                    minWidth: 300,
                  }}
                  onSelectionChange={(e) =>
                    router.push(`/lista/${e.currentKey}`)
                  }>
                  <Dropdown.Item
                    key="jovem"
                    icon={<FaUsers size={24} color="#333" />}
                    hasChildItems>
                    Jovem
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="mais"
                    icon={<FaUsers size={24} color="#333" />}
                    hasChildItems>
                    Mais
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="junior"
                    icon={<FaUsers size={24} color="#333" />}
                    hasChildItems>
                    Júnior
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="c_humanas"
                    icon={<FaUsers size={24} color="#333" />}
                    hasChildItems>
                    Ciências Humanas
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="engenharias"
                    icon={<FaUsers size={24} color="#333" />}>
                    Engenharias
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="c_saude"
                    icon={<FaUsers size={24} color="#333" />}>
                    Ciências da Saúde
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="c_agrarias"
                    icon={<FaUsers size={24} color="#333" />}>
                    Ciências Agrárias
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="c_biologicas"
                    icon={<FaUsers size={24} color="#333" />}>
                    Ciências Biológicas
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="c_exatas_terra"
                    icon={<FaUsers size={24} color="#333" />}>
                    Ciências Exatas e da Terra
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="c_sociais_aplicadas"
                    icon={<FaUsers size={24} color="#333" />}>
                    Ciências Sociais aplicadas
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="letras_letras_artes"
                    icon={<FaUsers size={24} color="#333" />}>
                    Linguística, Letras e Artes
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Link href="/certificado">
                <a style={{ color: '#333' }}>Certificados</a>
              </Link>
            </li>
            <li>
              <Link href="https://femic.com.br/">
                <a
                  target="_blank"
                  style={{ textDecoration: 'underline', color: '#333' }}
                  className="external">
                  FEMIC
                </a>
              </Link>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onClick={() => setVisibleMenu(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Link href="/" passHref>
        <a id="logo-header" className="cursor-pointer pointer">
          <Image
            src={logo}
            id="logo-header"
            height="60"
            width="180"
            alt="logo da femic"
          />
        </a>
      </Link>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <Link href="https://femic.com.br/">
            <a
              target="_blank"
              style={{ textDecoration: 'underline' }}
              className="external">
              FEMIC
            </a>
          </Link>
        </li>
        <li>
          <Dropdown isBordered>
            <Dropdown.Button
              auto
              light
              css={{
                px: 0,
                dflex: 'center',
                svg: { pe: 'none' },
                fontSize: 18,
              }}
              iconRight={<FaChevronDown size={12} color="#333" />}
              ripple={false}>
              Projetos
            </Dropdown.Button>
            <Dropdown.Menu
              selectionMode="single"
              css={{
                minWidth: 300,
              }}
              onSelectionChange={(e) => router.push(`/lista/${e.currentKey}`)}>
              <Dropdown.Item
                key="jovem"
                icon={<FaUsers size={24} color="#333" />}
                hasChildItems>
                Jovem
              </Dropdown.Item>
              <Dropdown.Item
                key="mais"
                icon={<FaUsers size={24} color="#333" />}
                hasChildItems>
                Mais
              </Dropdown.Item>
              <Dropdown.Item
                key="junior"
                icon={<FaUsers size={24} color="#333" />}
                hasChildItems>
                Júnior
              </Dropdown.Item>
              <Dropdown.Item
                key="c_humanas"
                icon={<FaUsers size={24} color="#333" />}
                hasChildItems>
                Ciências Humanas
              </Dropdown.Item>
              <Dropdown.Item
                key="engenharias"
                icon={<FaUsers size={24} color="#333" />}>
                Engenharias
              </Dropdown.Item>
              <Dropdown.Item
                key="c_saude"
                icon={<FaUsers size={24} color="#333" />}>
                Ciências da Saúde
              </Dropdown.Item>
              <Dropdown.Item
                key="c_agrarias"
                icon={<FaUsers size={24} color="#333" />}>
                Ciências Agrárias
              </Dropdown.Item>
              <Dropdown.Item
                key="c_biologicas"
                icon={<FaUsers size={24} color="#333" />}>
                Ciências Biológicas
              </Dropdown.Item>
              <Dropdown.Item
                key="c_exatas_terra"
                icon={<FaUsers size={24} color="#333" />}>
                Ciências Exatas e da Terra
              </Dropdown.Item>
              <Dropdown.Item
                key="c_sociais_aplicadas"
                icon={<FaUsers size={24} color="#333" />}>
                Ciências Sociais aplicadas
              </Dropdown.Item>
              <Dropdown.Item
                key="letras_letras_artes"
                icon={<FaUsers size={24} color="#333" />}>
                Linguística, Letras e Artes
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li>
          <Link href="/certificado">
            <a>Certificados</a>
          </Link>
        </li>
        <li>
          <a
            target="_blank"
            style={{ backgroundColor: '#F24C4E', color: '#FFF' }}
            href="https://femic.com.br/contato/"
            rel="noreferrer">
            Beta
          </a>
        </li>
      </ul>
      <div className="session">
        <SessionButton onClick={() => setVisible(true)}>
          Cadastrar
        </SessionButton>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={() => setVisible(false)}>
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Deseja se cadastrar
              <Text b size={18}>
                {' '}
                como:
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Row justify="space-between">
              <Link href="/cadastro/participante" passHref scroll shallow>
                <ButtonAlt>Participante</ButtonAlt>
              </Link>
              <Link href="/cadastro/feirafiliada" passHref>
                <ButtonAlt>Feira Afiliada</ButtonAlt>
              </Link>
            </Row>
          </Modal.Body>
        </Modal>
        <Link passHref href="/login">
          <ButtonAlt style={{ marginLeft: 7 }}>Entrar</ButtonAlt>
        </Link>
      </div>
    </Container>
  );
}
