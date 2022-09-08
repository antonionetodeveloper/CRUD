import type { NextApiRequest, NextApiResponse } from "next"
import type { RegularAnswer } from "../../types/RegularAnswer"
import type { RequisicaoCadastro } from "../../types/RequisicaoCadastro"
import { UserModel } from "../../models/UserModel"
import { ConnectDB } from "../../middlewares/conncetDB"

const endPointCadastro = async (
	req: NextApiRequest,
	res: NextApiResponse<RegularAnswer>,
) => {
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
		await UserModel.create(user)
		return res.status(200).json({ msg: "Usuário cadastrado com sucesso." })
	} else {
		return res.status(406).json({ error: "Método inválido." })
	}
}
export default ConnectDB(endPointCadastro)
