import type { NextApiRequest, NextApiResponse } from "next"
import type { RegularAnswer } from "../../types/RegularAnswer"
import type { RequisicaoCadastro } from "../../types/RequisicaoCadastro"
import { ConnectDB } from "../../middlewares/conncetDB"
import { UserModel } from "../../models/UserModel"
import { CORS } from "../../middlewares/cors"
import md5 from "md5"

const endPointCadastro = async (
	req: NextApiRequest,
	res: NextApiResponse<RegularAnswer>,
) => {
	try {
		if (req.method == "POST") {
			const user = req.body as RequisicaoCadastro

			if (!user.name || user.name.length < 2) {
				return res.status(400).json({ error: "Nome inválido." })
			}
			if (!user.lastName || user.lastName.length < 2) {
				return res.status(400).json({ error: "Sobrenome inválido." })
			}
			if (
				!user.email ||
				user.email.length < 5 ||
				!user.email.includes("@") ||
				!user.email.includes(".")
			) {
				return res.status(400).json({ error: "Email inválido." })
			}

			if (!user.password || user.password.length < 7) {
				return res.status(400).json({ error: "Senha inválida." })
			}

			const repeatedEmails = await UserModel.find({ email: user.email })
			if (repeatedEmails && repeatedEmails.length > 0) {
				return res
					.status(400)
					.json({ error: "Este email já está sendo usado." })
			}

			if (!user.login || user.login.length < 2) {
				return res.status(400).json({ error: "Login inválido." })
			}

			const repeatedLogins = await UserModel.find({ login: user.login })
			if (repeatedLogins && repeatedLogins.length > 0) {
				return res
					.status(400)
					.json({ error: "Este login já está sendo usado." })
			}

			// simple method...
			const SECURITY = md5(user.email)
			const SECURITY_CODE =
				SECURITY[0] + SECURITY[1] + SECURITY[2] + SECURITY[3] + SECURITY[4]

			const saveUser = {
				name: user.name,
				lastName: user.lastName,
				email: user.email,
				security: SECURITY_CODE,
				verificatedEmail: false,
				questionSecurity: "No questions yet",
				answear: "No answear yet",
				login: user.login,
				password: md5(user.password),
			}

			await UserModel.create(saveUser)
			return res.status(200).json({ msg: "Usuário cadastrado com sucesso." })
		} else {
			return res.status(406).json({ error: "Método inválido." })
		}
	} catch (e) {
		return res.status(400).json({ error: e.toString() })
	}
}
export default CORS(ConnectDB(endPointCadastro))
