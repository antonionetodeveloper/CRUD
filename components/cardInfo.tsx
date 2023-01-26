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
						redirectTo={"/configuracoes/alterar-nome"}
					/>
				) : (
					<></>
				)}
				{props.lastName ? (
					<Changer
						field={"Sobrenome:"}
						changer={props.lastName}
						redirectTo={"/configuracoes/alterar-sobrenome"}
					/>
				) : (
					<></>
				)}
				{props.email ? (
					<Changer
						field={"Email:"}
						changer={props.email}
						redirectTo={"/configuracoes/alterar-email"}
						isVerificated={props.emailVarificatedStatus}
					/>
				) : (
					<></>
				)}
				{props.security ? (
					<Changer
						field={"Segurança:"}
						changer={props.security}
						redirectTo={"/configuracoes/alterar-seguranca"}
					/>
				) : (
					<></>
				)}
				{props.login ? (
					<Changer
						field={"Login:"}
						changer={props.login}
						redirectTo={"/configuracoes/alterar-login"}
						allowedToChange={props.security}
					/>
				) : (
					<></>
				)}
				{props.pass ? (
					<Changer
						field={"Senha:"}
						changer={props.pass}
						redirectTo={"/configuracoes/alterar-senha"}
						allowedToChange={props.security}
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
			{props.allowedToChange == "Desativado" ? (
				<Link href="#">
					<a
						href="#"
						onClick={() => {
							alert(
								'Habilite a "Segurança" de sua conta antes de mudar essa informação',
							)
						}}
					>
						Mudar
					</a>
				</Link>
			) : props.isVerificated == "NotVerificated" ? (
				<Link href="/configuracoes/confirmar-email">
					<a href="/configuracoes/confirmar-email">
						<p>Confirmar</p>
					</a>
				</Link>
			) : (
				<Link href={props.redirectTo}>
					<a href={props.redirectTo}>
						<p>Mudar</p>
					</a>
				</Link>
			)}
		</div>
	)
}

const Container = styled.section`
	width: 30vw;
	padding: 4vw;
	height: auto;

	display: flex;
	flex-direction: column;

	background-color: white;
	border-radius: 2vw;
	box-shadow: rgb(0 0 0 / 20%) 0px 0px 15px;

	h2 {
		margin: 0px;
		font-size: 2vw;
		font-weight: 900;
		text-align: center;
		padding-bottom: 3vw;
	}

	.Container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1vw;

		div {
			width: 35vw;

			display: grid;
			justify-content: center;
			grid-template-columns: auto auto auto;
			gap: 1vw;

			.title {
				font-weight: 700;
				width: 10vw;
			}

			.changer {
				font-weight: 500;
				height: auto;
				width: 10vw;
				word-wrap: break-word;
			}

			a {
				color: #9e96f2;
				font-weight: 700;
				width: 10vw;
				display: flex;
				justify-content: end;
			}
		}
	}
`
