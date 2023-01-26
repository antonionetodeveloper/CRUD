/* eslint-disable no-unsafe-optional-chaining */
import type { NextApiRequest, NextApiResponse } from "next"
import { ConnectDB } from "../../middlewares/conncetDB"
import { validateTokenJWT } from "../../middlewares/validateTokenJWT"
import { UserModel } from "../../models/UserModel"
import { RegularAnswer } from "../../types/RegularAnswer"

const userEndpoint = async (
	req: NextApiRequest,
	res: NextApiResponse<RegularAnswer>,
) => {
	try {
		const { userId } = req?.query
		const user = await UserModel.findById(userId)
		user.login = null
		user.password = null
		user.answear = null
		user.security = null
		return res.status(200).json(user)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: "Usuário não foi informado." })
	}
}

export default validateTokenJWT(ConnectDB(userEndpoint))
