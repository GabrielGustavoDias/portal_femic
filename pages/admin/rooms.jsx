import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Modal, Text } from '@nextui-org/react';

import api from '../../config/api';
import { FormQuery, ProjectContainer } from '../../styles/admin/styles.module';
import AdminLayout from '../../styles/layout/admin';
import { IRooms } from '../../types/rooms';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const alert = useAlert();

  const refreshRoom = () => {
    api
      .get('/rooms')
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refreshRoom();
  }, []);

  const renderDate = (data) => {
    const date = new Date(data);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
  };

  const createRoom = (e) => {
    setShowCreateRoomModal(false);
    e.preventDefault();

    api
      .post('/rooms', { name: e.target[0].value })
      .then((res) => {
        refreshRoom();
      })
      .catch((err) => {
        alert.error(err.response.data.message);
      });
  };

  const deleteAll = () => {
    const confirmation = confirm(
      'Tem certeza que deseja deletar todas as salas?'
    );

    if (confirmation) {
      api
        .delete('/rooms/dell/all')
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };
  return (
    <AdminLayout>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={showCreateRoomModal}
        onClose={() => setShowCreateRoomModal(false)}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Digite o nome da Sala:
          </Text>
        </Modal.Header>
        <Modal.Body>
          <FormQuery onSubmit={createRoom} className="flex">
            <input type="text" className="bg-gray-300 h-7 mr-3 pl-2" required />
            <button type="submit">Criar</button>
          </FormQuery>
        </Modal.Body>
      </Modal>
      <FormQuery
        onSubmit={(e) => {
          e.preventDefault();
          setShowCreateRoomModal(!showCreateRoomModal);
        }}>
        <span>Crie uma nova sala: </span>
        <button className="ml-7" type="submit">
          Criar
        </button>
      </FormQuery>
      <FormQuery onSubmit={deleteAll}>
        <label>Deletar todas as salas: </label>
        <button className="delete ml-1">Deletar</button>
      </FormQuery>

      {rooms.map((room, index) => (
        <ProjectContainer key={room._id}>
          <div className="w-8 h-8 bg-emerald-600 flex items-center justify-center rounded-full">
            <div className="text-white font-semibold">{index}</div>
          </div>
          <div className="flex flex-col">
            <label>{room.name}</label>
            <span className="sub-label">{room.projects.length} projetos</span>
          </div>
          <div className="flex flex-col">
            <label>Dia/hora</label>
            <span>
              {renderDate(room.day)}/{room.hour}
            </span>
          </div>
          <div className="flex">
            {/*<button className='delete'>Deletar sala</button> */}
          </div>
          <Link href={`/admin/room/${room._id}`}>
            <a>Ver Sala</a>
          </Link>
        </ProjectContainer>
      ))}
    </AdminLayout>
  );
}
