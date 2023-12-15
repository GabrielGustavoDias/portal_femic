import styled from "styled-components";


export const AdmContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	h1 {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 10px;
	}
	
	input, select, textarea {
		background-color: #FFF;
		height: 44px;
		width: fit-content;
    min-width: 200px;
		border: 1px solid #ededed;
		padding: 0 6px;
	}

	button {
		background-color: ${({theme}) => theme.bgColors.ocean};
		width: fit-content;
		padding: 8px 12px;
		color: #FFF;
		margin: 12px 0 20px 0;
	}

  button.func {
    width: fit-content;
    padding: 4px 6px;
    color: #FFF;
    background-color: #333;
  }
`;
