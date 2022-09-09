import React from "react"
import ReactLoading from "react-loading"
import styled from "styled-components"

export const Loader = () => (
	<ReactLoading
		type={"cubes"}
		color={"#9e96f2"}
		height={"100%"}
		width={"100%"}
	/>
)

const Container = styled.div`
	width: 50vw;
	height: 50vh;
	z-index: 2;
	box-shadow: 10px 5px 5px black;

	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	div {
		z-index: 3;
		svg {
			width: 5vw;
		}
	}
`
