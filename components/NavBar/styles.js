import styled from "styled-components";

export const Container = styled.nav`
  position: fixed;
  z-index: 5;
  display: flex;
  height: 75px;
  width: 100vw;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: #FFFFFFe0;
  top: 0;
  padding: 0 5%;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 1px 2px 3px #33333330;
  .btn-mobile-menu {
    display: none;
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    li {
      margin-top: 10px;
      margin-right: 10px;
    }
    a {
      font-size: ${({theme}) => theme.fontSizes.lg};
      color: ${({theme}) => theme.textColors.primary};
      padding: 5px 7px;
      transition: 0.3s;
      border-radius: 4px;
      cursor: pointer;
    }
    a:hover {
      background-color: #ddd;
    }
    
  }

  .session {
    display: flex;
    flex-direction: row;
    align-items: center;

    .login {
      color: ${({theme}) => theme.textColors.white};
      background-color: ${({theme}) => theme.bgColors.ocean};
      margin-left: ${({theme}) => theme.spacing["2"]};
    }
  }
  @media (max-width: 740px) {
    .btn-mobile-menu {
      display: flex;
    }
    ul {
      display: none;
    }
    .session {
    }
  }
  .menu-mobile {
    display: flex;
    flex-direction: column;
    a {
      color: #444;
      font-size: 18px;
    }
  }
`;

export const SessionButton = styled.a`
  color: ${({theme}) => theme.textColors.ocean};
  padding: ${({theme})=> theme.spacing["2"]};
  background: ${({theme}) => theme.bgColors.white};
  border-radius: 4px;
  border: 2px solid ${({theme}) => theme.textColors.ocean};
  font-size: ${({theme}) => theme.fontSizes.base};
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: ${({theme}) =>  theme.bgColors.ocean};
    color: ${({theme}) => theme.textColors.white};
  }

  @media screen and (max-width: 740px) {
    &{
      font-size: 12px;
      padding: 6px 12px;
    }
  }
`;

export const ButtonAlt = styled(SessionButton)`
  background-color: ${({theme}) => theme.textColors.ocean};
  color: ${({theme}) => theme.bgColors.white};
  :hover {
    background-color: ${({theme}) =>  theme.bgColors.white};
    color: ${({theme}) => theme.textColors.ocean};
  }
`;
