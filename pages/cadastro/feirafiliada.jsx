import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import api from '../../config/api';
import { ufs, countryes } from '../../config/dados';

import LayoutForm from '../../styles/layout/form';
import { Select } from '../../styles/layout/styles';
import { Input, SubmitButton } from '../../styles/login.style';
import { phoneMask } from '../../utils/masks';

const steps = [
  {
    id: 'sing',
    title: 'Formando equipe',
  },
  {
    id: 'data',
    title: 'Formando equipe',
  },
];

export default function FeiraAfiliada() {
  const [currentStep, setCurrentStep] = useState(0);

  // 1 form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [ampic, setAmpic] = useState('');
  const [fisrtYear, setFirstYear] = useState('');
  const [abrangencia, setAbrangencia] = useState('');
  const [insta, setInsta] = useState('');
  const [fanP, setFanP] = useState('');
  const [web, setWeb] = useState('');
  const [yout, setYout] = useState('');
  const [others, setOthers] = useState('');
  const [photo, setPhoto] = useState('');
  const [pass, setPass] = useState('');
  const [passCheck, setPassCheck] = useState('');
  const [conf, setConf] = useState('');

  // 2 form
  const [modJun, setModJun] = useState('');
  const [modJov, setModJov] = useState('');
  const [modMais, setModMais] = useState('');

  const [areaCExatas, setAreaCExatas] = useState('');
  const [areaCBio, setAreaCBio] = useState('');
  const [areaEng, setAreaEng] = useState('');
  const [areaCSaude, setAreaCSaude] = useState('');
  const [areaCAgro, setAreaCAgro] = useState('');
  const [areaCSoc, setAreaCSoc] = useState('');
  const [areaCHum, setAreaSHum] = useState('');
  const [areaLing, setAreaLing] = useState('');

  const [quantProj, setQuantProj] = useState('');
  const [realization, setRealization] = useState('');
  const [instName, setInstname] = useState('');
  const [instEmail, setInstEmail] = useState('');
  const [instType, setInstType] = useState('');
  const [cordName, setCordName] = useState('');
  const [cordEmail, setCordEmail] = useState('');
  const [cordPhone, setCordPhone] = useState('');

  const [cityes, setCityes] = useState([]);
  const [paises, setPaises] = useState(countryes);

  const router = useRouter();
  const alerta = useAlert();

  useEffect(() => {
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'auto';
  }, []);

  const nextPage = (e) => {
    e.preventDefault();
    if (pass !== passCheck) {
      alert('senhas não batem');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const stateChanged = (value) => {
    if (value.length < 2) {
      return;
    }
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`
    )
      .then((response) => {
        response.json().then((data) => {
          setCityes(data);
        });
        setState(value);
      })
      .catch((err) => {
        if (err.code == 'ERR_NETWORK') {
          alerta.error('Servidor está fora do ar, tente novamente mais tarde');
        }
      });
  };

  const submitFunction = (e) => {
    e.preventDefault();

    if (!conf) {
      alert('checkbox não confirmada');
      return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('ampic', ampic);
    formData.append('fisrt_year', fisrtYear);
    formData.append('abrangencia', abrangencia);
    formData.append('instagram_link', insta);
    formData.append('fanpage_link', fanP);
    formData.append('website_link', web);
    formData.append('youtube_link', yout);
    formData.append('outros_link', others);
    formData.append('logo', photo);
    formData.append('password', pass);
    formData.append('modality_jov', modJov);
    formData.append('modality_jun', modJun);
    formData.append('modality_prof', modMais);
    formData.append('area_cien_exatas', areaCExatas);
    formData.append('area_engenharia', areaEng);
    formData.append('area_cien_agro', areaCAgro);
    formData.append('area_cien_bio', areaCBio);
    formData.append('area_cien_human', areaCHum);
    formData.append('area_cien_saude', areaCSaude);
    formData.append('area_cien_soc', areaCSoc);
    formData.append('area_linguas', areaLing);
    formData.append('quant_proj', quantProj);
    formData.append('realization_date', realization);
    formData.append('inst_name', instName);
    formData.append('inst_email', instEmail);
    formData.append('inst_type', instType);
    formData.append('cord_name', cordName);
    formData.append('cord_email', cordEmail);
    formData.append('cord_phone', cordPhone);

    api
      .post('/affiliate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        router.push({
          pathname: '/cadastro/confirmacao',
          query: { id: response.data.identifier },
        });
      })
      .catch((err) => {
        if (err.code == 'ERR_NETWORK') {
          alerta.error('Servidor está fora do ar, tente novamente mais tarde');
          return;
        }
        console.warn(err);
      });
  };

  function fileSelected(event) {
    const target = event.target;
    const files = target.files;

    if (!files || !files[0]) return;

    setPhoto(files[0]);
  }
  return (
    <LayoutForm color1="#1B7824" color2="#51E717">
      {steps[currentStep].id === 'sing' && (
        <form
          className="flex flex-1 flex-col p-10 h-full"
          autoComplete="off"
          onSubmit={(e) => nextPage(e)}>
          <label htmlFor="name">Nome da feira afiliada</label>
          <Input
            autoFocus
            id="name"
            spellCheck={false}
            placeholder="Nome completo sem abreviações e sem informar edição e/ou ano"
            autoComplete="none"
            autoCapitalize="false"
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <label htmlFor="email">E-mail</label>
          <Input
            type="email"
            placeholder="exemplo@email.com"
            autoComplete="none"
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <label htmlFor="">País</label>
          <Input
            type="text"
            name="country"
            placeholder="País"
            list="paises"
            autoComplete="none"
            onChange={(e) => setCountry(e.target.value.toLocaleLowerCase())}
            required
          />
          <datalist id="paises" style={{ display: 'none' }}>
            {paises &&
              paises.map((paisItem) => (
                <option
                  key={paisItem['pais-ISO-ALPHA-3']}
                  value={paisItem['pais-nome']}></option>
              ))}
          </datalist>
          {country.toLowerCase() == 'brasil' ? (
            <div className="flex w-full flex-row justify-between">
              <div className="flex flex-col mr-2">
                <label htmlFor="">Estado</label>
                <Input
                  type="text"
                  name="state"
                  maxLength={2}
                  size={2}
                  placeholder="MG"
                  list="list-ufs"
                  style={{ textTransform: 'uppercase' }}
                  onChange={(e) => stateChanged(e.target.value)}
                  required
                />
                <datalist style={{ display: 'none' }} id="list-ufs">
                  {ufs.map((uf) => (
                    <option
                      key={uf.nome}
                      value={uf.sigla}
                      label={uf.nome}></option>
                  ))}
                </datalist>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">Cidade</label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  list="cidades"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <datalist id="cidades" style={{ display: 'none' }}>
                  {cityes &&
                    cityes.map((cityItem) => (
                      <option key={cityItem.id} value={cityItem.nome}></option>
                    ))}
                </datalist>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-row justify-between">
              <div className="flex flex-col mr-2">
                <label htmlFor="">Estado</label>
                <Input
                  type="text"
                  name="state"
                  maxLength={2}
                  size={2}
                  placeholder="MG"
                  style={{ textTransform: 'uppercase' }}
                  onChange={(e) => stateChanged(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">Cidade</label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          <label htmlFor="">Feira associada à AMPIC?</label>
          <Select onChange={(e) => setAmpic(e.currentTarget.value)} required>
            <option value="" disabled selected>
              Selecione aqui
            </option>
            <option value="n">Não</option>
            <option value="s">Sim</option>
          </Select>
          <label htmlFor="">Ano da primeira edição da sua feira.</label>
          <Input
            type="number"
            min="1900"
            max="2022"
            step="1"
            placeholder="2010"
            onChange={(e) => setFirstYear(e.currentTarget.value)}
          />
          <label htmlFor="">Abrangência da sua feira</label>
          <Select
            onChange={(e) => setAbrangencia(e.currentTarget.value)}
            required>
            <option value="" disabled selected>
              Selecione aqui
            </option>
            <option value="internacional">Internacional</option>
            <option value="nacional">Nacional</option>
            <option value="estadual">Estadual</option>
            <option value="regional">Regional</option>
            <option value="municipal">Municipal</option>
            <option value="institucional">Institucional</option>
          </Select>
          <label>
            Canais de divulgação da feira. Deixe sem preencher caso não possua.
          </label>
          <Input
            type="text"
            placeholder="Instagram"
            name="ig"
            onChange={(e) => setInsta(e.currentTarget.value)}
          />
          <Input
            type="text"
            placeholder="Fanpage"
            name="fp"
            onChange={(e) => setFanP(e.currentTarget.value)}
          />
          <Input
            type="text"
            placeholder="Website ou blog"
            name="wb"
            onChange={(e) => setWeb(e.currentTarget.value)}
          />
          <Input
            type="text"
            placeholder="Youtube"
            name="yt"
            onChange={(e) => setYout(e.currentTarget.value)}
          />
          <Input
            type="text"
            placeholder="Outros"
            name="ot"
            onChange={(e) => setOthers(e.currentTarget.value)}
          />
          <h1>Faça parte da comunidade FEMIC</h1>
          <p>Envie a LOGOMARCA da sua Feira</p>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => fileSelected(e)}
            required
          />
          <label htmlFor="">Senha</label>
          <span style={{ fontSize: 14, color: '#777' }}>
            A senha deve ter no mínimo:
          </span>
          <span style={{ fontSize: 14, color: '#777' }}>6 dígitos</span>
          <span style={{ fontSize: 14, color: '#777' }}>
            Letras maiúsculas e minúsculas.
          </span>
          <span style={{ fontSize: 14, color: '#777' }}>Números</span>
          <span style={{ fontSize: 14, color: '#777', marginBottom: 10 }}>
            Caracteres especiais {'@#&;*'}
          </span>
          <Input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            minLength={6}
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
            required
          />
          <label htmlFor="">Confirme sua senha</label>
          <Input
            type="password"
            onChange={(e) => setPassCheck(e.target.value)}
            required
          />
          <div className="flex flex-row items-center ">
            <input
              className="mr-2"
              type="checkbox"
              name="check"
              id="check_input"
              minLength={6}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
              onChange={(e) => setConf(e.currentTarget.value)}
              required
            />
            <label htmlFor="check_input">
              Concordo com as{' '}
              <a
                href="https://femic.com.br/regras-de-participacao-virtual/"
                target="_blank"
                rel="noreferrer">
                regras e políticas de privacidades
              </a>{' '}
              da FEMIC
            </label>
          </div>
          <SubmitButton type="submit">Próximo</SubmitButton>
        </form>
      )}
      {steps[currentStep].id === 'data' && (
        <form
          className="flex flex-1 flex-col p-10 h-full"
          onSubmit={submitFunction}>
          <h1 style={{ fontWeight: 600, marginBottom: 16, fontSize: 24 }}>
            Sobre a afiliação
          </h1>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 22 }}>
            Modalidade(s) de afiliação.
          </h3>
          <div className="flex flex-row items-center mb-3">
            <input
              className="mr-2"
              type="checkbox"
              onChange={(e) => setModJun(e.target.value)}
              autoFocus
            />
            <label>FEMIC Júnior</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              className="mr-2"
              type="checkbox"
              onChange={(e) => setModJov(e.target.value)}
            />
            <label>FEMIC Jovem</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              className="mr-2"
              type="checkbox"
              onChange={(e) => setModMais(e.target.value)}
            />
            <label>FEMIC Mais</label>
          </div>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 22 }}>
            Áreas científicas da sua feira
          </h3>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaCExatas(e.target.value)}
            />
            <label> Ciências Exatas e da Terra</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaCBio(e.target.value)}
            />
            <label> Ciências Biológicas</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaEng(e.target.value)}
            />
            <label> Engenharias</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaCSaude(e.target.value)}
            />
            <label> Ciências da Saúde</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaCAgro(e.target.value)}
            />
            <label>Ciências Agrárias</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaCSoc(e.target.value)}
            />
            <label> Ciências Sociais e Aplicadas</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaSHum(e.target.value)}
            />
            <label>Ciências Humanas</label>
          </div>
          <div className="flex flex-row items-center mb-3">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setAreaLing(e.target.value)}
            />
            <label>Linguística, Letras e Artes</label>
          </div>
          <h3>Quantidade de projetos previstos para o ano vigente?</h3>
          <Input
            type="number"
            onChange={(e) => setQuantProj(e.target.value)}
            required
          />
          <h3>
            Qual a data prevista para o início da sua feira no ano vigente?
          </h3>
          <Input
            type="date"
            onChange={(e) => setRealization(e.target.value)}
            required
          />
          <h2 style={{ fontWeight: 600, marginBottom: 16, fontSize: 22 }}>
            Instituição realizadora
          </h2>
          <label>Nome da instituição</label>
          <Input onChange={(e) => setInstname(e.target.value)} required />
          <label htmlFor="">Email da instituição</label>
          <Input onChange={(e) => setInstEmail(e.target.value)} required />
          <label htmlFor="">Tipo de instituição</label>
          <Select required onChange={(e) => setInstType(e.target.value)}>
            <option value="publica">Pública</option>
            <option value="privada">Privada</option>
            <option value="filantropica">Filantrópica</option>
          </Select>
          <h2 style={{ fontWeight: 600, marginBottom: 16, fontSize: 22 }}>
            Coordenação do evento
          </h2>
          <label htmlFor="">Nome do(a) coordenador(a)</label>
          <Input onChange={(e) => setCordName(e.target.value)} />
          <label htmlFor="">E-mail do(a) coordenador(a)</label>
          <Input onChange={(e) => setCordEmail(e.target.value)} />
          <label htmlFor="">Telefone do(a) coordenador(a)</label>
          <Input
            onChange={(e) => setCordPhone(phoneMask(e.target.value))}
            value={cordPhone}
          />
          <div className="flex flex-row items-center ">
            <input type="checkbox" className="mr-2" />
            <label htmlFor="">
              Concordo com as{' '}
              <a
                href="https://femic.com.br/regras-de-participacao-virtual/"
                target="_blank"
                rel="noreferrer">
                regras e políticas de privacidades
              </a>{' '}
              da FEMIC.
            </label>
          </div>
          <SubmitButton type="submit">Cadastrar</SubmitButton>
        </form>
      )}
    </LayoutForm>
  );
}
