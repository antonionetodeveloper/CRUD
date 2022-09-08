import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Main } from "../styles/entrar"
import { Input } from "../components/input"
import { Button } from "../components/button"

export default function Home() {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const [isReadyToLogIn, setIsReady] = useState(false)
	const [textError, setTextError] = useState("")

	function logIn() {
		checkFields()
		// parei aqui.
		// obs: /api/cadastro e /api/login estão ok com o db.
	}
	useEffect(() => {
		if (isReadyToLogIn) {
			alert("Tudo certo!")
		}
	})

	function checkFields() {
		if (login != "" && password != "") {
			setIsReady(true)
		} else {
			if (password == "") {
				setTextError('O campo "password" está vazio')
			}
			if (login == "") {
				setTextError('O campo "login" está vazio')
			}
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
