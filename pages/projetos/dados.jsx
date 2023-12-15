import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';

import api from '../../config/api';

import LayoutBase from '../../styles/layout/base';

import { Form } from '../../styles/projetos/styles.module';

import { modalityList, getModalityProject } from '../../utils/projects';
import { Loading, Tooltip } from '@nextui-org/react';

export default function ProjetoDados() {
  const [dataPrev, setDataPrev] = useState();
  const [affiliates, setAffiliates] = useState([]);
  const [categorys, setCategorys] = useState(['']);
  const [disabled, setDisabled] = useState(false);
  const [modality, setModality] = useState('');
  const [color, setColor] = useState('');

  const alert = useAlert();

  const { register, handleSubmit, watch, reset } = useForm({
    mode: 'onBlur',
  });
  const router = useRouter();
  const isAccredited = watch('isAccredited');

  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
    api
      .get(`/project/dados/${sessionStorage.getItem('project_id')}`)
      .then((response) => {
        const data = response.data;
        data['keywords_string'] = data['keywords'].toString();
        data['isAccredited'] = data['isAccredited'] ? 's' : 'n';
        data['continuation'] = data['continuation'] ? 's' : 'n';
        delete data['keywords'];
        setDataPrev(response.data);
        reset(response.data);
      })
      .catch((err) => {
        alert.error(err.response.message);
      });

    api
      .get('affiliate/list')
      .then((res) => {
        setAffiliates(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
    setModality(sessionStorage.getItem('modality_project'));
  }, []);

  const updateProjectDados = (data) => {
    setDisabled(true);
    data['logo'] = data['logo'][0];
    data['isAccredited'] = data['isAccredited'] == 's' ? true : false;
    data['continuation'] = data['continuation'] == 's' ? true : false;
    data['id'] = sessionStorage.getItem('project_id');

    if (!data['isAccredited']) {
      delete data['affiliate'];
    }

    api
      .post('project/dados', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        router.push('/projetos/etica');
        setDisabled(false);
      })
      .catch((err) => {
        console.warn(err);
        setDisabled(false);
      });
  };

  const renderArea = () => {};

  return (
    <LayoutBase title="Dados do projeto">
      <Form onSubmit={handleSubmit(updateProjectDados)}>
        <div className="flex flex-col">
          <label>Título do projeto</label>
          <span className="sub-label">
            Mínimo de 25 e máximo de 120 caracteres com espaço.
          </span>
          <input
            type="text"
            {...register('title')}
            required
            maxLength={120}
            minLength={25}
          />
        </div>
        <label>Categoria</label>
        <select {...register('category')}>
          {modalityList(modality).map((cat) => (
            <option key={cat.id}>{cat.value}</option>
          ))}
        </select>
        <label htmlFor="">Área científica do projeto</label>
        <select {...register('area')}>
          <option value="c_exatas_terra">Ciências Exatas e da Terra</option>
          <option value="c_biologicas">Ciências Biológicas</option>
          <option value="engenharias">Engenharias</option>
          <option value="c_saude">Ciências da Saúde</option>
          <option value="c_agrarias">Ciências Agrárias</option>
          <option value="c_sociais_aplicadas">
            Ciências Sociais Aplicadas
          </option>
          <option value="c_humanas">Ciências Humanas</option>
          <option value="letras_letras_artes">
            Linguística, Letras e Artes
          </option>
        </select>
        <div className="flex flex-col">
          <label htmlFor="">Resumo científico</label>
          <span className="sub-label">
            Mínimo de 1500 e máximo de 2000 caracteres com espaço.
          </span>
          <textarea
            maxLength={2000}
            minLength={1500}
            {...register('resume')}></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Palavras-chaves</label>
          <span className="sub-label">Separe com vírgulas.</span>
          <input
            type="text"
            placeholder="palavra1, palavra2"
            {...register('keywords_string')}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Objetivo geral do projeto</label>
          <span className="sub-label">
            Máximo de 300 caracteres com espaço.
          </span>
          <textarea
            maxLength={300}
            {...register('general_objective')}></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Objetivos específicos do projeto</label>
          <span className="sub-label">
            Máximo de 1000 caracteres com espaço.
          </span>
          <textarea
            maxLength={1000}
            {...register('especific_objectives')}></textarea>
        </div>
        <label htmlFor="">
          O projeto é continuidade de ano(s) anterior(es)?
        </label>
        <select {...register('continuation')}>
          <option value="n">Não</option>
          <option value="s">Sim</option>
        </select>
        {watch('continuation') == 's' && (
          <div className="flex flex-col">
            <label htmlFor="">
              Informe os principais resultados alcançados nos últimos 12 meses
            </label>
            <span className="sub-label">
              Máximo de 1000 caracteres com espaço.
            </span>
            <textarea maxLength={1000} {...register('results')}></textarea>
          </div>
        )}
        <label htmlFor="">
          O projeto possui credencial de alguma Feira Afiliada à FEMIC?
        </label>
        <select {...register('isAccredited')}>
          <option value="" disabled selected>
            Selecione
          </option>
          <option value="n">Não</option>
          <option value="s">Sim</option>
        </select>
        {isAccredited == 's' ? (
          <>
            <label>Selecione a feira afiliada</label>
            <select id="affiliates" {...register('affiliate')} required>
              {affiliates.length > 0 &&
                affiliates.map((aff) => (
                  <option key={aff._id} value={aff.identifier} label={aff.name}>
                    {aff.name}
                  </option>
                ))}
            </select>
          </>
        ) : null}
        <label>Canais de divugação científica do projeto</label>
        <input type="url" {...register('insta')} placeholder="Instagram" />
        <input type="url" {...register('fanpage')} placeholder="Fanpage" />
        <input type="url" {...register('website')} placeholder="Página web" />
        <input type="url" {...register('youtube')} placeholder="Youtube" />
        <input type="url" {...register('others_links')} placeholder="Outros" />
        <Tooltip
          color="invert"
          placement="right"
          content={
            <p>
              Trata-se de uma imagem que ficará na capa do estande virtual do
              projeto.
              <br /> Deve ser uma imagem que represente o projeto e/ou a equipe
              de autores
            </p>
          }>
          <label className="underline">
            Envie uma foto para a capa do seu projeto*
          </label>
        </Tooltip>
        {watch('logo_ref') && <span>capa atual: {watch('logo_ref')}</span>}
        <input type="file" accept="image/*" {...register('logo')} />
        <div className="flex flex-row">
          <Link href="/projetos/instituicao">
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
