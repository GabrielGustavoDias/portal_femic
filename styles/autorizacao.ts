import styled from "styled-components";

export const ContainerAutorization = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #f1f1f1;
	height: 100vh;
	width: 100vw;
	.btns {
		button {
			padding: 7px 12px;
			color: #fff;
			font-weight: 700;
			margin: 0 12px;
			background-color: red;
		}
	}

	.exit {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 15;
	}
`;

export const ContainerAutorizationSend = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #f1f1f1;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	h1 {
		font-size: 1.4rem;
		text-align: center;
	}
	form {
		display: flex;
		flex-direction: column;
	}
	.content-terms-send {
		display: flex;
		width: 80%;
		align-items: center;
		justify-content: center;
		margin: 12px 0;
		label {
			text-align: center;
		}
	}
		button {
			background-color: ${({theme}) => theme.bgColors.ocean};
			color: #fff;
			margin: 0 12px;
			padding: 8px 12px;
			border-radius: 4px;
		}
  .backup {
    display: flex;
    
    .document_in {
      color: ${({theme}) => theme.textColors.ocean};
    }

    .label {
      margin: 0 12px;
      color: #666;
    }
  }
	.exit {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 15;
	}
`;
 
export const Division = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: 1.6rem;
		font-weight: 600;
		text-align: center;
	}
	h3 {
		font-size: 1.1rem;
		text-align: center;
	}
	#autorizazao-form {
		width: 100%;
		background-color: #fff;
		max-width: 720px;
		padding: 20px;
	}
	.bar {
		background-color: red;
		width: 350px;
	}
	.term-text {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 1vw;
		p {
			margin-bottom: 20px;
		}
	}

	.documento {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 320px;
		padding: 4px;
		background-color: ${({theme}) => theme.bgColors.ocean};
		border-radius: 4px;
		color: #fff;
		text-align: center;
		margin-top: 10px;
	}

	@media (max-width: 740px) {
		margin-top: 80px;
	}
`;


export const ContainerAutorizationAdult = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40px 20px;
	background-color: #FEFEFE;
	width: 100%;
	margin: 0 auto;
	max-width: 1020px;

	h1 {
		font-size: 1.6rem;
		text-align: center;
	}
	.term-text {
		display: flex;
		flex-direction: column;
		gap: 20px;
		background: #fff;
	}
	form {
		display: flex;
		width: fit-content;
		align-items: flex-start;
		flex-direction: column;
		margin-top: 30px;
	}
	button {
		background-color: ${({theme}) => theme.bgColors.ocean};
		padding: 6px 12px;
		color: #FFF;
		margin-top: 20px;
	}
	@media (max-width) {
		button {
			margin: 0 auto;
			width: 100%;
		}
	}
`;