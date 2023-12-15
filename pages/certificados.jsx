import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiFileText } from 'react-icons/fi';

import api, { baseUrl } from '../config/api';
import { FormQuery } from '../styles/admin/styles.module';
import { CertButtonDownload } from '../styles/certificados';

import LayoutBase from '../styles/layout/base';

export default function Certificados() {
  const [certs, setCerts] = (useState < []) | ([] > []);
  const [projects, setProjects] = (useState < []) | (any > []);
  const [year, setYear] = useState(new Date().getFullYear());
  const [disabled, setDisabled] = useState(false);

  const listProject = async () => {
    const storageUserId = sessionStorage.getItem('profile_id');
    const completeProjectsArr = [];
    const response = await api.get(`project/profile/${storageUserId}`);
    const projectsArr = response.data;
    console.log(projectsArr);

    for (const projects of projectsArr) {
      completeProjectsArr.push(projects);
    }
    setProjects(completeProjectsArr);
    console.log(projects);
    return completeProjectsArr;
  };

  const buildCertificate = (object) => {
    let userType = sessionStorage.getItem('page');
    console.log(userType, object.year);

    setDisabled(true);

    const certs = {
      id: object._id,
      doc: 'n',
      winner: 'false',
    };
    api
      .post('/certificate', {
        id: object._id,
        doc: 'n',
        winner: 'false',
      })
      .then((res) => {
        setDisabled(false);
        const certUrl = `${baseUrl}/certificate/${res.data}`;
        const newWindow = window.open(certUrl, '_blank');
        if (!newWindow) {
          alert('Por favor, habilite pop-ups para ver o certificado');
        }
      })
      .catch((err) => {
        setDisabled(false);
        console.warn(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/certificate/profile/certs/${sessionStorage.getItem('profile_id')}`
        );
        setCerts(res.data);
        await listProject();
        projects;
      } catch (error) {
        console.error('Erro ao buscar certificados:', error);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();

  const getCert = (cert, year_g) => {
    setDisabled(true);
    api
      .patch('/certificate/profile', {
        year: year_g,
        cert,
        profile_id: sessionStorage.getItem('profile_id'),
      })
      .then((res) => {
        setDisabled(false);
        const certUrl = `${baseUrl}/certificate/${res.data}`;
        const newWindow = window.open(certUrl, '_blank');
        if (!newWindow) {
          alert('Por favor, habilite pop-ups para ver o certificado');
        }
      })
      .catch((err) => {
        setDisabled(false);
        console.warn(err);
      });
  };

  return (
    <LayoutBase title="Certificados">
      <div className="flex flex-col gap-2 ml-2 mt-5">
        {certs.length > 0 &&
          certs.map((years) => {
            return (
              years.profiles.length >= 0 && (
                <div key={years.year} className="flex flex-col gap-4">
                  <h1 className="m-5 text-xl text-semibold">
                    Certificados de participação {years.year}
                  </h1>
                  {years.profiles.map((cert, index) => (
                    <CertButtonDownload
                      key={String(cert + new Date())}
                      onClick={() => {
                        console.log(cert);
                        getCert(cert, years.year);
                      }}
                      disabled={disabled}>
                      <FiFileText size={24} color="#fff" /> Certificado {cert}
                    </CertButtonDownload>
                  ))}
                </div>
              )
            );
          })}
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <div key={project._id} className="flex flex-col gap-4">
                <h1 className="m-5 text-xl text-semibold">
                  Certificados de participação de projetos {project.year}
                </h1>
                <CertButtonDownload onClick={() => buildCertificate(project)}>
                  <FiFileText size={24} color="#fff" />
                  Certificado {project.title}
                </CertButtonDownload>
              </div>
            );
          })}
      </div>
    </LayoutBase>
  );
}
