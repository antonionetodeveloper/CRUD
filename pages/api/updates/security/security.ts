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

			const { securityCode } = req.body
			const { securityNewQuestion } = req.body
			const { securityNewAnswear } = req.body

			if (!user.verificatedEmail) {
				return res.status(400).json({
					error:
						"O seu email deve estar verificado para ser possível trocar a segurança.",
				})
			}

			if (securityNewQuestion.length < 5 || securityNewAnswear.length < 5) {
				return res.status(400).json({
					error: "A pergunta e a resposta devem ter no mínimo 5 caracteres.",
				})
			}

			if (securityCode != user.security) {
				return res.status(400).json({
					error: "Código inválido.",
				})
			}

			user.questionSecurity = securityNewQuestion
			user.answear = securityNewAnswear

			await UserModel.findByIdAndUpdate({ _id: user.id }, user)
			return res
				.status(200)
				.json({ msg: "Etapa de segurança atualizada com sucesso." })
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
