import api, { baseUrl } from '../../config/api';

import AdminLayout from '../../styles/layout/admin';

import { DateContainer, FormQuery } from '../../styles/admin/styles.module';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';

export default function Datas() {
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    api.get('/data/all').then((res) => {
      reset(res.data);
    });
  }, []);

  const updateStatus = (e: any) => {
    e.preventDefault();
    api
      .patch('/project/status/update', {
        prev: e.target[0].value,
        next: e.target[1].value,
      })
      .then((res) => {
        alert.success(`Atualizados ${res.data.modifiedCount} projetos`);
      });
  };

  const sendDates = (data: any) => {
    
    api.patch('/data/update', data).then((res) => {
      alert.success('Datas atualizadas');
    });
  };

  const renewUsers = () => {
    const confirmation = confirm(
      'Tem certeza que deseja fazer isso? isso não será reversivel.'
    );

    if (confirmation) {
      api
        .patch('/admin/users/updateall', { renew: true })
        .then(() => {
          alert.show('Todos os usuarios irão receber novos perfis.');
        })
        .catch((err) => {
          alert.error('algum erro ocorreu ao atualizar');
        });
    } else {
      alert.show('tarefa cancelada');
    }
  };

  const zerarCredenciais = () => {
    const confirmation = confirm(
      'Tem certeza que deseja fazer isso? isso não será reversivel.'
    );

    if (confirmation) {
      api
        .patch('/admin/affiliate/updateall', {
          credentials: 0,
          credentials_used: 0,
        })
        .then(() => {
          alert.show('Todos as feiras estão zeradas de credenciais.');
        })
        .catch((err) => {
          alert.error('algum erro ocorreu ao atualizar');
        });
    } else {
      alert.show('tarefa cancelada');
    }
  };

  return (
    <AdminLayout>
      <div className="m-5">
        <h1 style={{ fontSize: 28 }}>Datas</h1>
        <label>Mudar status: </label>
        <FormQuery onSubmit={updateStatus}>
          <select className="input" required>
            <option value="" selected disabled>
              Selecione um
            </option>
            <option value="rascunho">Rascunho</option>

            <option value="reprovado">Reprovado</option>
            <option value="recomendado">Recomendado</option>
            <option value="finalista">Finalista</option>
            <option value="confirmado">Confirmado</option>
            <option value="concluido">Concluido</option>
          </select>
          <span className="mr-2">para</span>
          <select className="input" id="" name="">
            <option value="" selected disabled>
              Selecione um
            </option>
            <option value="rascunho">Rascunho</option>
            <option value="reprovado">Reprovado</option>
            <option value="recomendado">Recomendado</option>
            <option value="finalista">Finalista</option>
            <option value="confirmado">Confirmado</option>
            <option value="concluido">Concluido</option>{' '}
          </select>
          <button>Confirmar</button>
        </FormQuery>
        <form onSubmit={handleSubmit(sendDates)}>
          <DateContainer>
            <span>Cadastro de participantes</span>
            <div className="">
              <label className="flex">
                Inicio{': '}
                {watch('registration_date_initial')?.length > 0 &&
                  new Date(
                    watch('registration_date_initial')
                  ).toLocaleDateString()}
              </label>
              <input
                type="datetime-local"
                {...register('registration_date_initial')}
              />
            </div>
            <div className="">
              <label className="flex">
                Fim{': '}
                {watch('registration_date_end')?.length > 0 &&
                  new Date(watch('registration_date_end')).toLocaleDateString()}
              </label>
              <input
                type="datetime-local"
                {...register('registration_date_end')}
              />
            </div>
          </DateContainer>
          <DateContainer>
            <span>Cadastro de Feiras Afiliadas</span>
            <div className="">
              <label className="flex">
                Inicio{': '}
                {watch('registration_date_initial')?.length > 0 &&
                  new Date(
                    watch('registration_affiliate_date_initial')
                  ).toLocaleDateString()}
              </label>
              <input
                type="datetime-local"
                {...register('registration_affiliate_date_initial')}
              />
            </div>
            <div className="">
              <label className="flex">
                Fim{': '}
                {watch('registration_date_end')?.length > 0 &&
                  new Date(
                    watch('registration_affiliate_date_end')
                  ).toLocaleDateString()}
              </label>
              <input
                type="datetime-local"
                {...register('registration_affiliate_date_end')}
              />
            </div>
          </DateContainer>
          <DateContainer>
            <span>Submissão de novos projetos</span>
            <div className="">
              <label className="flex">
                Inicio{': '}
                {watch('upload_project_initial')?.length > 0 &&
                  new Date(
                    watch('upload_project_initial')
                  ).toLocaleDateString()}
              </label>
              <input
                type="datetime-local"
                {...register('upload_project_initial')}
              />
            </div>
            <div className="">
              <label className="flex">
                Fim{': '}
                {watch('upload_project_end')?.length > 0 &&
                  new Date(watch('upload_project_end')).toLocaleDateString()}
              </label>
              <input
                type="datetime-local"
                {...register('upload_project_end')}
              />
            </div>
          </DateContainer>
          <DateContainer>
            <span>Ano dos projetos exibidos na home</span>
            <label>Ano: {watch('year_show')}</label>
            <input
              type="number"
              min={2022}
              max={new Date().getFullYear()}
              step={1}
              {...register('year_show')}
            />
          </DateContainer>
          <button
            type="submit"
            className="px-4 py-2 mt-3 bg-emerald-500 text-white font-semibold rounded">
            Salvar
          </button>
        </form>
        <div className="flex items-center bg-white justify-center rounded gap-4 mt-5 p-5">
          <div className="flex flex-col">
            <span className="uppercase text-xl">
              Iniciar nova feira e solicitar que todos refaçam o cadastro:
            </span>
            <span className="text-sm text-gray-700 mt-2">
              todos os perfis a tela de confirmação em que será solicitado que
              atualize seus dados de perfil e ao término, será entregue aos
              usuários novos perfis limpos sem projetos e os antigos irão para o
              histórico.
            </span>
          </div>
          <button
            className="px-4 whitespace-nowrap py-2 bg-red-500 text-white font-semibold rounded"
            onClick={renewUsers}>
            INICAR NOVOS PERFIS
          </button>
        </div>
        <div className="flex items-center bg-white justify-between rounded gap-4 mt-5 p-5">
          <div className="flex flex-col">
            <span className="uppercase text-xl">
              Zerar todas as credenciais das feiras afiliadas:
            </span>
          </div>
          <button
            className="px-4 whitespace-nowrap py-2 bg-red-500 text-white font-semibold rounded"
            onClick={zerarCredenciais}>
            ZERAR
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
