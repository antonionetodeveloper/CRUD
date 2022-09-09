import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	login: { type: String, required: true },
	password: { type: String, required: true },
	avatar: { type: String, required: false },
})

export const UserModel =
	mongoose.models.users || mongoose.model("users", UserSchema)
