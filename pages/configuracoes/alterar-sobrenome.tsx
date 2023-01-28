import axios from "axios"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { Container } from "./style"

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
