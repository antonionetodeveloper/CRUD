/* eslint-disable @typescript-eslint/no-empty-function */
import Head from "next/head"
import Link from "next/link"
import axios from "axios"

import { useState, useEffect } from "react"

import { Main } from "../styles/cadastrar"
import { Input } from "../components/input"
import { Button } from "../components/button"

export default function Cadastrar() {
	const [name, setName] = useState("")
	const [lastName, setLastName] = useState("")

	const [email, setEmail] = useState("")
	const [isEmailValid, setIsEmailValid] = useState(false)

	const [login, setLogin] = useState("")

	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [passwordMatch, setPasswordMatch] = useState(false)

	const [textError, setTextError] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (password == passwordConfirm) {
			setPasswordMatch(true)
		} else {
			setPasswordMatch(false)
		}
	})

	async function createAccount() {
		if (checkFields()) {
			setIsLoading(true)
			const url = "https://crud-antonio-neto.vercel.app"
			await axios
				.post(url + "api/cadastro", {
					name: name,
					lastName: lastName,
					email: email,
					security: "nothing",
					login2: login,
					password: password,
				})
				.then(function (response) {
					console.log(response)
					window.location.href = url + "/entrar"
				})
				.catch(function (error) {
					console.log(error)
					setTextError(error.response.data.error)
				})

			setIsLoading(false)
		}
	}

	function checkFields() {
		if (!passwordMatch) {
			setTextError("As senhas não coincidem")
			return false
		}
		if (name == "") {
			setTextError('O campo "nome" está vazio.')
			return false
		}
		if (lastName == "") {
			setTextError('O campo "sobrenome" está vazio.')
			return false
		}
		if (email == "") {
			setTextError('O campo "email" está vazio.')
			return false
		}
		if (!isEmailValid) {
			setTextError("O e-mail não é valido.")
			return false
		}
		if (password.length <= 7) {
			setTextError("A senha deve ter mais de 7 caracteres")
			return false
		}
		if (passwordConfirm == "") {
			setTextError('O campo "confirme sua senha" está vazio.')
			return false
		}
		if (login == "") {
			setTextError('O campo "login" está vazio.')
			return false
		}
		if (password == "") {
			setTextError('O campo "senha" está vazio.')
			return false
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
			return true
		}
	}

	const keyPressed = (event) => {
		if (event.key == "Enter") {
			event.preventDefault()
			createAccount()
		}
	}

	return (
		<>
			<Head>
				<title>Cadastro</title>
			</Head>

			<Main onKeyDown={keyPressed}>
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
							isLoading={isLoading}
							clicked={() => {
								createAccount()
							}}
						/>
					</form>
					<div className="navigation">
						<Link href={"/"}>
							<a href="/">Voltar para o início</a>
						</Link>
						<Link href={"/entrar"}>
							<a>Já tenho uma conta</a>
						</Link>
					</div>
				</div>
			</Main>
		</>
	)
}
