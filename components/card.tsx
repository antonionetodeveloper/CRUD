/* eslint-disable react/prop-types */
import Link from "next/link"
import styled from "styled-components"
import { Button } from "./button"

export const Card = (props) => {
	return (
		<Container>
			<h1>{props.title}</h1>
			<text>{props.text}</text>
			{props.hasButton ? (
				<Link href={props.redirectTo}>
					<a href={props.redirectTo}>
						<Button Text={"Continuar"} />
					</a>
				</Link>
			) : (
				<span></span>
			)}
		</Container>
	)
}

const Container = styled.section`
	background-color: white;
	border-radius: 2vw;

	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;

	box-shadow: rgb(0 0 0 / 20%) 0px 0px 15px;

	h1 {
		font-size: 2vw;
	}

	text {
		display: flex;
		margin: auto;
		margin: 3vw;
		font-size: 1.7vw;
		text-align: justify;
	}
	a {
		display: flex;
		position: relative;
		justify-content: flex-end;
		text-decoration: none;
	}
`
