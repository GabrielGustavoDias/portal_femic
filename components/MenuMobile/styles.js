import styled from 'styled-components';

export const ContainerMobile = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(prop) => prop.color};
`;

export const Item = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 44px;
  label {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 10px;
  }
`;
