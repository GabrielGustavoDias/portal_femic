import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100vw;
  height: 100%;
  max-width: 100vw;
  background-color: #f2f2f2;
  overflow-y: hidden;
`;

export const ContentHome = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
  margin-left: 16vw;
  overflow-y: auto !important;
  #spaceheader {
    padding-top: 77px;
  }
  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

export const ChildrenStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  padding: 20px 0;
  .button-project {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    font-size: 1.1rem;
    background-color: ${({ theme }) => theme.bgColors.ocean};
    height: 44px;
    width: 100px;
    margin-left: 20px;
    transition: 0.2s;
    &:hover {
      opacity: 0.8;
      border-radius: 2px;
    }
  }

  .form-alt {
    display: flex;
    flex-direction: column;
    padding: 0 2vw;

    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    label {
      font-size: 1.1rem;
    }
    input {
      height: 36px;
      margin-bottom: 20px;
      padding: 0 5px;
      max-width: 160px;
    }
  }

  .alert-text {
    font-size: 0.9rem;
    color: #777;
  }
  .container-profile {
    @media (max-width: 740px) {
      justify-content: space-between;
      padding: 0 10vw;
    }
  }
`;

export const TabsStyle = styled.div`
  min-height: 80vh;
  .tabs {
    width: 100%;
  }

  .tab {
    padding: 6px 11px;
    background-color: #1fb58f;
    color: #fff;
    cursor: pointer;
  }

  .tab-alt {
    margin: 0 3px;
    padding: 6px 11px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
  }

  .tab-icons {
    margin: 10px 3px;
    background-color: #fff;
    padding: 6px 11px;
    cursor: pointer;
    border-bottom: 5px solid #333;
  }

  .abled-tab {
    padding: 7px 12px;
    background-color: #1fb58f;
    color: #fff;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
    border: none;
    outline: none;
  }

  .abled-icon {
    padding: 7px 12px;
    color: #fff;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
    border-bottom: 5px solid #1fb58f;
    outline: none;
  }

  .disabled-tab {
    padding: 6px 11px;
    background-color: #1fb58f30;
    color: #fff;
    cursor: pointer;
  }

  .tab-label {
    display: flex;
    align-items: flex-end;
    padding: 0 8px;
  }
`;

export const Division = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: auto;
`;

// interface IAside {
//   color1: string;
//   color2: string;
// }

export const Aside = styled.aside`
  display: flex;
  flex: 1;
  background: linear-gradient(
    to bottom,
    ${(props) => props.color1},
    ${(props) => props.color2}
  );
  @media (max-width: 760px) {
    & {
      display: none;
    }
  }
`;

export const FormDiv = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  form {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 36px;
    flex-direction: column;
    height: 100%;
  }
`;
export const Input = styled.input`
  width: 100%;
  height: 44px;
  border-bottom: 2px solid #333;
  background-color: #f2f2f2;
  color: #444;
  font-size: 1rem;
  padding: 0 10px;
  transition: 0.3s;
  margin: 5px 0 28px 0;

  :focus {
    border-bottom: 2px solid ${({ theme }) => theme.bgColors.ocean};
    outline: #333 solid 1px;
    border-radius: 4px;
  }
`;

export const Select = styled.select`
  width: 100%;
  min-height: 44px;
  border-bottom: 2px solid #333;
  background-color: #f2f2f2;
  color: #444;
  font-size: 1rem;
  padding: 0 10px;
  transition: 0.3s;
  margin: 5px 0 28px 0;
  align-items: center;
  :focus {
    border-bottom: 2px solid ${({ theme }) => theme.bgColors.ocean};
    outline: #333 solid 1px;
    border-radius: 4px;
  }
`;

export const SelectMultiple = styled.select.attrs({
  multiple: true,
})``;

export const SubmitButton = styled.button`
  width: 100%;
  height: 44px;
  background-color: ${({ theme }) => theme.bgColors.ocean};
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 2px;
`;
