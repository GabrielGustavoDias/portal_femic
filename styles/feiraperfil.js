import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

export const Header = styled.div`
  display: flex;
  @media (max-width: 740px) {
    justify-content: space-between;
    
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 10px 0;
  }
  button.update {
    width: 100%;
    height: 44px;
    color: #FFF;
    font-weight: 600;
    background-color: ${({theme}) =>  theme.bgColors.ocean};
  }
`;

export const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
  gap: 10px;
`;

export const Project = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr minmax(200px, 0.3fr) 160px;
  align-items: center;
  background-color: #FFF;
  padding: 6px 12px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  label {
    font-size: 1.1rem;
  }
  .sub-label {
      color: #777;
      font-size: 1rem;
  }
`;
