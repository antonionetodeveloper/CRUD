import styled from "styled-components"
import { parseCookies } from "nookies"
import { URL_DEVELOPMENT } from "../_document"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

export async function getServerSideProps(context) {
	const cookies = parseCookies(context)

	const data = await fetch(URL_DEVELOPMENT + "api/usuario", {
		headers: {
			Authorization: `Bearer ${cookies.token}`,
		},
	})

	const response = await data.json()

	if (typeof cookies.token == "undefined") {
		return {
			props: { data: response, token: null },
		}
	}

	return {
		props: { data: response, token: cookies.token },
	}
}

export default function Page({ data, token }: any) {
	const router = useRouter()
	const [inputValue, setInputValue] = useState()

	useEffect(() => {
		if (data.error) {
			router.push("/entrar")
		}
	}, [])

	async function updateInformation() {
		const reqInstance = axios.create({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		await reqInstance
			.put(URL_DEVELOPMENT + "api/updates/confirm_email", {
				inputedHashByUser: inputValue,
			})
			.then(() => {
				alert("Email confirmado com sucesso.")
				router.push("/home")
			})
			.catch(function (error) {
				alert(error.response.data.error)
			})
	}

	return (
		<Container>
			<input
				type="text"
				onChange={(event: any) => setInputValue(event.target.value)}
			/>
			<button
				onClick={() => {
					//updateInformation()
					alert("clicou")
				}}
			>
				clique em mim
			</button>
		</Container>
	)
}

const Container = styled.div`
	h1,
	p {
		color: white;
	}
`
