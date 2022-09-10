import Head from "next/head"
import Link from "next/link"
import { Card } from "../components/card"
import { Header, Main, Footer } from "../styles/index"

export default function Index() {
	return (
		<>
			<Head>
				<title>CRUD</title>
			</Head>

			<Header>
				<nav>
					<span>
						<Link href={"/"}>
							<a href="/">CRUD</a>
						</Link>
					</span>
					<span>
						<Link href={"/entrar"}>
							<a href="/entrar">ENTRAR</a>
						</Link>
					</span>
					<span>
						<Link href={"/cadastrar"}>
							<a href="/cadastrar">CADASTRO</a>
						</Link>
					</span>
					<span>
						<Link href={"/creditos"}>
							<a href="/creditos">CRÉDITOS</a>
						</Link>
					</span>
				</nav>
			</Header>

			<Main>
				<div className="group1">
					<Card
						title={"CRUD"}
						text={
							"CRUD é o acrônimo para Create (criar), Read (ler), Update (atualizar) e Delete (apagar). Com essa explicação, já dá para intuir que o CRUD é uma sequência de funções de um sistema que trabalha com banco de dados, seja ele na sua máquina ou na nuvem."
						}
					/>
				</div>
				<div className="group2">
					<Card
						title={"Create"}
						text={
							"Trata-se do conceito de criação, registro ou cadastro de informações e dados em um determinado lugar."
						}
						hasButton
						redirectTo={"/cadastrar"}
					/>
					<Card
						title={"Read"}
						text={
							"É o ato de consultar os dados em um website.Por exemplo, você está solicitando dados que serão lidos pela plataforma e, na sequência, exibidos na tela. "
						}
						hasButton
						redirectTo={"/entrar"}
					/>
				</div>
				<div className="group3">
					<Card
						title={"Update"}
						text={
							"O conceito de update é aplicado quando você, que é dono dos dados ou tem permissão para editá-los, atualiza as informações que julgar necessárias."
						}
					/>
					<Card
						title={"Delete"}
						text={
							"Trata-se de uma ação de remoção de dados a partir do operador do sistema."
						}
					/>
				</div>
			</Main>

			<Footer></Footer>
		</>
	)
}
