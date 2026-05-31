import { useContext } from 'react'
import { CounterContext } from './counter.context'

export function useCounter() {
  const context = useContext(CounterContext)

  if (context === null) {
    throw new Error('useCounter must be used within a CounterProvider')
  }

  return context
}
