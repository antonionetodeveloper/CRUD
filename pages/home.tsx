import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Header, Main } from "../styles/home"
import { Button } from "../components/button"
import { CardInfo } from "../components/cardInfo"

export default function Home() {
	const router = useRouter()

	const [name, setName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [security, setSecurity] = useState("Desativado")

	useEffect(() => {
		if (window) {
			getInformation()
		}
	}, [])

	async function getInformation() {
		const reqInstance = axios.create({
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
		//const url = "https://crud-antonio-neto.vercel.app/"
		const url = "http://localhost:3000/"
		await reqInstance
			.get(url + "api/usuario")
			.then((response) => {
				setEmail(response.data.email)
				setLastName(response.data.lastName)
				setName(response.data.name)
				if (response.data.security != "nothing") {
					setSecurity("Ativado")
				}
			})
			.catch((error) => {
				console.log(error)
				router.push("/entrar")
			})
	}

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Header>
				<div>
					<div className="title">
						<h1>logado com sucesso</h1>
						<p>Bem vindo de volta {name}.</p>
					</div>
				</div>
				<Link href={"/entrar"}>
					<a href="/entrar">
						<Button
							Text={"Sair"}
							Wrong
							clicked={() => {
								localStorage.clear()
							}}
						/>
					</a>
				</Link>
			</Header>

			<Main>
				<CardInfo
					title={"Informações pessoais"}
					name={name}
					lastName={lastName}
				/>
				<CardInfo
					title={"Informações confidênciais"}
					email={email}
					security={security}
					login={"Oculto ..."}
					pass={"Oculto ..."}
				/>
			</Main>
		</>
	)
}
