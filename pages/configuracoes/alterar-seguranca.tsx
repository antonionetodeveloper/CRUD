import axios from "axios"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { Button } from "../../components/button"
import { Input } from "../../components/input"

import { URL_DEVELOPMENT } from "../_document"
import styled from "styled-components"

export async function getServerSideProps(context) {
	const cookies = parseCookies(context)

	const data = await fetch(URL_DEVELOPMENT + "api/usuario", {
		headers: {
			Authorization: `Bearer ${cookies.token}`,
		},
	})

	const response = await data.json()

	if (typeof cookies.token == "undefined") {
		return {
			props: { data: response, token: null },
		}
	}

	return {
		props: { data: response, token: cookies.token },
	}
}

export default function Page({ data, token }: any) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [textError, setTextError] = useState("")
	const [security, setSecurity] = useState("")
	const [question, setQuestion] = useState("")
	const [answear, setAnswear] = useState("")

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		}
	}, [])

	async function updateInformation() {
		setIsLoading(true)

		const reqInstance = axios.create({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		await reqInstance
			.put(URL_DEVELOPMENT + "api/updates/security/security", {
				securityCode: security,
				securityNewQuestion: question,
				securityNewAnswear: answear,
			})
			.then(() => {
				alert("Segurança atualizada com sucesso.")
				router.push("/home")
			})
			.catch(function (error) {
				setTextError(error.response.data.error)
				setIsLoading(false)
			})
	}

	const keyPressed = (event: any) => {
		if (event.key == "Enter") {
			event.preventDefault()
			updateInformation()
		}
	}

	return (
		<Container>
			<header>
				<h3>Atualizar segurança</h3>
				<p>Um código de segurança foi enviado para seu email.</p>
			</header>
			<main onKeyDown={keyPressed}>
				<form>
					<div className="fields">
						<Input
							className="Input "
							Text="Código no email"
							Type="text"
							comeBack={setSecurity}
						/>
						<Input
							className="Input "
							Text="Nova pergunta"
							Type="text"
							comeBack={setQuestion}
						/>
						<Input
							className="Input "
							Text="Nova resposta"
							Type="text"
							comeBack={setAnswear}
						/>
					</div>
					{textError != "" ? (
						<Button
							Text="Confirmar"
							isLoading={isLoading}
							clicked={() => {
								updateInformation()
							}}
							Wrong
						/>
					) : (
						<Button
							Text="Confirmar"
							isLoading={isLoading}
							clicked={() => {
								updateInformation()
							}}
						/>
					)}
					{textError != "" ? (
						<div className="errorDiv">
							<span>{textError}</span>
						</div>
					) : (
						<></>
					)}
				</form>
			</main>
		</Container>
	)
}

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
