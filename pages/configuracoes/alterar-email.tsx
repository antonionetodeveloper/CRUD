import axios from "axios"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { Container } from "../../styles/alterations-config"

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
	const [security, setSecurity] = useState()

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		}
	}, [])

	function updateHandle() {
		setIsLoading(true)
		if (newEmail === "" || newEmail.length < 2 || newEmail == data.email) {
			alert("Não foi possível alterar seu email.")
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
			.put(URL_DEVELOPMENT + "api/updates/email/email", {
				newEmail: newEmail,
				security: security,
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
						<div>
							<span className="span">
								O seu email atual é &quot;{data.email}&quot;
							</span>
						</div>
						<div style={{ height: "15vh", zIndex: "2" }}>
							<Input
								className="Input "
								Text="Novo email"
								Type="text"
								comeBack={setNewEmail}
							/>
						</div>
						{data.questionSecurity != "No questions yet" ? (
							<div style={{ height: "15vh" }}>
								<Input
									className="Input "
									Text="Segurança"
									Type="text"
									comeBack={setSecurity}
								/>
								<p
									style={{
										margin: "10px",
										position: "absolute",
										bottom: "18vh",
									}}
								>
									{data.questionSecurity}
								</p>
							</div>
						) : (
							<></>
						)}
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
						<div className="errorDiv" style={{ height: "37vh" }}>
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
