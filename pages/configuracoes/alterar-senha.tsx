import axios from "axios"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { Container } from "../../styles/alterations-config"
import { Button } from "../../components/button"
import { Input } from "../../components/input"

import { URL_DEVELOPMENT } from "../_document"

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
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

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
			.put(URL_DEVELOPMENT + "api/updates/senha", {
				security: security,
				newPassword: password,
				confirmPassword: confirmPassword,
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
				<h3>Atualizar senha</h3>
			</header>
			<main onKeyDown={keyPressed}>
				<form>
					<div className="fields">
						<Input
							className="Input "
							Text="Senha"
							Type="text"
							comeBack={setPassword}
						/>
						<Input
							className="Input "
							Text="Confirmar senha"
							Type="text"
							comeBack={setConfirmPassword}
						/>
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
