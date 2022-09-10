import styled from "styled-components"
// import { color } from "./Components/Colors.js"

export const Header = styled.header`
	background-color: #fff;
	padding: 3vw;
	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10vw;
		a {
			text-decoration: none;
			color: #9e96f2;
			font-weight: 700;
			font-size: 2vw;
			padding: 3vw;

			:hover {
				background-color: rgba(0, 0, 0, 0.05);
			}
			transition: 0.25s;
		}
	}
`

export const Main = styled.main`
	margin-top: 10vw;
	.group1 {
		margin: auto;
		width: 92vw;
		height: 25vw;
	}
	.group2 {
		margin: 0px;
		margin-top: 5vw;
		display: flex;
		justify-content: center;
		gap: 1.5vw;

		section {
			width: 45vw;
			height: 40vw;
		}
	}
	.group3 {
		margin: 0px;
		margin-top: 5vw;
		margin-bottom: 10vw;
		display: flex;
		justify-content: center;
		gap: 1.5vw;

		section {
			width: 45vw;
			height: 40vw;
		}
	}
`

export const Footer = styled.footer``
