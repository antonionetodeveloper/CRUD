import { createContext, useState, useEffect } from "react"

interface AuthContextData {
	loading: boolean
	keyToken: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: any) {
	const [loading, setLoading] = useState(true)
	const [keyToken, setKeyToken] = useState<string>("")

	useEffect(() => {
		getToken()
	}, [])

	async function getToken() {
		try {
			const token = await localStorage.getItem("token")
			setKeyToken(token)
		} catch (e: any) {
			console.log(e)
		}
	}

	return (
		<AuthContext.Provider value={{ loading, keyToken }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
