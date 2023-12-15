import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import { baseUrl } from '../../config/api';
import { UserCard } from '../../styles/projetos/styles.module';

// type IProject = {
// 	project: any;
// 	children?: React.ReactNode;
// };

const CardProject = ({ project, children }) => {
  const AvatarFocus = () => {
    return (
      <div className="flex flex-col items-center justify-center w-44 h-44 rounded">
        <img
          src={`${baseUrl}/project/logo/${project._id}`}
          width={120}
          height={160}
          alt="Foto do usuário"
        />
      </div>
    );
  };

  return (
    <UserCard>
      <Tooltip content={<AvatarFocus />} placement="right">
        <img
          src={`${baseUrl}/project/logo/${project._id}`}
          width={90}
          height={90}
          alt="Foto do usuário"
        />
      </Tooltip>
      <Tooltip content={project.title} color="invert" placement="right">
        <h1 style={{ fontSize: 18 }}>{project.title}</h1>
      </Tooltip>
      <Link href={`/admin/projetos/${project._id}`} passHref>
        <h2 className="underline cursor-pointer">{project.id_femic}</h2>
      </Link>
      {children}
    </UserCard>
  );
};

export default CardProject;
