// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { ConnectDB } from "../../middlewares/conncetDB"
import { RegularAnswer } from "../../types/RegularAnswer"

const endPointLogin = (
	req: NextApiRequest,
	res: NextApiResponse<RegularAnswer>,
) => {
	if (req.method === "POST") {
		const { login, password } = req.body

		if (login === "admin" && password === "admin123") {
			res.status(200).json({ msg: "Conectado com sucesso" })
		} else {
			res.status(400).json({ error: "Usuário ou senha inválidos." })
		}
	}
	return res.status(405).json({ error: "Metodo não informado." })
}

export default ConnectDB(endPointLogin)
