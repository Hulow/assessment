import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { AppProvider } from './providers/AppProvider'

describe('Given an App to render', () => {
  describe('When the user has not clicked on the counter yet', () => {
    it('then shows the counter at initial state', () => {
      render(
        <AppProvider>
          <App />
        </AppProvider>,
      )

      expect(screen.getByText('Current count 0')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '+1' })).toBeInTheDocument()
    })
  })
})
