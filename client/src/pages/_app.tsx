import { ChakraProvider } from '@chakra-ui/react'
import '../app/globals.css'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@/shadcn/themeProvider'

interface MyAppProps {
  Component: any
  pageProps: any
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  )
}
