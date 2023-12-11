import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { baseUrl } from '../../config/api';

import AdminLayout from '../../styles/layout/admin';

import { DateContainer } from '../../styles/admin/styles.module';

export default function Export() {
  const [usersMod, setUsersMod] = useState('jov');
  const [projectMod, setProjectMod] = useState('jovem');
  const [year, setYear] = useState(new Date().getFullYear());

  const years = [];
  for (let i = 2022; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  return (
    <AdminLayout>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))} className='py-3 px-2 w-24'>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <DateContainer>
        <span>E-mails de todos os participantes: </span>
        <div></div>
        <a
          className="px-4 py-2 rounded text-white bg-emerald-500 w-fit flex gap-4 hover:bg-emerald-600 duration-75"
          href={`${baseUrl}/user/marketing/emails/emails`}
          target="_blank"
          download
          rel="noreferrer">
          arquivo <FiDownload size={24} />
        </a>
      </DateContainer>
      <DateContainer>
        <span>Dados dos Participantes: </span>
        <div>
          <select
            className="px-2 py-1 rounded"
            onChange={(e) => setUsersMod(e.target.value)}>
            <option value="jov" selected>
              Jovem
            </option>
            <option value="jun">Júnior</option>
            <option value="prof">MAIS</option>
          </select>
        </div>
        <a
          className="px-4 py-2 rounded text-white bg-emerald-500 w-fit flex gap-4 hover:bg-emerald-600 duration-75"
          href={`${baseUrl}/user/export/${usersMod}`}
          target="_blank"
          download
          rel="noreferrer">
          arquivo <FiDownload size={24} />
        </a>
      </DateContainer>
      <DateContainer>
        <span>Dados das feiras afiliadas: </span>
        <div></div>
        <a
          className="px-4 py-2 rounded text-white bg-emerald-500 w-fit flex gap-4 hover:bg-emerald-600 duration-75"
          href={`${baseUrl}/affiliate/export`}
          target="_blank"
          download="feiras afiliadas"
          rel="noreferrer">
          arquivo <FiDownload size={24} />
        </a>
      </DateContainer>
      <DateContainer>
        <span>Dados dos projetos: </span>
        <div>
          <select
            className="px-2 py-1 rounded"
            onChange={(e) => setProjectMod(e.target.value)}>
            <option value="jovem" selected>
              Jovem
            </option>
            <option value="junior">Júnior</option>
            <option value="mais">MAIS</option>
          </select>
        </div>
        <a
          className="px-4 py-2 rounded text-white bg-emerald-500 w-fit flex gap-4 hover:bg-emerald-600 duration-75"
          href={`${baseUrl}/project/export/${projectMod}?year=${year}`}
          target="_blank"
          download
          rel="noreferrer">
          arquivo <FiDownload size={24} />
        </a>
      </DateContainer>
    </AdminLayout>
  );
}
