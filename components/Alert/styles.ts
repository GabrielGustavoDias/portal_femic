import styled from "styled-components";

export const ContainerAlert = styled.div`
  background-color: #555;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  z-index: 2001;
  position: absolute;
  margin: 0 auto;
  width: fit-content;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 0);
  button {
    color: #fff;
  }
`;

export const Text = styled.span`
  color: #FFF;
  font-weight: 600;
  width: fit-content;
  white-space: nowrap;
  margin: 0 12px;
`; 
