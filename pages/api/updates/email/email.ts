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

			const { newEmail } = req.body
			const { security } = req.body

			if (
				!newEmail ||
				newEmail.length < 5 ||
				!newEmail.includes("@") ||
				!newEmail.includes(".")
			) {
				return res.status(400).json({ error: "Email inválido." })
			}

			if (
				user.questionSecurity == "No questions yet" &&
				user.verificatedEmail
			) {
				return res.status(400).json({ error: 'Crie uma "Segurança" antes.' })
			}

			if (
				security != user.answear &&
				user.questionSecurity != "No questions yet"
			) {
				return res.status(400).json({ error: "Código de segurança inválido." })
			}

			const repeatedEmails = await UserModel.find({ email: newEmail })
			if (repeatedEmails && repeatedEmails.length > 0) {
				return res
					.status(400)
					.json({ error: "Este email já está sendo usado." })
			}

			if (newEmail && newEmail.length > 2 && newEmail != user.email) {
				user.email = newEmail
				user.verificatedEmail = false
				await UserModel.findByIdAndUpdate({ _id: user.id }, user)
				return res.status(200).json({ msg: "Email alterado com sucesso." })
			} else {
				return res
					.status(400)
					.json({ error: "Não foi possível alterar seu email" })
			}
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
