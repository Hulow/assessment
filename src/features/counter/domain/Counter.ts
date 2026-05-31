import { CounterError } from './CounterError'

export class Counter {
  private constructor(private readonly value: number) {}

  static create(initialValue = 0): Counter {
    if (initialValue < 0) {
      throw new CounterError('Initial value cannot be negative')
    }

    return new Counter(initialValue)
  }

  getValue(): number {
    return this.value
  }

  increment(): Counter {
    return new Counter(this.value + 1)
  }
}
