import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { Main } from "../styles/entrar"
import { Input } from "../components/input"
import { Button } from "../components/button"
import axios from "axios"

export default function Entrar() {
	// fazer o enter dar submit
	// ajeitar as bolinhas do laoding

	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const [textError, setTextError] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	async function logIn() {
		if (checkFields()) {
			console.log("entrou aqui")

			setIsLoading(true)
			const url = "https://crud-antonio-neto.vercel.app/"
			await axios
				.post(url + "api/login", {
					login: login,
					password: password,
				})
				.then(function (response) {
					console.log(response)
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
