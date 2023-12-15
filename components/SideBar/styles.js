import styled from 'styled-components';

// interface IContainer {
// 	color: string;
// }
// interface IActiveProp {
// 	active?: boolean;
// }

export const Container = styled.div`
  background-color: ${(props) => props.color};
  min-height: 100vh;
  .item-side {
    :hover {
      background-color: #22222220;
    }
  }
`;

export const Label = styled.span`
  color: #fff;
  font-size: 1.1rem;
  padding-left: 8px;
`;

export const ContainerBase = styled.div`
  width: 16vw;
  height: 100%;
  position: fixed;
  z-index: 50;
  background: black;
  overflow-y: auto;
  background-color: ${(props) => props.color};
  @media (max-width: 760px) {
    display: none;
  }
`;

export const ContainerAdmin = styled.div`
  width: 16vw;
  height: 100%;
  position: fixed;
  background-color: #545454;
  z-index: 1116;
`;

export const NavGroup = styled.div`
  display: flex;
  height: 44px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 20px;
  color: #fff;
  cursor: pointer;
  background-color: ${(prop) => (prop.active ? '#54545420' : 'transparent')};
  :hover {
    background-color: #54545420;
  }
`;

export const NavItem = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  background-color: #616161;
  padding-left: 40px;
  cursor: pointer;

  span {
    color: #fff;
  }

  :ative {
    color: green;
  }
`;
