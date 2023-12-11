import styled from 'styled-components';
import { Project } from '../home/style.module';

export const WelcomeHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin: 5px 0 10px 20px;
  h1 {
    font-size: 2rem;
    line-height: 100%;
  }
  p {
    font-size: 1.4rem;
  }
  form {
    display: flex;
    height: 30px;
    gap: 10px;
    margin-bottom: 20px;
    select {
      color: #333;
      background-color: #33333330;
      padding: 0 5px;
      border-radius: 4px;
    }
    input {
      border-radius: 4px;
      padding: 0 5px;
      color: #333;
      border: 1px solid #333333;
    }
    button {
      color: #fff;
      background-color: #1fb58f;
      border-radius: 4px;
      padding: 0 12px;
    }
  }
`;

export const FormQuery = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 5px 0 10px 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .input {
    height: 30px;
    width: 150px;
    margin-right: 10px;
    margin-top: 5px;
    background-color: #fff;
    border-radius: 3px;
    padding: 0 6px;
    @media (max-width: 768px) {
      width: 80vw;
      height: 44px;
      margin: 20px 0;
    }
  }

  label {
    line-height: 100%;
  }

  button {
    height: 30px;
    color: #fff;
    font-weight: 600;
    background-color: ${({ theme }) => theme.bgColors.ocean};
    padding: 0 12px;
    border-radius: 3px;
    @media (max-width: 768px) {
      width: 80vw;
      height: 44px;
      margin-bottom: 40px;
    }
  }
  .delete {
    height: 30px;
    color: #fff;
    font-weight: 600;
    background-color: ${({ theme }) => theme.bgColors.cocktail};
    padding: 0 12px;
    border-radius: 3px;
    @media (max-width: 768px) {
      width: 80vw;
      height: 44px;
      margin-bottom: 40px;
    }
  }
`;

export const UserContainer = styled.div`
  display: grid;
  width: 99%;
  background-color: #fff;
  grid-template-columns: 50px clamp(200px, 50%, 300px) 100px 100px 140px;
  align-items: center;
  padding: 10px 16px;
  justify-content: space-between;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .title {
    font-size: 1.1rem;
  }

  .sub {
    color: #777;
    font-size: 0.9rem;
  }

  a,
  .a-alt {
    color: #fff;
    font-weight: 600;
    padding: 6px 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.bgColors.ocean};
  }

  .danger {
    display: flex;
    text-align: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    padding: 6px 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.bgColors.cocktail};
  }
`;

export const AffiliateContainer = styled.div`
  display: grid;
  width: 99%;
  background-color: #fff;
  grid-template-columns: 50px clamp(220px, 50%, 310px) 150px 100px 140px;
  align-items: center;
  padding: 10px 16px;
  justify-content: space-between;
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  span {
    color: #777;
  }
  a {
    color: #fff;
    text-align: center;
    font-weight: 600;
    padding: 6px 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.bgColors.ocean};
  }
`;

export const CourseContainer = styled(UserContainer)`
  display: flex;

  div {
    display: flex;
    flex-direction: column;

    span {
      background-color: #f4f4f4;
    }
  }

  #div_course_duration {
    align-items: flex-end;
  }

  #div_image {
    flex-direction: row;
    width: 60%;
    gap: 20px;
    span {
      text-align: center;
      max-width: 153px;
    }
  }
`;

interface IPropsContainter {
  avaliacao?: boolean;
}

export const ProjectContainer = styled.div<IPropsContainter>`
  display: grid;
  width: 99%;
  background-color: #fff;
  grid-template-columns: ${(props) =>
    props.avaliacao
      ? '50px clamp(200px, 50%, 350px) 1.5fr 1fr 1fr 100px'
      : '50px clamp(200px, 50%, 300px) 140px 160px 120px'};
  align-items: center;
  padding: 10px 16px;
  justify-content: space-between;
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  div {
    max-width: 200px;
  }

  span {
    color: #777;
  }
  a {
    color: #fff;
    font-weight: 600;
    text-align: center;
    padding: 6px 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.bgColors.ocean};
  }
  .delete {
    color: #fff;
    font-weight: 600;
    text-align: center;
    padding: 6px 8px;
    border-radius: 4px;
    background-color: tomato;
  }
  .confirm {
    color: #fff;
    font-weight: 600;
    text-align: center;
    padding: 6px 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.bgColors.ocean};
  }
`;

export const DateContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr;

  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 16px;
  border-radius: 4px;
  & > span {
    font-size: larger;
  }

  input {
    background-color: #ededed;
    height: 33px;
  }
`;

export const CreateCourse = styled(Project)``;

export const FormCourse = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 600;
  }
  span.sub {
    font-size: 14px;
    color: #555;
  }

  input,
  textarea,
  select {
    background-color: #fff;
    padding: 4px 6px;
    border: 1px solid #22222230;
    border-radius: 2px;
  }

  .sucess {
    border-radius: 2px;
    color: #fff;
    background-color: ${({ theme }) => theme.bgColors.ocean};
    font-weight: 600;
    padding: 6px 12px;
    width: fit-content;
  }

  .danger {
    border-radius: 2px;
    color: #fff;
    background-color: ${({ theme }) => theme.bgColors.cocktail};
    font-weight: 600;
    padding: 6px 12px;
    width: fit-content;
  }
`;

export const Exercices = styled.section`
  display: flex;
  flex-direction: row;
  gap: 6px;
  height: 44px;

  button.new {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    background-color: ${({ theme }) => theme.bgColors.ocean};
    color: #fff;
    font-size: 26px;
  }

  button.item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    background-color: ${({ theme }) => theme.bgColors.ocean};
  }
`;
