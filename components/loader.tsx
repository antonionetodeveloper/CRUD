import React from "react"
import ReactLoading from "react-loading"
import styled from "styled-components"

export const Loader = () => (
	<Container>
		<ReactLoading
			type={"cubes"}
			color={"#9e96f2"}
			height={"100%"}
			width={"100%"}
		/>
	</Container>
)

const Container = styled.div`
	z-index: 2;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
