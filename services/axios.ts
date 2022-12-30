import axios from "axios"

const apiAxios = axios.create({
	//"https://crud-antonio-neto.vercel.app/"
	//"http://localhost:3000/"
	baseURL: "http://localhost:3000/",
	data: {},
	headers: {},
})

export default apiAxios
