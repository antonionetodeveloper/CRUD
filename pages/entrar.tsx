/* eslint-disable @typescript-eslint/no-empty-function */
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { Main } from "../styles/entrar"
import { Input } from "../components/input"
import { Button } from "../components/button"
import axios from "axios"

export default function Entrar() {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const [textError, setTextError] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	async function logIn() {
		if (checkFields()) {
			setIsLoading(true)
			const url = "https://crud-antonio-neto.vercel.app/"
			//const url = "http://localhost:3000/"
			await axios
				.post(url + "api/login", {
					login: login,
					password: password,
				})
				.then(function (response) {
					const token = response.data.token
					localStorage.setItem("token", token)
					window.location.href = url + "home"
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

	const keyPressed = (event) => {
		if (event.key == "Enter") {
			event.preventDefault()
			logIn()
		}
	}

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>

			<Main onKeyDown={keyPressed}>
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
					<div className="navigation">
						<Link href={"/"}>
							<a href="/">Voltar para o início</a>
						</Link>
						<Link href={"/cadastrar"}>
							<a href="/cadastrar">Criar uma conta</a>
						</Link>
					</div>
				</div>
			</Main>
		</>
	)
}
