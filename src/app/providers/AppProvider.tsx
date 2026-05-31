import type { ReactNode } from 'react'
import { ChakraUiProvider } from './ChakraProvider'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <ChakraUiProvider>{children}</ChakraUiProvider>
}
