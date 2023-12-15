import styled from 'styled-components';

export const ContainerCertificate = styled.div`
	display: flex;
  height: 100%;
  width: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	margin-top: 75px;
	padding: 20px 0;
  h3 {
    font-size: 22px;
    margin: 16px 0;
  }
`;

export const SearchInput = styled.input`
	height: 44px;
	padding: 0 6px;
	border-radius: 4px;
	border: 1px solid #777;
	font-size: 18px;
	color: #333;
  @media (max-width: 720px) {
    &{
      width: 70%;
    }
  }
`;

export const SearchButton = styled.button`
	height: 44px;
	width: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #1FB58F;
	border-radius: 4px;
  transition: 0.3s;
  margin-left: 5px;
	&:hover {
    background-color: #1C936C;
	}
  
`;

export const ContainerProject = styled.div`
	display: flex;
  flex: 1;
	flex-direction: column;
	align-items: center;
  justify-content: center;
  margin-top: 20px;
	h1 {
		font-size: 36px;
		font-weight: bold;
	}
`;

export const CertButtonDownload = styled.button`
  display: flex;
  align-items: base-line;
  gap: 5px;
  color: #FFF;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #1FB58F;
  max-width: 240px;
`;
