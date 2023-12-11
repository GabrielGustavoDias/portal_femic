import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: grid;
  flex: 1;
  width: 100%;
  grid-template-columns: 1fr 1fr 2fr;
  background-color: #263238;
  padding: 20px;
  align-items: center;

  @media (max-width: 760px) {
    & {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      min-width: 100vw;
    }

    .links {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
    }

    .links a {
    }
  }

  h1 {
    font-size: 1.8rem;
    line-height: 1.8rem;
    font-weight: bold;
    color: #fff;
  }

  .icons {
  }

  a.icon {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #10101060;
    margin: 0 5px;
  }
  .links a {
    color: #fff;
  }
`;
