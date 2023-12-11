import styled from 'styled-components';

export const ProjectContainerList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	justify-content: center;
	max-width: 100vw;
  width: 100vw;
  overflow-x: scroll;
	@media (max-width: 760px) {
		& {
			padding: 0 10px;
		}
		h1 {
			padding: 0 3%;
			margin-bottom: 20px;
		}
	}
	b {
		color: ${({ theme }) => theme.textColors.sand};
	}
	h1 {
		text-align: center;
		font-size: 56px;
		font-weight: 600;
		line-height: 120%;
	}
`;

export const ProjectItem = styled.div`
	display: grid;
	width: 75%;
	min-height: 75px;
	grid-template-columns: 50px 1fr 120px;
	align-items: center;
	padding: 12px 20px;
	border-radius: 4px;
	background-color: #1fb58f10;
	box-shadow: 1px 1px 4px 1px #33333320;
	transition-duration: 0.3s;
	.icon {
		align-items: center;
	}
	a {
		color: #fff;
		font-weight: 600;
		padding: 12px 16px;
		border-radius: 6px;
		background-color: #1fb58f;
		&:hover {
			background-color: #0da47e;
		}
	}
	&:hover {
		background-color: #1fb58f20;
	}
	@media (max-width: 740px) {
		& {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(1fr, 3);
		}
		a {
			text-align: center;
		}
		span {
			margin: 12px;
		}
		.icon {
			text-align: center;
			align-self: center;
			margin: 0 auto;
		}
	}
`;
