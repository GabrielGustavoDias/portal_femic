import styled from "styled-components";

export const ListProjects = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 20px 20px 0 20px;
`;

export const Project = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({theme}) => theme.boxShadow.md};
  .project-image-container {
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  .project-button {
    color: #fff;
    display: flex;
    width: 100%;
    height: 44px;
    font-weight: bold;
    font-size: 1rem;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.bgColors.ocean};
  }
`;