import styled from 'styled-components';

export const ListProjects = styled.div`
	display: flex;
	flex-direction: column;
	overflow-x: auto;
	gap: 20px;
`;

export const Project = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
	height: 200px;
	margin-left: 20px;
	
	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		background-color: #f5f5f5;
		img {
			width: 100%;
			max-height: 166px;
			height: 100%;
			background-size: contain;
		}
	}
	button {
		transition: 0.2s;
		&:hover {
			opacity: 0.8;
			border-radius: 2px;
		}
	}
	@media (max-width: 740px) {
		align-self: center;
	}

	.button {
		display: flex;
		height: 44px;
		background-color: ${({ theme }) => theme.bgColors.ocean};
		color: #fff;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}
`;

export const ProjectsCreated = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ProjectAffiliate = styled.div`
	display: flex;
	width: 100%;
`;

export const ProjectInfo = styled.div`
	display: flex;
	width: 100%;
	background-color: #fff;
	padding: 20px 0;
	margin-bottom: 10px;
	.infos-project {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 20px;
		label {
			font-size: 1.1rem;
			font-weight: 600;
			color: #222;
		}
		span {
			color: #444;
			margin-bottom: 20px;
		}
		button, a, .err {
			width: fit-content;
			align-self: flex-end;
			margin-right: 20px;
			padding: 6px 8px;
			color: #fff;
			background-color: ${({ theme }) => theme.bgColors.ocean};
			transition: 0.2s;
			&:hover {
				opacity: 0.8;
				border-radius: 2px;
			}
    }
      .err {
        background-color: red;
      }
	}

	@media (max-width: 740px) {
		& {
			flex-direction: column;
			align-items: center;
			gap: 20px;
			.infos-project {
				padding: 0 20px;
				button {
					width: 100%;
					margin: 0;
				}
			}
		}
	}
`;

export const ProjectInfoAdmin = styled.div`
	display: flex;
	width: 90%;
	margin: 0 auto;
	background-color: #fff;
	.infos-project {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 20px;
		padding-top: 20px;
		label {
			font-size: 1.1rem;
			font-weight: 600;
			color: #222;
		}
		span {
			color: #444;
			margin-bottom: 20px;
		}
		button {
			width: fit-content;
			align-self: flex-end;
			margin-right: 20px;
			padding: 6px 8px;
			color: #fff;
			background-color: ${({ theme }) => theme.bgColors.ocean};
		}
	}

	.auth {
		display: flex;
		align-self: flex-end;
		width: 150px;
		flex-direction: column;
		margin: 16px;
		gap: 5px;
		select {
			height: 34px;
			background-color: white;
			border: 1px solid #77777740;
		}
		button {
			width: 100%;
			align-self: flex-end;
			padding: 6px 8px;
			color: #fff;
			background-color: ${({ theme }) => theme.bgColors.ocean};
		}
	}
`;

export const ProjectDetails = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px;
	h1 {
		font-size: 1.4rem;
	}
	h2 {
		font-size: 1.3rem;
		color: #555;
	}
	.details {
		button {
			display: flex;
			width: 100%;
			justify-content: space-between;
			padding: 10px 20px;
			border-bottom: 1px solid #a1a1a1;
		}
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.details-it {
		display: flex;
		flex-direction: column;
		padding: 20px;
		width: 100%;
	}

	.sub-label {
		font-size: 0.9rem;
		color: #777;
		margin-bottom: 16px;
	}

	.tabs {
		width: 100%;
	}

	.tab {
		padding: 6px 11px;
		background-color: #1b7824;
		color: #fff;
		cursor: pointer;
	}

	.tab-alt {
		padding: 6px 11px;
		background-color: #EAB126;
		color: #fff;
		cursor: pointer;
	}

	.abled-tab {
		padding: 7px 12px;
		background-color: #333;
		color: #fff;
		cursor: pointer;
		border-radius: 4px 4px 0 0;
	}

	.disabled-tab {
		padding: 6px 11px;
		background-color: #1fb58f30;
		color: #fff;
		cursor: pointer;
	}

	.tab-label {
		display: flex;
		align-items: flex-end;
		padding: 0 8px;
	}
`;

export const BaremaContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px;
	background-color: #fff;
	margin: 0 3.5vw;
	h1 {
		font-size: 1.4rem;
	}
	h2 {
		font-size: 1.3rem;
		color: #555;
	}
`;
