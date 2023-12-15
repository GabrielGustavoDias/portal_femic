import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

import api from '../../config/api';

import LayoutBase from '../../styles/layout/base';
import ProjectsList from '../../components/ProjectsList';
import { IProject } from '../../types/project';

export default function Junior() {
  const [project, setProject] = useState([]);

  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    api
      .get(`project/profile/${sessionStorage.getItem('profile_id')}`)
      .then((response) => {
        setProject(response.data);
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
  }, []);

  return (
    <LayoutBase title="FEMIC Júnior">
      <ProjectsList profile="junior" projects={project} />
    </LayoutBase>
  );
}
