import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  height: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  button#search {
     display: flex;
     width: 45px;
     height: 45px;
     align-items: center;
     justify-content: center;
     background-color: ${({theme}) => theme.bgColors.ocean};
     margin: 0 1rem;
  }

  .next {
    width: 230px;
    height: 44px;
    background-color: ${({theme}) => theme.bgColors.ocean};
    color: #fff;
    font-size: 1rem;
    margin-top: 1rem;
    margin-right: 1rem;
  }
`;
