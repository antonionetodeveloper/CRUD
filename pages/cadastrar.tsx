import Head from "next/head"
import Link from "next/link"

import { useState, useEffect } from "react"

import { Main } from "../styles/cadastrar"
import { Input } from "../components/input"
import { Button } from "../components/button"

export default function Home() {
	const [name, setName] = useState("")
	const [lastName, setLastName] = useState("")

	const [email, setEmail] = useState("")
	const [isEmailValid, setIsEmailValid] = useState(false)

	const [login, setLogin] = useState("")

	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [passwordMatch, setPasswordMatch] = useState(false)

	const [isReadyCreateAccount, setIsReady] = useState(false)
	const [textError, setTextError] = useState("")

	useEffect(() => {
		if (password == passwordConfirm) {
			setPasswordMatch(true)
		} else {
			setPasswordMatch(false)
		}
	})

	function createAccount() {
		checkFields()
	}
	useEffect(() => {
		if (isReadyCreateAccount) {
			alert("Tudo certo!")
		}
	})

	function checkFields() {
		if (!passwordMatch) {
			setTextError("As senhas não coincidem")
			setIsReady(false)
		}
		if (!isEmailValid) {
			setTextError("O e-mail não é valido.")
			setIsReady(false)
		}
		if (password.length <= 7) {
			setTextError("A senha deve ter mais de 7 caracteres")
			setIsReady(false)
		}
		if (passwordConfirm == "") {
			setTextError('O campo "confirme sua senha" está vazio.')
			setIsReady(false)
		}
		if (password == "") {
			setTextError('O campo "senha" está vazio.')
			setIsReady(false)
		}
		if (login == "") {
			setTextError('O campo "login" está vazio.')
			setIsReady(false)
		}
		if (email == "") {
			setTextError('O campo "email" está vazio.')
			setIsReady(false)
		}
		if (lastName == "") {
			setTextError('O campo "sobrenome" está vazio.')
			setIsReady(false)
		}
		if (name == "") {
			setTextError('O campo "nome" está vazio.')
			setIsReady(false)
		}
		if (
			name != "" &&
			lastName != "" &&
			email != "" &&
			login != "" &&
			password != "" &&
			passwordConfirm != "" &&
			password.length > 7 &&
			isEmailValid &&
			passwordMatch
		) {
			setIsReady(true)
		}
	}

	return (
		<>
			<Head>
				<title>Cadastro</title>
			</Head>

			<Main>
				<div className="container">
					<form method="POST" onSubmit={() => {}}>
						<h1>Cadastrar</h1>
						<p>{textError}</p>
						<div>
							<div>
								<Input Text="Nome" Type="text" comeBack={setName} />
								<Input Text="Sobrenome" Type="text" comeBack={setLastName} />
								<Input
									Text="E-mail"
									Type="e-mail"
									comeBack={setEmail}
									isEmail
									emailValid={setIsEmailValid}
								/>
							</div>
							<div>
								<Input Text="Login" Type="text" comeBack={setLogin} />
								<Input Text="Senha" Type="password" comeBack={setPassword} />
								<Input
									Text="Confirme sua senha"
									Type="password"
									comeBack={setPasswordConfirm}
								/>
							</div>
						</div>
						<Button
							Text="Continuar"
							clicked={() => {
								createAccount()
							}}
						/>
					</form>
					<Link href={"/entrar"}>
						<a href="/entrar">Já tenho uma conta</a>
					</Link>
				</div>
			</Main>
		</>
	)
}
