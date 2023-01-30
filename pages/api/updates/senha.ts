/* eslint-disable no-unsafe-optional-chaining */
import { ConnectDB } from "./../../../middlewares/conncetDB"
import { validateTokenJWT } from "./../../../middlewares/validateTokenJWT"
import { UserModel } from "./../../../models/UserModel"
import { NextApiResponse } from "next"
import { NextApiRequest } from "next"
import nextConnect from "next-connect"
import md5 from "md5"

const handler = nextConnect().put(
	async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const { userId } = req?.query
			const user = await UserModel.findById(userId)
			if (!user) {
				res.status(400).json({ error: "Usuário não encontrado." })
			}

			const { newPassword } = req.body
			const { confirmPassword } = req.body
			const { security } = req.body

			if (newPassword.length < 5) {
				return res
					.status(400)
					.json({ error: "A senha deve ter no mínimo 5 caracteres. " })
			}

			if (newPassword != confirmPassword) {
				return res.status(400).json({ error: "As senhas não coincidem." })
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

			user.password = md5(newPassword)

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
