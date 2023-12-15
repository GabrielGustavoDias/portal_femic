import styled from "styled-components";

export const UpdateProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5%;
  
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: ${({theme}) => theme.textColors.ocean};
    margin-bottom: 20px;
  }
  
  button.update {
    width: 100%;
    height: 44px;
    color: #FFF;
    font-weight: 600;
    transition: 0.2s;
    background-color: ${({theme}) =>  theme.bgColors.ocean};
    &:hover {
      opacity: 0.8;
      border-radius: 2px;
    }
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 20px 5%;
  box-shadow: 2px 4px 8px #22222220;
  .content-profile {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
  }
  .content-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .image {
      border-radius: 50%;
      height: 200px;
      width: 200px;
      object-fit: cover;
      border: 2px solid #777;
    }
    button {
      padding: 8px;
      background-color: #ededed;
      display: flex; 
      align-items: center;
      cursor: pointer;
      margin-top: 16px;
      width: fit-content;
      border-radius: 2px;
    }
  }

  .infos {
    display: flex;
    margin-top: 50px;
    .name {
      margin-right: 40px;
    }
  }
`;

export const LabelFile = styled.label`
  display: flex;
  padding: 12px 8px;
  color: #FFF;
  cursor: pointer;
  font-weight: 600;
  width: fit-content;
  align-items: center;
  border-radius: 4px;
  background-color: ${({theme}) =>  theme.bgColors.ocean};
`;

export const DataList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 5%;
  h1 {
    font-size: 1.8em;
    margin: 10px 0 20px 0;
  }
  .title {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .value  {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 10px;
  }
`;
