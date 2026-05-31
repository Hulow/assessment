import type { ReactNode } from 'react'
import { CounterProvider } from '@/features/counter'
import { ChakraUiProvider } from './ChakraProvider'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ChakraUiProvider>
      <CounterProvider>{children}</CounterProvider>
    </ChakraUiProvider>
  )
}
