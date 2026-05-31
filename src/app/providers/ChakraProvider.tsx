import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type ChakraUiProviderProps = {
  children: ReactNode
}

export function ChakraUiProvider({ children }: ChakraUiProviderProps) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}
