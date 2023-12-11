import chroma from 'chroma-js';
import { StylesConfig } from 'react-select';
import styled from 'styled-components';
import { ColourOption } from './colors.dto';

export const Container = styled.div`
	position: fixed;
	display: flex;
	width: 84vw;
	right: 0;
	height: 75px;
	background-color: #fff;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: 0 3%;
	box-shadow: 3px 2px 4px #33333320;
	z-index: 10;

	h1.title {
		font-size: 1.4rem;
		font-weight: 600;
	}
	@media (max-width: 760px) {
		width: 100vw;
		h1.title {
			font-size: 1rem;
			font-weight: 600;
		}
	}
	.mobile {
		display: none;
		@media (max-width: 760px) {
			display: block;
		}
	}
`;

export const ProfileContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	column-gap: 10px;
	.profile-image {
		border-radius: 24px;
		height: 50px;
		width: 50px;
		background-size: cover;
		object-fit: cover;
	}
`;

export const Profiles = styled.div`
	display: flex;
	align-items: center;
	.switch-profile {
		display: flex;
		flex-direction: column;
		label {
			max-width: 200px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	h1 {
		white-space: nowrap;
		width: 160px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const dot = (color = 'transparent') => ({
	alignItems: 'center',
	display: 'flex',

	':before': {
		backgroundColor: color,
		borderRadius: 10,
		content: '""',
		display: 'block',
		marginRight: 8,
		height: 10,
		width: 10,
	},
});

export const colourStyles: StylesConfig<ColourOption> = {
	control: (styles) => ({
		...styles,
		backgroundColor: 'white',
		width: '175px',
		alignItems: 'center',
	}),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = chroma(data.color);
		return {
			...styles,
			backgroundColor: isDisabled
				? undefined
				: isSelected
				? data.color
				: isFocused
				? color.alpha(0.1).css()
				: undefined,
			color: isDisabled
				? '#ccc'
				: isSelected
				? chroma.contrast(color, 'white') > 2
					? 'white'
					: 'black'
				: data.color,
			cursor: isDisabled ? 'not-allowed' : 'default',
			':active': {
				...styles[':active'],
				backgroundColor: !isDisabled
					? isSelected
						? data.color
						: color.alpha(0.3).css()
					: undefined,
			},
		};
	},
	input: (styles) => ({ ...styles, ...dot() }),
	placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
	singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

export const ContainerAdmin = styled.div`
	position: fixed;
	display: flex;
	right: 0;
	left: 16vw;
	height: 75px;
	max-height: 75px;
	background-color: #fff;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: 0 3%;
	box-shadow: 3px 2px 4px #33333320;

	img {
		border-radius: 25px;
	}

	h1 {
		font-size: 22px;
	}

	.content {
		max-height: 75px;
		.css-1okebmr-indicatorSeparator {
			display: none;
		}
		.css-ql66lp-control {
			max-height: 40px;
		}
	}
`;
