import { useCallback, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { colourStyles, Container, ProfileContent, Profiles } from './styles';
import { ColourOption } from './colors.dto';

import api from '../../config/api';
import MenuMobile from '../MenuMobile';
import { FiMenu } from 'react-icons/fi';

interface IHeader {
	title: string;
}

interface IProfiles {
	_id: string;
	label: string;
	color: string;
	value: string;
	projects: string[];
}

const Header: NextPage<IHeader> = ({ title }) => {
	const [profiles, setProfiles] = useState<[] | IProfiles[]>([]);
	const [userName, setUsername] = useState<string | null>('');
	const [avatar, setAvatar] = useState<string | null>('');
	const [page, setPage] = useState<string | null>('');

	const [showMenu, setShowMenu] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setUsername(sessionStorage.getItem('name'));
		setAvatar(sessionStorage.getItem('avatar'));
		setPage(sessionStorage.getItem('page'));
	}, []);

	const getNavBarData = useCallback(async () => {
		if (sessionStorage.getItem('profiles_json')) {
			const data = sessionStorage.getItem('profiles_json') || '';
			const perfis = JSON.parse(data);
			setProfiles(perfis);
			return [
				...perfis,
				{
					_id: 'x34rfsc2c3',
					label: 'Sair',
					value: 'exit',
					color: '#222',
					projects: [],
				},
			];
		}
		const response = await api.get('user/profiles/types', {
			headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
		});
		setProfiles(response.data);
		sessionStorage.setItem('profiles_json', JSON.stringify(response.data));

		return [
			...response.data,
			{
				_id: 'x34rfsc2c3',
				label: 'Sair',
				value: 'exit',
				color: '#222',
				projects: [],
			},
		];
	}, []);

	const switchProfile = (data: any) => {
		if (data.value === 'exit') {
			sessionStorage.clear();
			router.push('/');
		} else {
			sessionStorage.setItem('color', data.color);
			sessionStorage.setItem('page', data.value);
			profiles.map((profile) => {
				if (data.value == profile.value) {
					sessionStorage.setItem('profile_id', profile._id);
				}
			});
			router.push(`/home/${data.value}`);
		}
	};

	const promiseOptions = () => new Promise<ColourOption[]>((resolve) => resolve(getNavBarData()));

	return (
		<Container>
			<div className="mobile">
				<button onClick={() => setShowMenu(true)}>
					{' '}
					<FiMenu size={23} color="#222" />{' '}
				</button>
				{showMenu && <MenuMobile />}
			</div>
			<h1 className="title">{title || ''}</h1>
			<ProfileContent>
				<Link href="/perfil" passHref>
					<Image
						className="profile-image"
						src={'foto'}
						loader={() => avatar || ''}
						width={50}
						height={50}
						style={{ cursor: 'pointer' }}
						alt="Foto de perfil"
					/>
				</Link>
				<Profiles>
					<div className="switch-profile">
						<label>{userName || ''}</label>
						<AsyncSelect
							cacheOptions
							loadOptions={promiseOptions}
							styles={colourStyles}
							placeholder="Perfis"
							defaultOptions
							onChange={(data) => switchProfile(data)}
						/>
					</div>
				</Profiles>
			</ProfileContent>
		</Container>
	);
};

export default Header;
