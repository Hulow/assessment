export class CounterError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CounterError'
  }
}
