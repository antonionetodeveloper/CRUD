import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useRouter } from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { ThemeProvider, DefaultTheme } from "styled-components"
import GlobalStyle from "../styles/GlobalStyle"
import { AuthProvider } from "./context/auth"

const theme: DefaultTheme = {
	colors: {
		primary: "#fff",
		secondary: "#fff",
	},
}

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useEffect(() => {
		const handleStart = (url: string) => {
			console.log(`Loading: ${url}`)
			NProgress.start()
		}

		const handleStop = () => {
			NProgress.done()
		}

		router.events.on("routeChangeStart", handleStart)
		router.events.on("routeChangeComplete", handleStop)
		router.events.on("routeChangeError", handleStop)

		return () => {
			router.events.off("routeChangeStart", handleStart)
			router.events.off("routeChangeComplete", handleStop)
			router.events.off("routeChangeError", handleStop)
		}
	}, [router])

	return (
		<>
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
				rel="stylesheet"
			/>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Component {...pageProps} />
				</ThemeProvider>
			</AuthProvider>
		</>
	)
}
