import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import LayoutBase from '../../styles/layout/base';
import api from '../../config/api';

import { countryes, ufs } from '../../config/dados';
import { Form } from '../../styles/projetos/styles.module';
import { FiPlusSquare } from 'react-icons/fi';
import { phoneMask } from '../../utils/masks';
import { Loading } from '@nextui-org/react';

export default function ProjetoInstituicao() {
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState('');

  const { register, handleSubmit, watch, reset, setValue } = useForm({
    mode: 'onBlur',
  });

  const [cityes, setCityes] = useState([]);

  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
    stateChanged('MG');
    api
      .get(`/project/instituition/${sessionStorage.getItem('project_id')}`)
      .then((res) => {
        reset(res.data);
        stateChanged(res.data.state);
      });
  }, []);

  const stateChanged = (value) => {
    if (watch('country') == 'Brasil') {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`
      )
        .then((response) => {
          response.json().then((data) => {
            setCityes(data);
          });
        })
        .catch((err) => {
          alert('digite uma uf valida :(');
        });
    }
  };

  const router = useRouter();

  const updateInstituicao = (data) => {
    data['id'] = sessionStorage.getItem('project_id');
    api
      .post('/project/instituition', data)
      .then((res) => {
        router.push('/projetos/dados');
      })
      .catch((err) => {
        alert('deu algum erro tente novamente mais tarde');
      });
  };

  return (
    <LayoutBase title="Instituição Proponente">
      <Form onSubmit={handleSubmit(updateInstituicao)}>
        <label>Informe o país da sua instituição</label>
        <select {...register('country')} required>
          {countryes &&
            countryes.map((paisItem) => (
              <option
                key={paisItem['pais-ISO-ALPHA-3']}
                value={paisItem['pais-nome']}>
                {paisItem['pais-nome']}
              </option>
            ))}
        </select>
        {watch('country') == 'Brasil' || watch('country') == 'brasil' ? (
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col mr-2">
              <label htmlFor="">Estado</label>
              <select
                {...register('state', {
                  onChange: (e) => stateChanged(e.target.value),
                })}>
                {ufs.map((uf) => (
                  <option
                    key={uf.nome}
                    value={uf.sigla}
                    label={uf.nome}></option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Cidade</label>
              <select {...register('city')} required>
                {cityes &&
                  cityes.map((cityItem) => (
                    <option key={cityItem.id} value={cityItem.nome}>
                      {cityItem.nome}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col mr-2">
              <label htmlFor="">Estado</label>
              <input
                type="text"
                maxLength={2}
                size={2}
                {...register('state')}
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Cidade</label>
              <input
                type="text"
                placeholder="Cidade"
                {...register('city')}
                required
              />
            </div>
          </div>
        )}

        <label>Informe o nome da sua instituição</label>
        <input type="text" {...register('name')} />

        <label>Categoria administrativa</label>
        <select {...register('adm_category')}>
          <option value="publica">Pública</option>
          <option value="privada">Privada</option>
          <option value="filantropica">Filantrópica</option>
        </select>
        <label>Telefone para contato da instituição</label>
        <input
          type="tel"
          {...register('number', {
            onChange: () => setValue('number', phoneMask(watch('number'))),
          })}
        />
        <label>Email de contato da instituição</label>
        <input type="email" {...register('email')} />
        <Link href="/projetos/instituicaoparceira" passHref>
          <button className="add-insti">
            <FiPlusSquare color="#333" size={24} /> Adicionar instituição
            parceira
          </button>
        </Link>
        <div className="flex flex-row">
          <Link href="/projetos/time">
            <a className="button-project" style={{ backgroundColor: color }}>
              Voltar
            </a>
          </Link>
          <button
            type="submit"
            className="button-project"
            style={{ backgroundColor: color }}
            disabled={disabled}>
            {disabled ? <Loading color="white" /> : 'Próxima'}
          </button>
        </div>
      </Form>
    </LayoutBase>
  );
}
