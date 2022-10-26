import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { Input } from "../../components/input"
import { Button } from "../../components/button"

export default function AlteraNome() {
	const [name, setName] = useState("")
	const [newName, setNewName] = useState("")
	const [isLoading, setIsLoading] = useState(false)

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
		const url = "https://crud-antonio-neto.vercel.app/"
		//const url = "http://localhost:3000/"
		await reqInstance
			.get(url + "api/usuario")
			.then((response) => {
				setName(response.data.name)
			})
			.catch((error) => {
				console.log(error)
				window.location.href = url + "entrar"
			})
	}

	async function updateInformation() {
		const reqInstance = axios.create({
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
		const url = "https://crud-antonio-neto.vercel.app/"
		//const url = "http://localhost:3000/"
		await reqInstance
			.put(url + "api/updates/nome", { name: newName })
			.then((response) => {
				window.location.href = url + "home"
				alert("Nome alterado com sucesso.")
				setIsLoading(false)
				setName(response.data.name)
			})
			.catch((error) => {
				console.log(error)
				window.location.href = url + "entrar"
			})
	}

	function setUpUpdate() {
		setIsLoading(true)
		if (newName === "" || newName.length < 2) {
			alert("ai não dá né campeão...")
		} else {
			updateInformation()
		}
	}

	const keyPressed = (event) => {
		if (event.key == "Enter") {
			event.preventDefault()
			setUpUpdate()
		}
	}

	return (
		<Container>
			<header>
				<h3>Alterar o nome</h3>
			</header>
			<main onKeyDown={keyPressed}>
				<form>
					<div className="fields">
						<span className="span">O seu nome atual é &quot;{name}&quot;</span>
						<Input
							className="Input "
							Text="Novo nome"
							Type="text"
							comeBack={setNewName}
						/>
					</div>
					<Button
						Text="Confirmar"
						isLoading={isLoading}
						clicked={() => {
							setUpUpdate()
						}}
					/>
				</form>
			</main>
		</Container>
	)
}

const Container = styled.div`
	header {
		height: 10vh;
		h3 {
			color: white;
			text-align: center;
			font-size: 2em;
			font-weight: 900;
			margin: 0px;
			padding: 2.5vw;
		}
	}
	main {
		width: 70vw;
		height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto;
		margin-top: 10vw;
		background-color: white;
		border-radius: 2vw;
		form {
			display: flex;
			gap: 5vw;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			div.fields {
				width: 70vw;
				display: flex;
				justify-content: center;
				gap: 5vw;
				align-items: center;
				.span,
				.Input {
					width: 15vw;
				}

				span.span {
					font-weight: 700;
					font-size: 1.1em;
					text-align: center;
				}
			}
		}
	}
`
