import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import LayoutBase from '../../styles/layout/base';
import { TabsStyle } from '../../styles/layout/styles';

import InfoHeader from '../../components/CourseComponents/user/InfoHeader';

import Atividade from '../../components/CourseComponents/user/Atividade';
import AulaInalgural from '../../components/CourseComponents/user/AulaInalgural';
import Avaliacao from '../../components/CourseComponents/user/Avaliacao';
// import { IModule } from '../../types/course';

export default function Curso() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [curso, setCurso] = useState < any > {};
  const [user, setUser] = useState < any > {};
  const [moduleId, setModuleId] = useState('aula inaugural');
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const courseData = sessionStorage.getItem('course');

    const userData = sessionStorage.getItem('user_course');
    const cursoJS = JSON.parse(courseData || '{}');
    setCurso(JSON.parse(courseData || '{}'));
    setUser(JSON.parse(userData || '{}'));
    setModules(cursoJS.modulos);
  }, []);

  useEffect(() => {
    const currentModuleIndex = modules.findIndex(
      (module) => module.id === moduleId
    );
    if (currentModuleIndex !== currentModuleIndex) {
      setCurrentModuleIndex(currentModuleIndex);
    }
  }, [moduleId, modules, currentModuleIndex]);

  const renderModule = () => {
    if (moduleId == 'aula inaugural') {
      const moduloOneId = modules.length > 0 ? modules[1].id : null;
      return (
        <AulaInalgural
          id={curso._id}
          idModuleOne={moduloOneId}
          setIdModule={setModuleId}
        />
      );
    } else if (moduleId == 'avaliacao') {
      return <Avaliacao id={curso._id} data={curso.avaliacao} />;
    } else {
      return <Atividade id={curso._id} data={curso} moduleId={moduleId} />;
    }
  };

  return (
    <LayoutBase>
      <InfoHeader
        title={curso.title}
        dateIni={user.dateIni}
        dateFim={user.dateFim}
        totalActivities={user.activities}
        avaCompleted={user.complete}
      />
      <TabsStyle>
        <div className="p-5 bg-white m-8 rounded">
          <Tabs
            className="tabs"
            disabledTabClassName="disabled-tab"
            selectedTabClassName="abled-tab"
            onSelect={(index) => setModuleId(modules[index]?.id)}>
            <TabList className="tab-label">
              {modules.map((module, index) => (
                <Tab className="tab-alt" key={module.id}>
                  {'Aula inaugural, Avaliação'.includes(module.name)
                    ? module.name
                    : `Módulo ${index}`}
                </Tab>
              ))}
            </TabList>
            {modules?.map((module) => (
              <TabPanel key={module.id}>{renderModule()}</TabPanel>
            ))}
          </Tabs>
        </div>
      </TabsStyle>
    </LayoutBase>
  );
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      project: null,
    },
  };
};
