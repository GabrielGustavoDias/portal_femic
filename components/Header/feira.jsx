import { useCallback, useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import { Dropdown } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { FiMenu } from 'react-icons/fi';
import { colourStyles, Container, ProfileContent, Profiles } from './styles';
import MenuMobileAffiliate from '../MenuMobile/feira';
import { ColourOption } from './colors.dto';

import api from '../../config/api';

// interface IHeader {
//   title: string
// }

const Header = ({ title }) => {
  // const menu = useContext();
  const [userName, setUsername] = (useState < string) | (null > '');
  const [avatar, setAvatar] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setUsername(sessionStorage.getItem('name'));
    setAvatar(sessionStorage.getItem('avatar') || '');
    sessionStorage.setItem('page', 'feira');
  }, []);

  const exit = () => {
    sessionStorage.clear();
    router.push('/');
  };

  return (
    <Container>
      <div className="mobile">
        <button onClick={() => setShowMenu(true)}>
          {' '}
          <FiMenu size={23} color="#222" />{' '}
        </button>
        {showMenu && <MenuMobileAffiliate />}
      </div>
      <h1 className="title md:text-sm">{title || ''}</h1>
      <ProfileContent>
        <img
          className="profile-image"
          src={avatar}
          width="50"
          height="50"
          alt="Foto de perfil"
        />
        <Profiles>
          <div className="switch-profile">
            <label>{userName || ''}</label>
            <Dropdown>
              <Dropdown.Button light>Feira Afiliada</Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="new">Feira Afiliada</Dropdown.Item>
                <Dropdown.Item key="delete" color="error">
                  <button style={{ width: '100%' }} onClick={exit}>
                    Sair
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Profiles>
      </ProfileContent>
    </Container>
  );
};

export default Header;
