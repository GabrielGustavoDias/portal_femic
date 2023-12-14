import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import api, { baseUrl } from '../config/api';
import { ContainerCourse } from '../styles/cursos';
import LayoutBase from '../styles/layout/base';

export default function Cursos({ courses }: any) {
  const [listCoursesFiltered, setListCoursesFiltered] = useState<any[]>([]);
  const [typeUser, setTypeUser] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem('page');
    setTypeUser(user);
  }, []);

  useEffect(() => {
    if (typeUser) {
      const filtered = courses.filter(
        (course: any) => course.public === typeUser
      );
      setListCoursesFiltered(filtered);
    }
  }, [courses, typeUser]);

  return (
    <LayoutBase title="Cursos">
      {listCoursesFiltered.length > 0 &&
        listCoursesFiltered.map((course: any) => (
          <ContainerCourse key={course._id}>
            <div className="container-image">
              <img
                src={`${baseUrl}/course/banner/${course.banner}`}
                alt="default image"
                width={300}
              />
              <p className="strong whitespace-normal break-all">{course.title}</p>
            </div>
            <div className="container-info w-[80%]">
              <p className="strong whitespace-normal break-all max-w-2xl">{course.title}</p>
              <p className="whitespace-normal break-all max-w-3xl">{course.about}</p>
              <div className="flex flex-col">
                <p className="strong">Duração do curso</p>
                <p className="text-lg font-semibold text-slate-700">
                  {course.time} horas
                </p>
              </div>
              <Link href={`/curso/info/${course._id}`} passHref>
                <a className="sucess self-end">Ir para curso</a>
              </Link>
            </div>
          </ContainerCourse>
        ))}
    </LayoutBase>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const coursesJson = await fetch(`${baseUrl}/course`);

  const courses = await coursesJson.json();

  return {
    props: {
      courses,
    },
  };
};
