import axios from "axios"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"

import { useEffect, useState } from "react"

import styled from "styled-components"
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { URL_DEVELOPMENT } from "../_document"

export async function getServerSideProps(context: any) {
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

export default function AlteraSobreNome({ data, token }: any) {
	const router = useRouter()

	const lastName = data.lastName
	const [newlastName, setNewlastName] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		}
	}, [])

	function updateHandle() {
		setIsLoading(true)
		if (
			newlastName === "" ||
			newlastName.length < 2 ||
			newlastName == lastName
		) {
			alert("Não foi possível alterar seu sobrenome.")
		} else {
			updateInformation()
		}
	}

	async function updateInformation() {
		const reqInstance = axios.create({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		await reqInstance
			.put(URL_DEVELOPMENT + "api/updates/sobre_nome", {
				lastName: newlastName,
			})
			.then(() => {
				alert("Sobrenome alterado com sucesso.")
				setIsLoading(false)
				router.push("/home")
			})
	}

	const keyPressed = (event: any) => {
		if (event.key == "Enter") {
			event.preventDefault()
			updateHandle()
		}
	}

	return (
		<Container>
			<header>
				<h3>Alterar o sobrenome</h3>
			</header>
			<main onKeyDown={keyPressed}>
				<form>
					<div className="fields">
						<span className="span">
							O seu sobrenome atual é &quot;{lastName}&quot;
						</span>
						<Input
							className="Input "
							Text="Novo sobrenome"
							Type="text"
							comeBack={setNewlastName}
						/>
					</div>
					<Button
						Text="Confirmar"
						isLoading={isLoading}
						clicked={() => {
							updateHandle()
						}}
					/>
				</form>
			</main>
		</Container>
	)
}

const Container = styled.div`
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
			display: flex;
			gap: 5vw;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			div.fields {
				width: 70vw;
				display: flex;
				justify-content: center;
				gap: 5vw;
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
		}
	}
`
