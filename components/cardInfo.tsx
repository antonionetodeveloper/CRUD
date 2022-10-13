/* eslint-disable react/prop-types */
import Link from "next/link"
import styled from "styled-components"

export const CardInfo = (props) => {
	return (
		<Container>
			<h2>{props.title}</h2>
			<div className="Container">
				{props.name ? (
					<Changer
						field={"Nome:"}
						changer={props.name}
						redirectTo={"/alterar-nome"}
					/>
				) : (
					<></>
				)}
				{props.lastName ? (
					<Changer
						field={"Sobrenome:"}
						changer={props.lastName}
						redirectTo={"/alterar-sobrenome"}
					/>
				) : (
					<></>
				)}
				{props.email ? (
					<Changer
						field={"Email:"}
						changer={props.email}
						redirectTo={"/alterar-email"}
					/>
				) : (
					<></>
				)}
				{props.login ? (
					<Changer
						field={"Login:"}
						changer={props.login}
						redirectTo={"/alterar-login"}
					/>
				) : (
					<></>
				)}
				{props.pass ? (
					<Changer
						field={"Senha:"}
						changer={props.pass}
						redirectTo={"/alterar-senha"}
					/>
				) : (
					<></>
				)}
			</div>
		</Container>
	)
}
const Changer = (props) => {
	return (
		<div>
			<span className="title">{props.field}</span>
			<span className="changer">{props.changer}</span>
			<Link href={props.redirectTo}>
				<a href={props.redirectTo}>Mudar</a>
			</Link>
		</div>
	)
}

const Container = styled.section`
	width: 30vw;
	padding: 5vw;
	height: auto;

	display: flex;
	flex-direction: column;

	background-color: white;
	border-radius: 2vw;
	box-shadow: rgb(0 0 0 / 20%) 0px 0px 15px;

	h2 {
		font-size: 2vw;
		font-weight: 900;
		text-align: center;
		padding-bottom: 5vw;
	}

	.Container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3vw;

		div {
			width: 35vw;

			display: grid;
			grid-template-columns: auto auto auto;
			gap: 1vw;

			.title {
				font-weight: 700;
				width: 10vw;
			}

			.changer {
				font-weight: 500;
				height: auto;
				max-width: 15vw;
				word-wrap: break-word;
			}

			a {
				color: #9e96f2;
				font-weight: 700;
				display: flex;
				justify-content: end;
			}
		}
	}
`
