import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 60px 0 60px;
  overflow-x: hidden;
  max-width: 100%;
  
  h1 {
    font-size: 1.6rem;
    margin-top: 8px;
  }
  .alert {
    color: #777;
    font-size: 0.9rem;
  }
  .confirm {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
  }
  .confirm input {
    margin-right: 12px;
  }
  .sub-label {
    font-size: 0.9rem;
    color: #777;
  }
 
  input, select {
    padding: 0 5px;
    height: 44px;
    border: 1px solid #22222230;
    border-radius: 4px;
    background-color: #FFF;
    margin-bottom: 20px;
  }
  textarea {
    padding: 0 5px;
    border: 1px solid #22222230;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .label-check {
    display: flex;
    flex-direction: row;
    align-items: center;
    input {
      margin-right: 6px;
    }
  }

  .add-insti {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    border: 1px dashed #777;
    gap: 10px;
    padding: 8px 12px;
    width: fit-content;
    margin-bottom: 20px;
  }
`;

export const ListUsers = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 60px;
  overflow-x: auto;
  padding: 0 0 60px 60px;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 162px;
  height: 200px;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  border-radius: 4px;
  box-shadow: ${({theme}) => theme.boxShadow.lg};
  img {
    width: 90px;
    height: 90px;
    border-radius: 45px;
  }
  h1 {
    white-space: nowrap;
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    cursor: pointer;
  }

  .remove {
    color: #FFF;
    background-color: tomato;
    font-weight: 600;
    padding: 6px 8px;
    border-radius: 4px;
    width: fit-content;
  }
`;

export const Seach = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 0 60px 60px;
  span {
    color: #777;
    font-size: 0.9rem;
  }
  .search-input {
    width: 300px;
    height: 44px;
    border: 1px solid #ddd;
    padding: 0 6px;
    color: #666;
    font-size: 0.9rem;
  }

  .search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.bgColors.ocean};
    height: 44px;
    width: 44px;
  }
`;


export const Table = styled.table`
  width: 100%;
  max-width: 1024px;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: center;
  } 
  thead tr th {
    text-align: center;
    border: 1px solid #888;
  }
  th, td {
    padding: 12px 16px;
    text-align: center;
  }
  td {
    border: 1px solid #888;
  }
  tbody tr {
      border-bottom: 1px solid #dddddd;
  }
    tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
  }
  tbody tr:last-of-type {
      border-bottom: 2px solid #009879;
  }

  tfoot tr {
    background-color: #009879;
    color: #ffffff;
    text-align: center;
    border: 1px solid #888;
  }
  tfoot td {
    border: none;
  }
`;
