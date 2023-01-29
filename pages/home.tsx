import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"
import { parseCookies, destroyCookie } from "nookies"

import { Header, Main } from "../styles/home"
import { Button } from "../components/button"
import { CardInfo } from "../components/cardInfo"

import { URL_DEVELOPMENT } from "./_document"

export async function getServerSideProps(context) {
	const cookies = parseCookies(context)

	const data = await fetch(URL_DEVELOPMENT + "api/usuario", {
		headers: {
			Authorization: `Bearer ${cookies.token}`,
		},
	})

	const response = await data.json()

	return {
		props: { data: response },
	}
}

export default function Home({ data }: any) {
	const router = useRouter()

	const [isVerificated, setIsVerificated] = useState("NotVerificated")
	const [security, setSecurity] = useState("Desativado")

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		} else {
			checkInformations()
			console.log(data)
		}
	}, [])

	function checkInformations() {
		if (data.verificatedEmail) {
			setIsVerificated("Verificated")
		}

		data.questionSecurity == "No questions yet"
			? setSecurity("Desativado")
			: setSecurity("Ativado")
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
						<p>Bem vindo de volta {data.name}.</p>
					</div>
				</div>
				<Link href={"/entrar"}>
					<a href="/entrar">
						<Button
							Text={"Sair"}
							Wrong
							clicked={() => {
								destroyCookie({}, "token")
							}}
						/>
					</a>
				</Link>
			</Header>

			<Main>
				<CardInfo
					title={"Informações pessoais"}
					name={data.name}
					lastName={data.lastName}
				/>
				<CardInfo
					title={"Informações confidênciais"}
					email={data.email}
					emailVarificatedStatus={isVerificated}
					security={security}
					login={"Oculto ..."}
					pass={"Oculto ..."}
				/>
			</Main>
		</>
	)
}
