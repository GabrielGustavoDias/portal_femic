import Link from 'next/link';
import {
  FaBriefcaseMedical,
  FaDna,
  FaGraduationCap,
  FaPencilRuler,
  FaPeopleCarry,
  FaRocket,
  FaTree,
  FaUniversity,
  FaUsers,
} from 'react-icons/fa';

import { ProjectContainerList, ProjectItem } from './styles';

// interface Project {
// 	title: string;
// 	id_femic: string;
// 	_id: string;
// 	area: string;
// }

// interface IProjectsList {
//   projects: Project[];
// }

export default function StandProjectList({ projects }) {
  const renderIcon = (area) => {
    let icon = <b>2</b>;
    if (area == 'c_saude') {
      icon = <FaBriefcaseMedical size={24} color="#333" />;
    } else if (area == 'c_exatas_terra') {
      icon = <FaRocket size={24} color="#333" />;
    } else if (area == 'c_agrarias') {
      icon = <FaTree size={24} color="#333" />;
    } else if (area == 'c_biologicas') {
      icon = <FaDna size={24} color="#333" />;
    } else if (area == 'c_humanas') {
      icon = <FaUsers size={24} color="#333" />;
    } else if (area == 'c_sociais_aplicadas') {
      icon = <FaUniversity size={24} color="#333" />;
    } else if (area == 'letras_letras_artes') {
      icon = <FaPencilRuler size={24} color="#333" />;
    } else if (area == 'engenharias') {
      icon = <FaGraduationCap size={24} color="#333" />;
    }
    return icon;
  };

  return (
    <ProjectContainerList>
      {projects.map((proj) => (
        <ProjectItem key={proj.id_femic}>
          <div className="icon">{renderIcon(proj.area)}</div>
          <span>{proj.title}</span>
          <Link href={`/projeto/${proj._id}`}>Ver projeto</Link>
        </ProjectItem>
      ))}
    </ProjectContainerList>
  );
}
