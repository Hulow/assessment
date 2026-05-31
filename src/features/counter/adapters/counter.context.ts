import { createContext } from 'react'

export type CounterContextValue = {
  count: number
  increment: () => void
}

export const CounterContext = createContext<CounterContextValue | null>(null)
