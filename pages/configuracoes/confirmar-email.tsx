import styled from "styled-components"
import { parseCookies } from "nookies"
import { URL_DEVELOPMENT } from "../_document"

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

export default function Page({ data }: any) {
	console.log("data -> ", data)

	return (
		<Container>
			<p>...</p>
		</Container>
	)
}

const Container = styled.div`
	h1,
	p {
		color: white;
	}
`
