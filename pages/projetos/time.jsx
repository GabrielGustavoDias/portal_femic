import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { useAlert } from 'react-alert';
import { Loading } from '@nextui-org/react';

import api, { baseUrl } from '../../config/api';

import LayoutBase from '../../styles/layout/base';
import {
  ListUsers,
  Seach,
  UserCard,
} from '../../styles/projetos/styles.module';
import CardPeople from '../../components/CardPeople';

export default function ProjetoTime() {
  const [projId, setProjId] = useState('');
  const [modality, setModality] = useState('');
  const [teamList, setTeamList] = useState([]);
  const [orientadoresList, setOrientadoresList] = useState([]);
  const [inputTeam, setInputTeam] = useState('');
  const [inputOri, setInputOri] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState('');

  const alert = useAlert();

  const router = useRouter();

  useEffect(() => {
    setColor(sessionStorage.getItem('color') || '#1FB58F');
    setProjId(sessionStorage.getItem('project_id') || '');

    window.document.body.style.overflow = 'auto';
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'auto';

    api
      .get(`/project/team/${sessionStorage.getItem('project_id')}`)
      .then((response) => {
        setTeamList(response.data.team);
        setOrientadoresList(response.data.advisors);
      })
      .catch((err) => {
        console.warn(err);
      });
    api
      .get(`/project/getserverside/${sessionStorage.getItem('project_id')}`)
      .then((res) => {
        sessionStorage.setItem('modality_project', res.data.modality);
        setModality(res.data.modality);
      });
  }, []);

  const addTeamPart = () => {
    if (teamList.length == 3 && (modality == 'junior' || modality == 'jovem')) {
      alert.show('Limite máximo de participantes.');
      setInputTeam('');
      return;
    }

    if (
      teamList.length == 6 &&
      (modality == 'orientador' || modality == 'mais')
    ) {
      alert.show('Limite máximo de participantes.');
      setInputTeam('');
      return;
    }

    if (sessionStorage.getItem('profile_id') == inputTeam) {
      alert.show('Você já está no projeto.');
    }

    let ok = true;

    api
      .get(
        `/profiles/user/${sessionStorage.getItem(
          'modality_project'
        )}?identifier=${inputTeam}`
      )
      .then((response) => {
        setInputTeam('');
        if (!response.data) {
          alert.show(
            'CPF/Passaporte inexistente ou pertencente a pessoa não cadastrada no PORTAL FEMIC.'
          );
          ok = false;
          return;
        }

        if (sessionStorage.getItem('profile_id') == response.data._id) {
          alert.show('Você já está na equipe.');
          ok = false;
          return;
        }

        teamList.map((usr) => {
          if (usr._id == response.data._id) {
            alert.show('Este usuário já está na sua equipe.');
            ok = false;
            return;
          }
        });
        if (ok) setTeamList([...teamList, response.data]);
      })
      .catch((err) => {
        if (err.code == 'ERR_NETWORK') {
          alert.error('Servidor está fora do ar, tente novamente mais tarde');
          return;
        }
        alert.error(err.response.data.message);
        console.warn(err);
      });
    setInputTeam('');
  };

  const removeTeamUser = (user) => {
    if (user._id == sessionStorage.getItem('profile_id')) {
      const confirmation = confirm('Deseja realmente sair do projeto?');
      if (confirmation) {
        api.patch('/project/remove/team', { project: projId, user: user._id });
        const listAux = teamList.slice();
        listAux.splice(listAux.indexOf(user), 1);
        setTeamList(listAux);
        router.push({
          pathname: `/home/${sessionStorage.getItem('page')}`,
          query: { code: 'refresh' },
        });
      } else {
      }
    } else {
      api.patch('/project/remove/team', { project: projId, user: user._id });
      const listAux = teamList.slice();
      listAux.splice(listAux.indexOf(user), 1);
      setTeamList(listAux);
    }
  };

  const removeTeamOri = (ori) => {
    const listAux = orientadoresList.slice();
    listAux.splice(listAux.indexOf(ori), 1);
    api
      .patch('/project/remove/team', { project: projId, user: ori._id })
      .then((res) => {
        if (ori._id == sessionStorage.getItem('profile_id')) {
          router.push(`/home/${sessionStorage.getItem('page')}`);
        }
      });
    setOrientadoresList(listAux);
  };

  const addTeamOri = () => {
    if (orientadoresList.length == 3) {
      alert.show('limite máximo de orientadores');
      setInputTeam('');
      return;
    }

    if (sessionStorage.getItem('profile_id') == inputTeam) {
      alert.show('Você já está no projeto');
    }

    api
      .get(`/profiles/user/ori?identifier=${inputOri}`)
      .then((response) => {
        if (!response.data) {
          alert.show('Orientador invalido');
        } else {
          setOrientadoresList([...orientadoresList, response.data]);
        }
      })
      .catch((err) => {
        if (err.code == 'ERR_NETWORK') {
          alert.error('Servidor está fora do ar, tente novamente mais tarde');
        } else {
          alert.error(err.response.data.message);
          console.warn(err);
        }
      });

    setInputOri('');
  };

  const submitUpdateTeam = () => {
    setDisabled(!disabled);
    if (teamList.length < 1) {
      alert.show('Sua equipe precisa ter pelo menos 1 estudante.');
      setDisabled(false);
      return;
    }

    if (
      (modality == 'jovem' || modality == 'junior') &&
      orientadoresList.length < 1
    ) {
      alert.show('Sua equipe precisa ter pelo menos 1 orientador(a).');
      setDisabled(false);
      return;
    }

    const data = {
      id: projId,
      advisors: orientadoresList.map((ori) => ori._id).toString(),
      team: teamList.map((usr) => usr._id).toString(),
      modality: sessionStorage.getItem('page'),
    };

    api
      .post('project/team', data)
      .then((res) => {
        router.push('/projetos/instituicao');
        setDisabled(false);
      })
      .catch((err) => {
        if (err.code == 'ERR_NETWORK') {
          alert.error('Servidor está fora do ar, tente novamente mais tarde');
          setDisabled(false);
          return;
        }
        alert.error(err.response.data.message);
        console.warn(err);
        setDisabled(false);
      });
  };

  return (
    <LayoutBase title="Forme sua Equipe">
      <span className="alert-text ml-7 mb-7">
        Para formar sua equipe, digite o CPF (brasileiros) ou o passaporte
        (estrangeiros) dos autores e/ou autoras do projeto. Use somente letras e
        números.
      </span>
      <ListUsers>
        {teamList &&
          teamList.map((integrante, index) => (
            <CardPeople key={integrante._id} integrante={integrante}>
              {sessionStorage.getItem('profile_id') !== integrante._id ? (
                <button
                  className="remove"
                  onClick={() => removeTeamUser(integrante)}>
                  Remover
                </button>
              ) : (
                <button
                  className="remove"
                  onClick={() => removeTeamUser(integrante)}>
                  Sair
                </button>
              )}
            </CardPeople>
          ))}
      </ListUsers>
      <Seach>
        <div className="flex flex-col">
          <input
            type="text"
            className="search-input"
            onChange={(e) => setInputTeam(e.target.value)}
            value={inputTeam}
            placeholder="CPF/Passaporte do integrante"
            autoFocus
          />
          {modality == 'mais' ? (
            <span>
              Seu projeto deverá ter entre
              <br /> 1 e 6 autores(as).
            </span>
          ) : (
            <span>
              Seu projeto deverá ter entre
              <br /> 1 e 3 estudantes.
            </span>
          )}
        </div>
        <button className="search-button" onClick={addTeamPart}>
          <FiUserPlus size={22} color="#FFF" />
        </button>
      </Seach>
      {(modality == 'jovem' ||
        modality == 'junior' ||
        modality == 'orientador') && (
        <>
          <ListUsers>
            {orientadoresList &&
              orientadoresList.map((orientador) => (
                <CardPeople key={orientador._id} integrante={orientador}>
                  <button
                    className="remove"
                    onClick={() => removeTeamOri(orientador)}>
                    {sessionStorage.getItem('profile_id') == orientador._id
                      ? 'Recusar'
                      : 'Remover'}
                  </button>
                </CardPeople>
              ))}
          </ListUsers>
          <Seach>
            <div className="flex flex-col">
              <input
                type="text"
                className="search-input"
                placeholder="CPF/Passaporte do(a) orientador(a)"
                value={inputOri}
                onChange={(e) => setInputOri(e.target.value)}
              />
              <span>
                Seu projeto deverá ter entre
                <br /> 1 e 3 orientadores.
              </span>
            </div>
            <button className="search-button" onClick={addTeamOri}>
              <FiUserPlus size={22} color="#FFF" />
            </button>
          </Seach>
        </>
      )}
      <button
        className="button-project"
        style={{ backgroundColor: color }}
        onClick={submitUpdateTeam}
        disabled={disabled}>
        {disabled ? <Loading color="white" /> : 'Próxima'}
      </button>
    </LayoutBase>
  );
}
