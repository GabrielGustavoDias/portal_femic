import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 740px) {
		margin-top: 144px;
	}
`;

export const Main = styled.main`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100vh;
	padding: 0 10%;

	h1 {
		font-family: 'Inter';
		font-size: 9rem;
		line-height: 8rem;
		letter-spacing: -2px;
		font-weight: 800;
		cursor: default;
		color: ${({ theme }) => theme.textColors.ocean};
    box-shadow: inset 0 0 0 0 ${({ theme }) => theme.textColors.ocean};
		transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
		&:hover {
			box-shadow: inset 560px 0 0 0 ${({ theme }) => theme.textColors.ocean};
			color: white;
		}
	}
  h1.alt {
		color: ${({ theme }) => theme.textColors.sand};
		box-shadow: inset 0 0 0 0 ${({ theme }) => theme.textColors.sand};
		transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
		&:hover {
			box-shadow: inset 600px 0 0 0 ${({ theme }) => theme.textColors.sand};
			color: white;
		}
	}
  h3 {
		font-size: 1.5rem;
		cursor: default;
	}

	@media (max-width: 740px) {
		flex-direction: column;

		h1 {
			line-height: 100%;
			letter-spacing: -5px;
			font-size: 24vw;
		}
	}
`;

export const Landing = styled(Image)`
	position: absolute;
	top: 10px;
	width: 300px;
`;
