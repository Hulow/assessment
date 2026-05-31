import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ChakraUiProvider } from '@/app/providers/ChakraProvider'
import { CounterProvider } from '../adapters/counter.provider.tsx'
import { Counter } from './Counter'

afterEach(() => {
  cleanup()
})

function renderCounter() {
  return render(
    <ChakraUiProvider>
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </ChakraUiProvider>,
  )
}

describe('Given a Counter to render', () => {
  describe('When the user has not clicked on the counter yet', () => {
    it('then shows the display as Current count 0', () => {
      renderCounter()

      expect(screen.getByText('Current count 0')).toBeInTheDocument()
    })

    it('then shows the button as +1', () => {
      renderCounter()

      expect(screen.getByRole('button', { name: '+1' })).toBeInTheDocument()
    })
  })

  describe('When the user has clicked on the counter', () => {
    it('then shows the display as Current count 1', () => {
      renderCounter()

      fireEvent.click(screen.getByRole('button', { name: '+1' }))

      expect(screen.getByText('Current count 1')).toBeInTheDocument()
    })

    it('then shows the button as +1', () => {
      renderCounter()

      fireEvent.click(screen.getByRole('button', { name: '+1' }))

      expect(screen.getByRole('button', { name: '+1' })).toBeInTheDocument()
    })
  })
})
