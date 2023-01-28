import axios from "axios"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { Container } from "./style"

import { URL_DEVELOPMENT } from "../_document"
import { Button } from "../../components/button"
import { Input } from "../../components/input"

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
	const [newEmail, setNewEmail] = useState() as any

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		}
	}, [])

	function updateHandle() {
		setIsLoading(true)
		if (newEmail === "" || newEmail.length < 2 || newEmail == data.email) {
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
			.put(URL_DEVELOPMENT + "api/updates/email", {
				newEmail: newEmail,
			})
			.then(() => {
				alert("Email alterado com suceesso.")
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
			updateHandle()
		}
	}

	return (
		<Container>
			<header>
				<h3>Alterar o email</h3>
			</header>
			<main onKeyDown={keyPressed}>
				<form>
					<div className="fields">
						<span className="span">
							O seu email atual é &quot;{data.email}&quot;
						</span>
						<Input
							className="Input "
							Text="Novo email"
							Type="text"
							comeBack={setNewEmail}
						/>
					</div>
					{textError != "" ? (
						<Button
							Text="Confirmar"
							isLoading={isLoading}
							clicked={() => {
								updateHandle()
							}}
							Wrong
						/>
					) : (
						<Button
							Text="Confirmar"
							isLoading={isLoading}
							clicked={() => {
								updateHandle()
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
