import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CounterProvider } from './counter.provider.tsx'
import { useCounter } from './useCounter'

describe('Given useCounter', () => {
  describe('When useCounter is at its initial state', () => {
    it('then initial count is 0', () => {
      const { result } = renderHook(() => useCounter(), {
        wrapper: CounterProvider,
      })

      expect(result.current.count).toBe(0)
    })
  })

  describe('When useCounter has been incremented by one', () => {
    it('then count becomes 1', () => {
      const { result } = renderHook(() => useCounter(), {
        wrapper: CounterProvider,
      })

      act(() => {
        result.current.increment()
      })

      expect(result.current.count).toBe(1)
    })
  })

  describe('When useCounter has been incremented twice', () => {
    it('then count becomes 2', () => {
      const { result } = renderHook(() => useCounter(), {
        wrapper: CounterProvider,
      })

      act(() => {
        result.current.increment()
        result.current.increment()
      })

      expect(result.current.count).toBe(2)
    })
  })
})
