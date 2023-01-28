import axios from "axios"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import Link from "next/link"

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

	await axios.post(
		URL_DEVELOPMENT + "api/updates/sendSecurityCode",
		{},
		{
			headers: {
				Authorization: `Bearer ${cookies.token}`,
			},
		},
	)

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
	const [securityCode, setSecurityCode] = useState() as any

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		}
	}, [])

	async function updateInformation() {
		const reqInstance = axios.create({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		await reqInstance
			.put(URL_DEVELOPMENT + "api/updates/confirm_email", {
				inputedHashByUser: securityCode,
			})
			.then(() => {
				alert("Email confirmado com suesso.")
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
			setIsLoading(true)
		}
	}

	return (
		<Container>
			<header>
				<h3>Confirme seu email</h3>
				<p>Um código de verificação foi enviado para seu email.</p>
			</header>
			<main onKeyDown={keyPressed}>
				<form>
					<div className="fields">
						<span className="span">
							O seu email atual é &quot;{data.email}&quot;
						</span>
						<Input
							className="Input "
							Text="Código de verificação"
							Type="text"
							comeBack={setSecurityCode}
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
				<p className="misstake">
					Digitou seu email errado?{" "}
					<Link href="/configuracoes/alterar-email">
						<a href="/configuracoes/alterar-email">Altere aqui</a>
					</Link>
					.
				</p>
			</main>
		</Container>
	)
}
