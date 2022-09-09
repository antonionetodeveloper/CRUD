import type { NextApiRequest, NextApiResponse } from "next"
import { ConnectDB } from "../../middlewares/conncetDB"
import { CORS } from "../../middlewares/cors"
import { validateTokenJWT } from "../../middlewares/validateTokenJWT"

const userEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
	return res.status(200).json("Usuário autenticado com sucesso.")
}

export default CORS(validateTokenJWT(ConnectDB(userEndpoint)))
