import { useState, type ReactNode } from 'react'
import { Counter } from '../domain/Counter'
import { CounterContext, type CounterContextValue } from './counter.context'

type CounterProviderProps = {
  children: ReactNode
}

export function CounterProvider({ children }: CounterProviderProps) {
  const [counter, setCounter] = useState(() => Counter.create())

  const value: CounterContextValue = {
    count: counter.getValue(),
    increment: () => {
      setCounter((current) => current.increment())
    },
  }

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
}
