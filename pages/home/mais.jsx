import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from '@nextui-org/react';
import { useAlert } from 'react-alert';

import api, { baseUrl } from '../../config/api';

import LayoutBase from '../../styles/layout/base';

import Image from 'next/image';
import ProjectsList from '../../components/ProjectsList';
import { IProject } from '../../types/project';

export default function Mais() {
  const [projects, setProjects] = useState([]);
  const [visible3, setVisible3] = useState(false);
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    api
      .get(`project/profile/${sessionStorage.getItem('profile_id')}`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.warn(err);
        if (err.code == 'ERR_NETWORK') {
          alert.error('Servidor está fora do ar, tente novamente mais tarde');
        }
      });
    if (router.query.code == 'refresh') {
      window.location.reload();
    }
    if (sessionStorage.getItem('tutorial_orientador') !== 's') {
      setVisible3(true);
    }
  }, []);

  return (
    <LayoutBase title="FEMIC Mais">
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible3}
        onClose={() => {
          setVisible3(false);
          sessionStorage.setItem('tutorial_orientador', 's');
        }}>
        <Modal.Body>
          <div className="flex flex-col items-center">
            <span className="text-center mb-2">
              Clique no canto superior direito da tela para mudar de PERFIL.
            </span>
            <Image
              src="/toca_perfil.gif"
              width={250}
              height={144}
              alt="git de troca de perfil"
            />
          </div>
        </Modal.Body>
      </Modal>
      <ProjectsList profile="mais" projects={projects} />
    </LayoutBase>
  );
}
