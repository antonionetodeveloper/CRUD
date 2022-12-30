import { GetInformation } from "./getInformation"
import { useContext, useEffect } from "react"
import styled from "styled-components"
import AuthContext from "../../context/auth"

export async function getStaticPaths() {
	return {
		paths: [{ params: { handle: "igor" } }, { params: { handle: "rafael" } }],
		fallback: false,
	}
}

export async function getStaticProps(context) {
	const lista = ["Igor", "Rafael"]

	return {
		props: { post: lista },
	}
}

// eslint-disable-next-line react/prop-types
export default function Page({ post }) {
	const { keyToken } = useContext(AuthContext)

	useEffect(() => {
		qualquer()
	}, [])

	async function qualquer() {
		console.log(keyToken, "oie")

		const response = await GetInformation(keyToken)
		//setDATA(response)
		console.log(response, " aqui ")
	}

	return (
		<Container>
			<p>...{post}</p>
		</Container>
	)
}

const Container = styled.div`
	h1,
	p {
		color: white;
	}
`
