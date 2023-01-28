import styled from "styled-components"

export const Container = styled.div`
	header {
		height: 10vh;
		h3 {
			color: white;
			text-align: center;
			font-size: 2em;
			font-weight: 900;
			margin: 0px;
			padding: 2.5vw;
		}
		p {
			color: white;
			text-align: center;
			margin: 0px;
			font-weight: 600;
		}
	}
	main {
		width: 70vw;
		height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto;
		margin-top: 10vw;
		background-color: white;
		border-radius: 2vw;
		form {
			height: 20vh;
			display: flex;
			gap: 3vw;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			top: 2vw;
			div.fields {
				width: 70vw;
				display: flex;
				justify-content: center;
				gap: 8vw;
				align-items: center;
				.span,
				.Input {
					width: 15vw;
				}

				span.span {
					font-weight: 700;
					font-size: 1.1em;
					text-align: center;
				}
			}
			div.errorDiv {
				height: 25vh;
				margin: 0px;
				position: absolute;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				z-index: 1;
				span {
					display: flex;
					text-align: end;
					justify-content: flex-end;
					color: red;
				}
			}
		}

		p.misstake {
			font-weight: 500;
			position: relative;
			top: 3vw;
		}
	}
`
