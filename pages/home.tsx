import Head from "next/head"
import { Header, Main, Footer } from "../styles/home"

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Main>
				<h1>Logado com sucesso</h1>
			</Main>
		</>
	)
}
