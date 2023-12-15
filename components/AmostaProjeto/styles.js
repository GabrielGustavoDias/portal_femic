import styled from "styled-components";

export const ContainerProject = styled.div`
  display: flex;
  margin-top: 75px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 5vw;
  h1.title {
    margin-top: 20px;
    font-size: 32px;
    font-weight: 600;
  }
  .sub {
    color: #555;
    margin: 12px;
    max-width: 1020px;
  }
  p {
    margin: 12px;
    font-size: 18px;
    font-family: 'Noto Sans';
  }
  .poster {
    background-color: ${props => props.theme.bgColors.ocean};
    color: #fff;
    border-radius: 4px;
    padding: 6px 12px;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .details {
    display: flex;
    flex-direction: column;
    margin: 12px 0;
    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 5px 0;
      span {
        margin-left: 16px;
      }
    }
  }
  h3 {
    margin-top: 12px;
    font-size: 20px;
    font-weight: 500;
  }
`;