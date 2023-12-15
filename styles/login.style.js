import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  justify-content: stretch;
  @media(max-width: 760px) {
      & {
        align-items: center;
        justify-content: center;
      }
    }
`;

export const LoginForm = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  @media(max-width: 760px) {
    & {
      padding: 0 10px;
    }
    h1 {
      padding: 0 3%;
      margin-bottom: 20px;
    }
  }
  b {
    color: ${({theme}) => theme.textColors.sand};
  }
  h1 {
    font-size: ${({theme}) => theme.fontSizes.xl5};
    font-weight: 600;
    line-height: 120%;
  }

  .tabs {
    width: 100%;
  }

  .tab {
    padding: 4px 8px;
    background-color: #1FB58F30;
    color: ${({theme}) => theme.textColors.primary};
    cursor: pointer;
  }

  .abled-tab {
    padding: 7px 12px;
    background-color:${({theme}) => theme.bgColors.ocean};
    color: #fff;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
  }
  
  .disabled-tab {
    padding: 4px 8px;
    background-color: #1FB58F30;
    color: #fff;
    cursor: pointer;
  }

  .tab-label {
    display: flex;
    align-items: flex-end;
    padding: 0 8px;
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: ${({theme}) => theme.bgColors.white};
    border-radius: 4px;
    box-shadow: ${({theme}) => theme.boxShadow.md};
    padding: 10px;
    @media(max-width: 760px) {
      & {
        box-shadow: none;
        padding: 20px;
      }
    }
    label {
      font-size: 0.9rem;
    }
    .show-pass {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s;
      padding: 4px 10px;
      height: 50px;
      background-color: #eee;
      border-radius: 0 4px 4px 0;
    }
  }
  @media(max-width: 740px) {
    margin-top: 100px;
  }
  #login-admin {
    width: 70%;
    input {
      background-color: #fff;
    }
    label {
      font-size: 1.1rem;
    }
  }
`;

export const Input = styled.input`
  color: #555;
  background: none;
  padding: 12px 7px;
  border: 1px solid #777;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 1rem;
  width: 100%;
  &:focus {
    outline: none;
    border: 1px solid ${({theme}) => theme.bgColors.ocean};
    border-radius: 0;
  }
  transition: 0.3s;
  &[type='password']:focus {
    border-radius: 4px 0 0 4px;
  }
`;

export const SubmitButton = styled.button`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  height: 46px;
  background: ${({theme}) => theme.bgColors.ocean};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 7px 0 10px 0;
  transition: 0.3s;
  @media(max-width: 760px) {
    & {
      
    }
  }
  &:hover {
    opacity: .8;
  }
`;

export const Banner = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: center;
  .image {
    background-color:  ${({theme}) => theme.bgColors.ocean};
    border-radius: 4px 4px 0 0;
    img#banner {
      width: 420px;
      height: 600px;
    }
  }
  @media(max-width: 760px) {
    & {
     display: none;
    }
  }
`;