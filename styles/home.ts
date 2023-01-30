import styled from "styled-components"
// import { color } from "./Components/Colors.js"

export const Header = styled.header`
	display: flex;
	width: 100vw;
	height: 30vh;
	align-items: center;
	justify-content: center;
	.title {
		h1,
		p {
			color: white;
			text-align: center;
			font-weight: 900;
		}
	}

	button {
		position: absolute;
		display: flex;
		right: 2vw;
	}
`

export const Main = styled.main`
	height: 65vh;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5vw;
`

export const Footer = styled.footer``
