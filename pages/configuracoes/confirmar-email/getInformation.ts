import { useContext } from "react"
import apiAxios from "../../../services/axios"
import AuthContext from "../../context/auth"

export async function GetInformation(token: string) {
	/* const reqInstance = axios.create({
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	}) */
	//const url = "https://crud-antonio-neto.vercel.app/"
	/* const url = "http://localhost:3000/"
	await reqInstance
		.get(url + "api/usuario")
		.then((response) => {
			console.log(response.data)
			return response.data
		})
		.catch((error) => {
			console.log(error)
		}) */

	console.log(token, "esse é o token")
	const response = await apiAxios.get("/api/usuario", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

// redux e contextapi
