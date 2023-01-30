import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import mongoose from "mongoose"
import { RegularAnswer } from "../types/RegularAnswer"

export const ConnectDB =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse<RegularAnswer>) => {
		// Verify if the db is already connected
		if (mongoose.connections[0].readyState) {
			return handler(req, res)
		}

		// Connect if not connect
		else {
			const { DB_CONECT_STRING } = process.env
			if (!DB_CONECT_STRING) {
				return res.status(500).json({
					error:
						"dados da '.env' não foram informadas! " +
						typeof DB_CONECT_STRING +
						DB_CONECT_STRING,
				})
			} else {
				mongoose.connection.on("connected", () => {
					console.log("Conectado ao banco de dados.")
				})
				mongoose.connection.on("error", (error) => {
					"Erro ao conectar no banco. erro: " + error
				})

				await mongoose.connect(DB_CONECT_STRING)
				return handler(req, res)
			}
		}
	}
