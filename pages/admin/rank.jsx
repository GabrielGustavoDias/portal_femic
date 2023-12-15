import { Loading, Modal, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiFilePlus, FiTrash } from 'react-icons/fi';
import api, { baseUrl } from '../../config/api';
import { ufs } from '../../config/dados';

import {
  FormQuery,
  ProjectContainer,
  WelcomeHeader,
} from '../../styles/admin/styles.module';

import AdminLayout from '../../styles/layout/admin';
// import { IProject } from '../../types/project';

export default function Rank() {
  const [projects, setProjects] = useState([]);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [projectWin, setProjectWin] = useState();

  const router = useRouter();

  useEffect(() => {
    console.log(router.asPath.split('=')[1]);
  }, [router.asPath]);

  const searchProjects = (e) => {
    e.preventDefault();
    setLoad(true);
    const data = {
      year: e.target[0].value,
      category: e.target[1].value,
      area: e.target[2].value,
      state: e.target[3].value,
      quant: e.target[4].value,
    };
    api
      .patch(`/project/ranking/${router.asPath.split('=')[1]}`, data)
      .then((res) => {
        console.log(res.data);
        setLoad(false);
        setProjects(res.data);
      })
      .catch((err) => {
        setLoad(false);
        console.warn(err);
      });
  };

  const openModal = (proj) => {
    setProjectWin(proj);
    setVisible(true);
  };

  const sendWinner = (e) => {
    e.preventDefault();
    api
      .patch(`/project/awarded/${projectWin._id}`, {
        'winner.win': true,
        'winner.rank': projectWin.rank,
        'winner.win_text': e.target[0].value,
        'winner.win_subtext': e.target[1].value,
        'winner.cert': 'n',
        certificate: 'n',
      })
      .then((res) => {
        console.log(res.data);
        setVisible(false);
        alert('salvo');
      });
    console.log(e.target[0].value, e.target[1].value);
  };

  const removePremiacao = (id) => {
    api
      .get(`/certificate/delete/${id}`)
      .then((res) => {
        alert('Removido com sucesso');
      })
      .catch((err) => {
        alert('Erro ao remover');
      });
  };

  const renderRank = (rank, index) => {
    const empate = projects[index - 1]?.rank == projects[index].rank;
    let new_index = `${index + 1} empate`;
    if (rank == 1) {
      return (
        <span style={{ color: 'rgb(251 191 36)', fontSize: 18 }}>
          {empate ? new_index : rank}
        </span>
      );
    } else if (rank == 2) {
      return (
        <span style={{ color: 'rgb(55 65 81)', fontSize: 18 }}>
          {empate ? new_index : rank}
        </span>
      );
    } else if (rank == 3) {
      return (
        <span style={{ color: 'rgb(180 83 9)', fontSize: 18 }}>
          {empate ? new_index : rank}
        </span>
      );
    } else {
      return empate ? new_index : rank;
    }
  };

  return (
    <AdminLayout>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Digite a premiação desse projeto
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col" onSubmit={sendWinner}>
            <label>Classificação: </label>
            <input className="h-9 pl-2 border" placeholder="1 lugar" required />
            <label>Modalidade: </label>
            <input
              className="h-9 pl-2 border"
              placeholder="FEMIC Mais - Professores da Educação Básica"
              required
            />
            <button>Salvar</button>
          </form>
        </Modal.Body>
      </Modal>
      <WelcomeHeader>
        <FormQuery onSubmit={searchProjects}>
          <div className="flex flex-col">
            <label>Ano</label>
            <input
              className="input"
              type="number"
              defaultValue={new Date().getFullYear()}
              min={2022}
              style={{ width: 100 }}
            />
          </div>
          <div className="flex flex-col">
            <label>Categoria</label>
            <select className="input">
              <option value="">Todos</option>
              <option>Educação Infantil</option>
              <option>Anos Iniciais do Ensino Fundamental</option>
              <option>Anos finais do Ensino Fundamental</option>
              <option>Ensino Médio</option>
              <option>Ensino Técnico</option>
              <option>Ensino Superior em andamento</option>
              <option>Professores da Educação Básica</option>
              <option>Professores e/ou estudantes do Ensino Superior</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Área científica</label>
            <select className="input">
              <option value="">Todos</option>
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
          </div>
          <div className="flex flex-col">
            <label>Localização</label>
            <select className="input">
              <option value="">Todos</option>
              <option value="int">INT</option>
              {ufs.map((uf) => (
                <option key={uf.id} value={String(uf.sigla).toUpperCase()}>
                  {String(uf.sigla).toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Pesquisar</button>
        </FormQuery>
      </WelcomeHeader>
      {load && <Loading color="warning" />}
      <span className="m-5 ">
        {' '}
        Obs: Ranking é de acordo com sua pesquisa de acordo com a categoria,
        area científica e localização(quando usada).{' '}
      </span>
      {projects.length > 0 &&
        projects.map((proj, index) => (
          <ProjectContainer avaliacao key={proj._id}>
            <img
              src={
                true ? '/default.png' : `${baseUrl}/project/logo/${proj._id}`
              }
              width={50}
              height={50}
              alt="Projeto logo"
            />
            <div className="flex flex-col ml-5">
              <label>{proj.title}</label>
              <span>{proj.id_femic}</span>
              <span>
                {proj.status}{' '}
                {proj.finalized && proj.status == 'finalista' && (
                  <FiFilePlus size={24} color="#555" />
                )}
                {proj.hidden ? '/(oculto)' : ''}
              </span>
            </div>
            <div className="flex flex-col">
              <label>Avaliadores</label>
              <select>
                {proj.avaliacao?.barema?.map((aval) => (
                  <option key={aval.avaliador_nome}>
                    {aval.avaliador_nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label>Pareceres</label>
              <span>avaliadores: {proj.avaliacao?.avaliadores?.length}</span>
              <span>enviados: {proj.avaliacao?.barema?.length}</span>
            </div>
            <div className="flex flex-col">
              <label>Resultados</label>
              <span>Nota: {proj.avaliacao?.total?.toFixed(2)}</span>
              <span>Classificação: {renderRank(proj.rank || 0, index)}</span>
            </div>
            {proj?.winner?.win ? (
              <div className="flex">
                <button
                  className="delete mr-1"
                  onClick={() => removePremiacao(proj._id)}
                  style={{ marginLeft: -15 }}>
                  <FiTrash size={24} color="#FFF" />
                </button>
                <button className="confirm" onClick={() => openModal(proj)}>
                  Premiar
                </button>
              </div>
            ) : (
              <div className="flex">
                <button className="confirm" onClick={() => openModal(proj)}>
                  Premiar
                </button>
              </div>
            )}
          </ProjectContainer>
        ))}
    </AdminLayout>
  );
}
