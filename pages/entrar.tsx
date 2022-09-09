import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Main } from "../styles/entrar"
import { Input } from "../components/input"
import { Button } from "../components/button"
const axios = require("axios")

export default function Home() {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const [textError, setTextError] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	async function logIn() {
		if (checkFields()) {
			setIsLoading(true)
			const url = "http://localhost:3000"
			await axios
				.post(url + "/api/login", {
					login: login,
					password: password,
				})
				.then(function (response) {
					console.log(response)
					window.location.href = url + "/home"
				})
				.catch(function (error) {
					setTextError(error.response.data.error)
				})

			setIsLoading(false)
		}
	}

	function checkFields() {
		if (login != "" && password != "") {
			return true
		} else {
			if (password == "") {
				setTextError('O campo "password" está vazio')
			}
			if (login == "") {
				setTextError('O campo "login" está vazio')
			}
			return false
		}
	}

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>

			<Main>
				<div className="container">
					<form method="POST" onSubmit={() => {}}>
						<h1>Entrar</h1>
						<p>{textError}</p>
						<Input Text="Login" Type="text" comeBack={setLogin} />
						<Input Text="Senha" Type="password" comeBack={setPassword} />
						<Button
							Text="Continuar"
							isLoading={isLoading}
							clicked={() => {
								logIn()
							}}
						/>
					</form>
					<Link href={"/cadastrar"}>
						<a href="/cadastrar">Criar uma conta</a>
					</Link>
				</div>
			</Main>
		</>
	)
}
