import { Tooltip } from '@nextui-org/react';
import { FC } from 'react';
import { FiSmile } from 'react-icons/fi';
import { baseUrl } from '../../config/api';
import { UserCard } from '../../styles/projetos/styles.module';

// type IProps = {
// 	integrante: any;
// 	children?: React.ReactNode;
// 	escuro?: boolean;
// };

const CardPeople = ({ integrante, children, escuro }) => {
  const AvatarFocus = () => {
    return (
      <div className="flex flex-col items-center justify-center w-44 h-44 rounded">
        <img
          src={`${baseUrl}/user/profile/image/${integrante.user_avatar}`}
          width={120}
          height={160}
          alt="Foto do usuário"
        />
        <span className="text-lg capitalize flex text-gray-700 gap-2">
          {integrante.value}
          <FiSmile size={32} color={integrante.color} />
        </span>
      </div>
    );
  };

  return (
    <UserCard style={escuro ? { backgroundColor: '#ededed' } : {}}>
      <Tooltip content={<AvatarFocus />}>
        <img
          src={`${baseUrl}/user/profile/image/${integrante.user_avatar}`}
          width={90}
          height={90}
          alt="Foto do usuário"
        />
      </Tooltip>
      <Tooltip content={integrante.user_name} color="invert">
        <h1>{integrante.user_name}</h1>
      </Tooltip>
      <h2>{integrante.user_local}</h2>
      {children}
    </UserCard>
  );
};

export default CardPeople;
