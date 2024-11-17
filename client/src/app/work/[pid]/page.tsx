'use client'

import { ChakraProvider } from '@chakra-ui/react'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import App from '../../App'
import { ThemeProvider } from '@/shadcn/themeProvider'
import { useEffect } from 'react'

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </ThemeProvider>
  )
}
