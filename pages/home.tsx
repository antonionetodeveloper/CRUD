import axios from "axios"
import Head from "next/head"
import { Header, Main, Footer } from "../styles/home"

export default function Home() {
	async function getInformation() {
		const url = "http://localhost:3000/"
		//await axios.get()
	}

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Main>
				<h1>logado com sucesso</h1>
			</Main>
		</>
	)
}
