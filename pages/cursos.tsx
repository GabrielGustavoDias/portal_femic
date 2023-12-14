import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import api, { baseUrl } from '../config/api';
import { ContainerCourse } from '../styles/cursos';
import LayoutBase from '../styles/layout/base';

export default function Cursos({ courses }: any) {
  return (
    <LayoutBase title="Cursos">
      {courses.length > 0 &&
        courses.map((course: any) => (
          <ContainerCourse key={course._id}>
            <div className="container-image ">
              <img
                src={`${baseUrl}/course/banner/${course.banner}`}
                alt="default image"
                width={300}
              />
              <p>{course.title}</p>
            </div>
            <div className="container-info">
              <p className="strong">{course.title}</p>
              <div dangerouslySetInnerHTML={{ __html: course.about }} />
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
