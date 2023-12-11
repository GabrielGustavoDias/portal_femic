import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';

import api, { baseUrl } from '../../config/api';

import AdminLayout from '../../styles/layout/admin';
import {
	UserContainer,
	WelcomeHeader,
	FormQuery,
	AffiliateContainer,
} from '../../styles/admin/styles.module';

import { ufs, countryes } from '../../config/dados';
import { Loading, Pagination, Tooltip } from '@nextui-org/react';

export default function FeirasFiliadas() {
	const [affiliates, setAffiliates] = useState([]);
	const [cred, setCred] = useState<string | number>('');
	const [country, setCountry] = useState('brasil');
	const [state, setState] = useState('');
	const [totalAffiliate, setTotalAffiliate] = useState(0);

	const [loading, setLoading] = useState(false);

	const alert = useAlert();
	const [name, setName] = useState('');

	const router = useRouter();

	useEffect(() => {
		setName(sessionStorage.getItem('name') || '');
		setLoading(true);
		if (!sessionStorage.getItem('key')) {
			alert.error('Autenticação não está mais valida, faça login novamente');
			router.push('/');
		}
		api
			.get('/admin/affiliates/1')
			.then((response) => {
        setAffiliates(response.data['affiliates']);
        setTotalAffiliate(response.data['count']);
				setLoading(false);
			})
			.catch((err: any) => {
				console.warn(err.message);
			});
	}, []);

	const queryAffiliates = (e: any) => {
		e.preventDefault();
		setAffiliates([]);
    setLoading(true);
		setTotalAffiliate(0);
		api.get(
			`/admin/affiliates/search/query?credentials=${cred}&country=${country.toLowerCase()}&state=${state}`
    ).then(res => {
      setAffiliates(res.data);
      setLoading(false);
    }).catch(err => {
			console.log(err)
			setLoading(false);
		})
	};

	const searchAgain = (page: number) => {
    setAffiliates([]);
    setLoading(true);
		api
			.get(`/admin/affiliates/${page}`)
			.then((res) => {
				setAffiliates(res.data['affiliates']);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
				console.warn(err.message);
			});
	};

	return (
		<AdminLayout>
			<WelcomeHeader>
				<h1>Olá {name}, seja bem-vinda</h1>
				<p>Feiras afiliadas</p>
        <span>
					<span className="mr-2 text-orange-500 text-base">{totalAffiliate}</span>
				</span>
			</WelcomeHeader>
			<FormQuery onSubmit={queryAffiliates}>
				<div className="flex flex-col">
					<label>
						Credenciais <br />
						fornecida
					</label>
					<input
						className="input"
						type="number"
						defaultValue={0}
						onChange={(e) => setCred(e.target.value)}
						min={0}
					/>
				</div>
				<div className="flex flex-col">
					<label>Pais</label>
					<input
						className="input"
						defaultValue="Brasil"
						onChange={(e) => setCountry(e.target.value)}
						type="text"
						list="paises"
					/>
					<datalist id="paises" style={{ display: 'none' }}>
						{countryes &&
							countryes.map((paisItem) => (
								<option key={paisItem['pais-ISO-ALPHA-3']} value={paisItem['pais-nome']}></option>
							))}
					</datalist>
				</div>
				<div className="flex flex-col">
					<label>Estado</label>
					<input
						className="input"
						type="text"
						onChange={(e) => setState(e.target.value)}
						list="list-ufs"
					/>
					<datalist style={{ display: 'none' }} id="list-ufs">
						{ufs.map((uf) => (
							<option key={uf.id} value={uf.sigla}></option>
						))}
					</datalist>
				</div>
				<button type="submit">Pesquisar</button>
			</FormQuery>
			{affiliates?.length > 0 &&
				affiliates?.map((affiliate: any) => (
					<AffiliateContainer key={affiliate._id}>
						<img
							width="50px"
							height="50px"
							src={`${baseUrl}/affiliate/profile/image/${affiliate.logo}`}
							alt="Logo da feira Afiliada"
						/>
						<div className="flex flex-col">
							<label >{affiliate.name}</label>
							<span>{affiliate.identifier}</span>
						</div>
						<div className="flex flex-col">
							<Tooltip content="Quantidade de credenciais oferecidas e usadas" color="invert">
							Nº de credenciais
							</Tooltip>
							<span>Deferidas: {affiliate.credentials}</span>
							<span>Usadas: {affiliate.credentials_used}</span>
						</div>
						<div className="flex flex-col">
							<Tooltip content="Oculta nas buscas da plataforma" color="invert">
								Oculta
							</Tooltip>
							<span>{affiliate.hidden?"Sim":"Não"}</span>
						</div>
						<Link href={`/admin/perfis/feiras/${affiliate._id}`} passHref>
							ver feira
						</Link>
					</AffiliateContainer>
				))}
			{loading && <Loading color="warning" />}
			<Pagination
				css={{ alignSelf: 'center' }}
				color="warning"
				rounded
				total={Math.floor(totalAffiliate / 10) + 1}
				initialPage={1}
				onChange={(e) => searchAgain(e)}
			/>
		</AdminLayout>
	);
}
