import { createContext, useEffect, useState } from "react"
import md5 from "md5"

export const AuthContext = createContext({} as any)

export function AuthProvider({ children }: any) {
	const [keyToken, setKeyToken] = useState("NoKeyToken")

	useEffect(() => {
		if (keyToken == "NoKeyToken" && typeof localStorage != undefined) {
			if (localStorage.getItem("token")) {
				setKeyToken(localStorage.getItem("token"))
			}
		}
	}, [])
	return (
		<AuthContext.Provider value={{ keyToken, setKeyToken }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
