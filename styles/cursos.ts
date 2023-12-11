import styled from 'styled-components';

export const ContainerCourse = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border-radius: 4px;
  background-color: #fff;
  gap: 12px;
  .sucess {
    border-radius: 2px;
    color: #fff;
    background-color: ${({ theme }) => theme.bgColors.ocean};
    font-weight: 600;
    padding: 6px 12px;
    width: fit-content;
  }

  .danger {
    border-radius: 2px;
    color: #fff;
    background-color: ${({ theme }) => theme.bgColors.cocktail};
    font-weight: 600;
    padding: 6px 12px;
    width: fit-content;
  }

  .container-image {
    display: flex;
    flex-direction: column;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      width: 100%;
      text-align: center;
      line-height: 100%;
      color: #fff;
      background: ${({ theme }) => theme.bgColors.sand};
    }
  }

  .container-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    .strong {
      font-size: 22px;
      font-weight: 600;
    }
  }
`;
