import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	// https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap
  body {

		padding: 0;
		margin: 0;
		min-height: 100vh;
		background-image: url("/bg.svg");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		font-family: "Montserrat";
		color: #9e96f2;
  }
`

export default GlobalStyle
