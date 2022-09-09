import type { NextApiRequest, NextApiHandler, NextApiResponse } from "next"
import type { RegularAnswer } from "../types/RegularAnswer"
import jwt, { JwtPayload } from "jsonwebtoken"

export const validateTokenJWT =
	(handler: NextApiHandler) =>
	(req: NextApiRequest, res: NextApiResponse<RegularAnswer>) => {
		try {
			const { JWT_KEY_TOKEN } = process.env

			if (!JWT_KEY_TOKEN) {
				return res
					.status(500)
					.json({ error: "TOKEN JWT KEY não informada corretamente." })
			}

			if (!req || !req.headers) {
				return res.status(401).json({ error: "Não autorizado. ERR01" })
			}

			if (req.method !== "OPTIONS") {
				const authorization = req.headers["authorization"]
				if (!authorization) {
					return res.status(401).json({ error: "Não autorizado. ERR02" })
				}

				const token = authorization.substring(7)
				if (!token) {
					return res.status(401).json({ error: "Não autorizado. ERR03" })
				}

				const decoded = jwt.verify(token, JWT_KEY_TOKEN) as JwtPayload
				if (!decoded) {
					return res.status(401).json({ error: "Não autorizado. ERR04" })
				}

				if (!req.query) {
					req.query = {}
				}
				req.query.userId = decoded._id
			}
		} catch (error) {
			console.log(error)
			return res.status(401).json({ error: "Não autorizado. ERR05" })
		}

		return handler(req, res)
	}
