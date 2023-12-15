import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import { FiImage, FiCamera } from 'react-icons/fi';

import { Modal, Text } from '@nextui-org/react';

import LayoutBase from '../styles/layout/feiraBase';
import { Input, Select } from '../styles/layout/styles';
import { Container, Header, Form } from '../styles/feiraperfil';

import api, { baseUrl } from '../config/api';
import { ProfileContainer, LabelFile } from '../styles/user/perfil';

export default function PerfilFeira() {
  const [avatar, setAvatar] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [verifyNewPass, setVerifyNewPass] = useState('');
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');
  const [visible, setVisible] = useState(false);

  const alert = useAlert();

  const { register, handleSubmit, watch, reset, setValue } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    api
      .get('/affiliate/profile', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((res) => {
        reset(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setAvatar(sessionStorage.getItem('avatar') || '');
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

  const updateAffiliateProfile = (data) => {
    if (data['ampic'] == 's') {
      data['ampic'] = true;
    } else if (data['ampic'] == 'n') {
      data['ampic'] = false;
    }

    api
      .patch('/affiliate/profile', data, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((res) => {
        sessionStorage.setItem('name', data['name']);
        alert.success('Dados atualizados com sucesso.');
      })
      .catch((err) => {
        alert.error('Ocorreu um erro ao atualizar, tente novamente mais tarde');
        console.warn(err);
      });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    api
      .patch(
        '/affiliate/update/password',
        { oldPass, newPass, verifyNewPass },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        alert.success('Senha alterada com sucesso');
      })
      .catch((err) => {
        alert.error(err.response.data.message);
      });
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
      alert.error('Selecione uma imagem');
      return;
    }
    const dataPhoto = new FormData();
    dataPhoto.append('photo', image);
    api
      .patch('affiliate/profile/photo', dataPhoto, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((res) => {
        sessionStorage.setItem(
          'avatar',
          `${baseUrl}/affiliate/profile/image/${res.data.image}`
        );
        setAvatar(sessionStorage.getItem('avatar') || '');
        setVisible(false);
      })
      .catch((err) => {
        alert.error('Deu erro');
        console.warn(err);
        setVisible(false);
      });
  };

  return (
    <LayoutBase title="Perfil">
      <Container>
        <ProfileContainer>
          <div className="content-profile">
            <div className="content-image">
              <img src={avatar} className="w-32 h-32" />
              <button
                className="p-2 bg-slate-200 rounded flex items-center cursor-pointer mt-2 z-10"
                style={{ cursor: 'pointer', width: 'fit-content' }}
                onClick={() => setVisible(true)}>
                <FiCamera size={18} color="#233" style={{ marginRight: 8 }} />{' '}
                Editar
              </button>
              <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={() => setVisible(false)}>
                <Modal.Header>
                  <Text id="modal-title" size={18}>
                    Selecione a nova foto
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-800">
                      Tamanho máximo da imagem de 7MB
                    </p>
                    <p className="text-sm text-gray-800">
                      Formatos: .png, .jpg, .jpeg, .svg
                    </p>
                    <LabelFile htmlFor="photo-up" className="mt-5">
                      Arquivo:{' '}
                      <FiImage
                        size={18}
                        style={{ marginLeft: 5 }}
                        color="#fff"
                      />
                    </LabelFile>
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
                        className="rounded w-32 h-32 mt-5"
                        alt="Preview photo"
                      />
                    )}
                    {image && (
                      <button className="mt-5" onClick={updatePhoto}>
                        <LabelFile>Salvar foto</LabelFile>
                      </button>
                    )}
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <div className="infos md:flex-row flex-col">
              <div className="flex flex-col mr-5">
                <label className="font-semibold text-xl">
                  Nome da Feira afiliada
                </label>
                <span className="w-52 break-words text-gray-700">
                  {watch('name')}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-xl">
                  ID da feira afiliada
                </label>
                <span className="text-gray-700">{watch('identifier')}</span>
                <label className="font-semibold text-xl">
                  Quantidade de credenciais
                </label>
                <span className="text-orange-500 ">
                  {watch('credentials') || 0}
                </span>
              </div>
            </div>
          </div>
        </ProfileContainer>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 20 }}>
          Atualizar perfil
        </h1>
        <Form onSubmit={handleSubmit(updateAffiliateProfile)}>
          <label>Nome</label>
          <Input type="text" {...register('name')} required />
          <label>Associada à AMPIC</label>
          <Select onChange={(e) => setValue('ampic', e.target.value)} required>
            <option value="" disabled selected>
              Mude aqui
            </option>
            <option value="n">Não</option>
            <option value="s">Sim</option>
          </Select>
          <label>Abrangência da sua feira</label>
          <Select {...register('abrangencia')} required>
            <option value="" disabled selected>
              Mude aqui
            </option>
            <option value="institucional">Institucional</option>
            <option value="nacional">Nacional</option>
            <option value="estadual">Estadual</option>
            <option value="regional">Regional</option>
            <option value="municipal">Municipal</option>
            <option value="escolar">Escolar</option>
          </Select>
          <label>Canais de divulgação da feira</label>
          <Input
            type="text"
            placeholder="Instagram"
            {...register('instagram_link')}
          />
          <Input
            type="text"
            placeholder="Fanpage"
            {...register('fanpage_link')}
          />
          <Input
            type="text"
            placeholder="Website ou blog"
            {...register('website_link')}
          />
          <Input
            type="text"
            placeholder="YouTube"
            {...register('youtube_link')}
          />
          <Input
            type="text"
            placeholder="Outros"
            {...register('outros_link')}
          />
          <h1>Sobre a afiliação</h1>
          <label>Modalidade(s) de afiliação.</label>
          <label>
            <input type="checkbox" {...register('modality_jun')} />
            FEMIC Júnior
          </label>
          <label>
            <input type="checkbox" {...register('modality_jov')} />
            FEMIC Jovem
          </label>
          <label>
            <input type="checkbox" {...register('modality_prof')} />
            FEMIC Mais
          </label>
          <label style={{ marginTop: 20 }}>
            Áreas científicas da sua feira
          </label>
          <label>
            <input type="checkbox" {...register('area_cien_exatas')} />
            Ciências Exatas e da Terra
          </label>
          <label>
            <input type="checkbox" {...register('area_engenharia')} />
            Engenharias
          </label>
          <label>
            <input type="checkbox" {...register('area_cien_agro')} />
            Ciências Agrárias
          </label>
          <label>
            <input type="checkbox" {...register('area_cien_bio')} />
            Ciências Biológicas
          </label>
          <label>
            <input type="checkbox" {...register('area_cien_human')} />
            Ciências Humanas
          </label>
          <label>
            <input type="checkbox" {...register('area_cien_saude')} />
            Ciências da Saúde
          </label>
          <label>
            <input type="checkbox" {...register('area_cien_soc')} />
            Ciências Sociais e Aplicadas
          </label>
          <label>
            <input type="checkbox" {...register('area_linguas')} />
            Linguística, Letras e Artes
          </label>
          <label style={{ marginTop: 20 }}>
            Quantidade de projetos previstos para o ano vigente?
          </label>
          <Input type="number" {...register('quant_proj')} required />
          <label>
            Qual a data previsa para realização da sua feira no ano vigente?
          </label>
          <Input type="date" {...register('realization_date')} required />
          <h1>Instituição realizadora</h1>
          <label>Nome da instituição</label>
          <Input type="text" {...register('inst_name')} required />
          <label>Email da instituição</label>
          <Input type="email" {...register('inst_email')} required />
          <label>Categoria administrativa</label>
          <Select id="" {...register('inst_type')}>
            <option value="publica">Pública</option>
            <option value="privada">Privada</option>
            <option value="filantropica">Filantrópica</option>
          </Select>
          <h1>Coordenação do evento</h1>
          <label>Nome do(a) coordenador(a)</label>
          <Input type="text" {...register('cord_name')} required />
          <label>E-mail do(a) coordenador(a)</label>
          <Input type="text" {...register('cord_email')} required />
          <label>Telefone do(a) coordenador(a)</label>
          <Input type="text" {...register('cord_phone')} required />
          <button type="submit" className="update">
            Salvar
          </button>
        </Form>
        <Form onSubmit={updatePassword} className="mt-10">
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 20 }}>
            Alterar senha
          </h1>
          <label>Senha antiga</label>
          <Input
            type="password"
            onChange={(e) => setOldPass(e.target.value)}
            minLength={6}
            placeholder="Digite aqui sua senha antiga"
            required
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
          />
          <label>Senha nova</label>
          <Input
            type="password"
            onChange={(e) => setNewPass(e.target.value)}
            minLength={6}
            placeholder="Digite aqui a nova senha de login"
            required
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
          />
          <label>Repita a nova senha</label>
          <Input
            type="password"
            onChange={(e) => setVerifyNewPass(e.target.value)}
            placeholder="Repita a nova senha aqui"
            minLength={6}
            required
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
          />
          <button type="submit" className="update">
            Alterar senha
          </button>
        </Form>
      </Container>
    </LayoutBase>
  );
}
