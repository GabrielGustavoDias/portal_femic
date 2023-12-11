import Link from 'next/link';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import SelectMult from 'react-select';
import makeAnimated from 'react-select/animated';

import { useState, useEffect } from 'react';

import { Input, Select } from '../styles/layout/styles';
import api, { baseUrl } from '../config/api';

import { idiomasTypes } from '../utils/user';

const options = [
  { value: 'c_exatas_terra', label: 'Ciências Exatas e da Terra' },
  { value: 'c_biologicas', label: 'Ciências Biológicas' },
  { value: 'engenharias', label: 'Engenharias' },
  { value: 'c_saude', label: 'Ciências da Saúde' },
  { value: 'c_agrarias', label: 'Ciências Agrárias' },
  { value: 'c_sociais_aplicadas', label: 'Ciências Sociais Aplicadas' },
  { value: 'c_humanas', label: 'Ciências Humanas' },
  { value: 'letras_letras_artes', label: 'Linguística, Letras e Artes' },
];

const animatedComponents = makeAnimated();

export default function Renovar() {
  const [nome, setNome] = useState('');
  const [prof, setProf] = useState('');
  const [modality, setModality] = useState('');
  const [school, setSchool] = useState('');
  const [fluent, setFluent] = useState('');
  const [atuationArea, setAtuationArea] = useState('');

  const alert = useAlert();
  const router = useRouter();

  useEffect(() => {
    setNome(sessionStorage.getItem('name') || '');
  }, []);

  const checkProfile = (value: string) => {
    setProf(value.split(';')[1]);
    setModality(value.split(';')[1]);
    setSchool(value.split(';')[0]);
  };
  const especializationSelected = (e: any) => {
    const test = e.map((item: any) => item.label);
    setAtuationArea(test.join());
  };

  const reativacao = (e: any) => {
    e.preventDefault();
    const data = {
      modality: prof,
      formation: atuationArea,
      fluent,
      school
    };
    api
      .patch('/user/renovarfeira', data, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((res) => {
        alert.show('Dados atualizados, entre novamente');
        sessionStorage.clear();
        router.push('/login');
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="w-full bg-white h-16 items-center flex md:px-20 px-5">
        <h1 className="text-2xl">Confirme seus dados:</h1>
      </div>
      <div className="flex flex-col md:px-20 px-5 py-10 bg-slate-100">
        <h1 className="text-xl">Olá, {nome}</h1>
        <span>Para continuar, atualize os seguintes dados:.</span>
        <form className="flex my-5 flex-col gap-2 items-start" onSubmit={reativacao}>
          <label htmlFor="">Nível de Escolaridade</label>
          <Select onChange={(e) => checkProfile(e.target.value)} required>
            <option value="" disabled selected>
              Selecione aqui
            </option>
            <option value="Educação infantil;jun">Educação Infantil</option>
            <option value="Anos iniciais do ensino fundamental;jun">
              Anos Iniciais do Ensino Fundamental
            </option>
            <option value="Anos finais do ensino fundamental;jov">
              Anos Finais do Ensino Fundamental
            </option>
            <option value="Ensino medio;jov">Ensino Médio</option>
            <option value="Ensino técnico;jov">Ensino Técnico</option>
            <option value="Ensino Superior em andamento;prof">
              Ensino Superior em andamento
            </option>
            <option value="Ensino Superior completo;prof">
              Ensino Superior completo
            </option>
            <option value="Especialista;prof">Especialista</option>
            <option value="Mestre;prof">Mestre</option>
            <option value="Doutor;prof">Doutor</option>
          </Select>
          {prof == 'prof' && (
            <>
              <label>Área de Atuação profissional</label>
              <SelectMult
                placeholder="Selecione"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={(e) => especializationSelected(e)}
              />
              <div style={{ marginBottom: 20 }} />
            </>
          )}
          <label htmlFor="">Você é fluente em qual(is) idioma(s)?</label>
          <SelectMult
            placeholder="Selecione"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={idiomasTypes}
            onChange={(e: any) =>
              setFluent(e.map((it: any) => it.label).join())
            }
          />

          <label htmlFor="check" className="">
            <input type="checkbox" id="check" className="mx-2" />
            Concordo com as{' '}
            <Link href="https://femic.com.br/politica-de-privacidade/">
              regras e políticas
            </Link>{' '}
            de privacidades da FEMIC
          </label>
          <button className="text-white py-4 px-6 rounded bg-emerald-400 font-bold">
            Atualizar dados
          </button>
        </form>
      </div>
    </div>
  );
}
