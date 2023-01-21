import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})
  
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
