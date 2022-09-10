import type { NextApiRequest, NextApiResponse } from "next"
import { ConnectDB } from "../../middlewares/conncetDB"
import { CORS } from "../../middlewares/cors"
import { validateTokenJWT } from "../../middlewares/validateTokenJWT"
import { RegularAnswer } from "../../types/RegularAnswer"

const userEndpoint = (
	req: NextApiRequest,
	res: NextApiResponse<RegularAnswer>,
) => {
	if (req.method == "GET") {
	}
}

export default CORS(validateTokenJWT(ConnectDB(userEndpoint)))
