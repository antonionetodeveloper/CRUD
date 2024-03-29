import axios from "axios"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { Container } from "../../styles/alterations-config"

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

export default function AlteraNome({ data, token }: any) {
	const router = useRouter()

	const name = data.name
	const [newName, setNewName] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		}
	}, [])

	function updateHandle() {
		setIsLoading(true)
		if (newName === "" || newName.length < 2 || newName == name) {
			alert("Não foi possível alterar seu nome.")
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
			.put(URL_DEVELOPMENT + "api/updates/nome", { name: newName })
			.then(() => {
				alert("Nome alterado com sucesso.")
				setIsLoading(false)
				router.push("/home")
			})
	}

	const keyPressed = (event) => {
		if (event.key == "Enter") {
			event.preventDefault()
			updateHandle()
		}
	}

	return (
		<Container>
			<header>
				<h3>Alterar o nome</h3>
			</header>
			<main onKeyDown={keyPressed}>
				<form>
					<div className="fields">
						<span className="span">O seu nome atual é &quot;{name}&quot;</span>
						<Input
							className="Input "
							Text="Novo nome"
							Type="text"
							comeBack={setNewName}
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
