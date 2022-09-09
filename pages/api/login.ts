// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { ConnectDB } from "../../middlewares/conncetDB"
import { RegularAnswer } from "../../types/RegularAnswer"
import { RequisicaoLogin } from "../../types/RequestedLogin"
import { LoginAnswer } from "../../types/RegularLoginAnswer"
import { UserModel } from "../../models/UserModel"
import md5 from "md5"
import jwt from "jsonwebtoken"
import { CORS } from "../../middlewares/cors"

const endPointLogin = async (
	req: NextApiRequest,
	res: NextApiResponse<RegularAnswer | LoginAnswer>,
) => {
	const { JWT_KEY_TOKEN } = process.env
	if (!JWT_KEY_TOKEN) {
		res.status(500).json({ error: "JWT key token não informada corretamente." })
	}

	if (req.method === "POST") {
		const { login, password } = req.body as RequisicaoLogin

		const foundUsers = await UserModel.find({
			login: login,
			password: md5(password),
		})
		if (foundUsers && foundUsers.length > 0) {
			const foundSingleUser = foundUsers[0]
			const token = jwt.sign({ _id: foundSingleUser._id }, JWT_KEY_TOKEN)
			return res.status(200).json({
				name: foundSingleUser.name,
				lastName: foundSingleUser.lasName,
				email: foundSingleUser.email,
				token,
			})
		} else {
			res.status(400).json({ error: "Usuário ou senha inválidos." })
		}
	}
	return res.status(405).json({ error: "Metodo não informado." })
}

export default CORS(ConnectDB(endPointLogin))
