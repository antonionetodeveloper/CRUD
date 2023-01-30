/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-unsafe-optional-chaining */
import { ConnectDB } from "../../../../middlewares/conncetDB"
import { validateTokenJWT } from "../../../../middlewares/validateTokenJWT"
import { UserModel } from "../../../../models/UserModel"
import { NextApiResponse } from "next"
import { NextApiRequest } from "next"
import nextConnect from "next-connect"

import nodemailer from "nodemailer"

const handler = nextConnect().post(
	async (req: NextApiRequest, res: NextApiResponse) => {
		if (
			typeof process.env.EMAIL == "undefined" ||
			process.env.EMAIL_PASSWORD == "undefined"
		) {
			res
				.status(400)
				.json({ error: "Variáveis de ambiente não alocadas corretamente." })
		}
		const transporter = nodemailer.createTransport({
			port: 465,
			host: "smtp.gmail.com",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		})

		try {
			const { userId } = req?.query
			const user = await UserModel.findById(userId)

			if (!user) {
				res.status(400).json({ error: "Usuário não encontrado." })
			}

			const mailData: any = {
				from: "dev.antonio.crud@gmail.com",
				to: user.email,
				subject: `Message From antonio's CRUD`,
				text: `your code verification is "${user.security}", please enjoy. Do not reply.`,
			}

			transporter.sendMail(mailData)
			return res.status(200).json({ msg: "Email enviado com sucesso." })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: "Usuário não encontrado. " + error })
		}
		return res.status(400).json({ error: "Algo inesperado aconteceu." })
	},
)
export default validateTokenJWT(ConnectDB(handler))
