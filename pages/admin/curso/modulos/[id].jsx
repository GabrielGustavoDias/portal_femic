import { useEffect, useState } from 'react';
import { Modal } from '@nextui-org/react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FiImage } from 'react-icons/fi';
import Image from 'next/image';

import AdminLayout from '../../../../styles/layout/admin';
import { TabsStyle } from '../../../../styles/layout/styles';

import {
  AulaInaugural,
  Avaliacao,
  Atividade,
} from '../../../../components/CourseComponents';
import { useRouter } from 'next/router';
import api, { baseUrl } from '../../../../config/api';

import { GetServerSideProps } from 'next';
import { ICourse, IModule } from '../../../../types/course';
import { useAlert } from 'react-alert';

// interface IProp {
//   courseProps: ICourse;
// }

export default function CursoModulo({ courseProps }) {
  const [moduleId, setModuleId] = useState('aula inaugural');
  const [visible, setVisible] = useState(false);
  const [modules, setModules] = useState < [] > [];

  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  const router = useRouter();

  const alert = useAlert();

  useEffect(() => {
    setModules(courseProps.modulos);
    sessionStorage.setItem('curso', JSON.stringify(courseProps));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const renderModule = () => {
    if (moduleId == 'aula inaugural') {
      return (
        <AulaInaugural id={courseProps._id} data={courseProps.description} />
      );
    } else if (moduleId == 'avaliacao') {
      return <Avaliacao id={courseProps._id} data={courseProps.avaliacao} />;
    } else {
      return (
        <Atividade
          id={courseProps._id}
          data={courseProps}
          moduleId={moduleId}
        />
      );
    }
  };

  const onChangePhoto = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    setImage(files[0]);
    var reader = new FileReader();
    var url = reader.readAsDataURL(files[0]);
    setPreview(`${url}`);
  };

  const updatePhoto = () => {
    if (!image) {
      alert.info('Selecione uma imagem');
      return;
    }
    const dataPhoto = new FormData();
    dataPhoto.append('photo', image);
    api
      .patch(`course/banner/photo/${courseProps._id}`, dataPhoto)
      .then((res) => {
        setVisible(false);
      })
      .catch((err) => {
        console.warn(err);
        setVisible(false);
      });
  };

  const publicCourse = () => {
    const confirmation = confirm(
      'Você realmente deseja publicar este curso? Após publicar, todo o curso ficará disponível aos usuários do Portal FEMIC. Antes de publicar, confira todas as informações.'
    );
    if (confirmation) {
      api
        .patch(`course/publish/${courseProps._id}`)
        .then(() => {
          alert.success('curso publicado com sucesso');
          window.location.reload();
        })
        .catch(console.warn);
    }
  };

  return (
    <AdminLayout>
      <div className=" flex flex-col gap-6 items-flexstart justify-between bg-white rounded w-fit m-5 p-5">
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={() => {
            setVisible(false);
            sessionStorage.setItem('tutorial_orientador', 's');
          }}>
          <Modal.Body>
            <div className="flex flex-col items-center">
              <span className="text-center mb-2">
                Selecione um banner com as dimensões retangulares (recomendado
                1500 x 450 px)
              </span>
              <label
                htmlFor="photo-up"
                className="mt-5 px-6 py-3 bg-emerald-500 flex text-white items-center pointer">
                Arquivo:
                <FiImage size={18} style={{ marginLeft: 5 }} color="#fff" />
              </label>
              <input
                id="photo-up"
                type="file"
                onChange={onChangePhoto}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg image/webp"
              />
              {image && (
                <img
                  src={preview}
                  className="rounded w-40 h-26 mt-5"
                  alt="Preview photo"
                />
              )}
              {image && (
                <button
                  className="mt-5 pointer bg-slate-200 px-4 py-2 rounded"
                  onClick={updatePhoto}>
                  <span>Salvar foto</span>
                </button>
              )}
            </div>
          </Modal.Body>
        </Modal>
        <Image
          loader={() => `${baseUrl}/course/banner/${courseProps?.banner}`}
          src={
            `${baseUrl}/course/banner/${courseProps?.banner}` || '/default.png'
          }
          width={1500}
          height={450}
          alt="Banner of course"
        />
        <span className="self-center text-xl font-semibold">
          {courseProps.title}
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => setVisible(true)}
            className="w-fit text-white bg-gray-900 px-4 py-2 rounded">
            Editar Capa
          </button>
          <button
            onClick={() => router.push(`/admin/curso/${courseProps._id}`)}
            className="w-fit text-white bg-gray-900 px-4 py-2 rounded">
            Atualizar curso
          </button>
          <button
            onClick={publicCourse}
            className="w-fit text-white bg-emerald-500 px-4 py-2 rounded">
            {courseProps.published ? 'Curso Publicado' : 'Publicar curso'}
          </button>
        </div>
      </div>
      <TabsStyle>
        <div className="p-5">
          <Tabs
            className="tabs"
            disabledTabClassName="disabled-tab"
            selectedTabClassName="abled-tab"
            onSelect={(index) => setModuleId(modules[index].id)}>
            <TabList className="tab-label">
              {modules?.map((module, index) => (
                <Tab className="tab-alt" key={module.id}>
                  {'Aula inaugural, Avaliação'.includes(module.name)
                    ? module.name
                    : `Módulo ${index}`}
                </Tab>
              ))}
            </TabList>
            {modules?.map((module) => (
              <TabPanel key={`${module.id}`}>
                <h1 className="text-2xl my-2 font-semibold">{module.name}</h1>
                {renderModule()}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </TabsStyle>
    </AdminLayout>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.query.id;

  if (id == 'new') {
    return {
      props: {
        courseProps: {},
      },
    };
  }

  const courseData = await fetch(`${baseUrl}/course/${id}`);
  const data = await courseData.json();

  return {
    props: {
      courseProps: data,
    },
  };
};
