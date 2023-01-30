/* eslint-disable no-unsafe-optional-chaining */
import { ConnectDB } from "../../../../middlewares/conncetDB"
import { validateTokenJWT } from "../../../../middlewares/validateTokenJWT"
import { UserModel } from "../../../../models/UserModel"
import { NextApiResponse } from "next"
import { NextApiRequest } from "next"
import nextConnect from "next-connect"

const handler = nextConnect().put(
	async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const { userId } = req?.query
			const user = await UserModel.findById(userId)
			if (!user) {
				res.status(400).json({ error: "Usuário não encontrado." })
			}

			const { inputedHashByUser } = req.body
			if (inputedHashByUser == user.security) {
				user.verificatedEmail = true
			} else {
				return res.status(400).json({ error: "Código incorreto." })
			}

			await UserModel.findByIdAndUpdate({ _id: user.id }, user)
			return res.status(200).json({ msg: "Email confirmado com sucesso." })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: "Usuário não encontrado. " + error })
		}
		return res
			.status(400)
			.json({ error: "Não foi possivel atualizar o usuário" })
	},
)
export default validateTokenJWT(ConnectDB(handler))
