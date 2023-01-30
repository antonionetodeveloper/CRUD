/* eslint-disable no-unsafe-optional-chaining */
import { ConnectDB } from "./../../../middlewares/conncetDB"
import { validateTokenJWT } from "./../../../middlewares/validateTokenJWT"
import { UserModel } from "./../../../models/UserModel"
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

			const { newLogin } = req.body
			const { security } = req.body

			if (newLogin.length < 5) {
				return res
					.status(400)
					.json({ error: "o login deve ter no mínimo 5 caracteres. " })
			}

			if (security != user.answear) {
				return res
					.status(400)
					.json({ error: "Resposta de segurança inválida." })
			}

			if (
				!user.verificatedEmail ||
				user.questionSecurity == "No questions yet"
			) {
				return res.status(400).json({
					error: "Você deve ter o email confirmado e a segurança ativa.",
				})
			}

			const repeatedLogins = await UserModel.find({ login: newLogin })
			if (repeatedLogins && repeatedLogins.length > 0) {
				return res
					.status(400)
					.json({ error: "Este login já está sendo usado." })
			}

			user.login = newLogin
			await UserModel.findByIdAndUpdate({ _id: user.id }, user)
			return res.status(200).json({ msg: "login alterado com sucesso." })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: "Usuário não encontrado." + error })
		}
		return res
			.status(400)
			.json({ error: "Não foi possivel atualizar o usuário" })
	},
)
export default validateTokenJWT(ConnectDB(handler))
