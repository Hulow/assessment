import { describe, expect, it } from 'vitest'
import { Counter } from './Counter'
import { CounterError } from './CounterError'

describe('Given Counter.create', () => {
  describe('When called with no argument', () => {
    it('then value is 0', () => {
      const counter = Counter.create()

      expect(counter.getValue()).toBe(0)
    })
  })

  describe('When called with a positive value', () => {
    it('then value matches', () => {
      const counter = Counter.create(5)

      expect(counter.getValue()).toBe(5)
    })
  })

  describe('When called with a negative value', () => {
    it('then throws CounterError', () => {
      expect(() => Counter.create(-1)).toThrow(CounterError)
    })
  })
})

describe('Given a Counter', () => {
  describe('When increment is called', () => {
    it('then new instance has value + 1 and original is unchanged', () => {
      const counter = Counter.create()
      const next = counter.increment()

      expect(next.getValue()).toBe(1)
      expect(counter.getValue()).toBe(0)
    })
  })
})
