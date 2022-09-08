import styled from "styled-components"

export const Main = styled.main`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.container {
		box-shadow: rgb(0 0 0 / 20%) 5px 10px 15px,
			rgb(255 255 255 / 60%) -5px -10px 16px;
	}

	div {
		background-color: white;
		border-radius: 2vw;

		form {
			width: 40vw;
			height: 50vh;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 5vh;

			p,
			h1 {
				margin: 0px;
			}

			p {
				color: red;
				position: relative;
			}
		}

		a {
			color: #5a4df0;
			display: flex;
			justify-content: center;
			position: relative;
			bottom: 1.5vh;
		}
	}
`
