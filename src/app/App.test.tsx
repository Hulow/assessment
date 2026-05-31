import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('Given an App to render', () => {
  describe('When the user has not clicked on the counter yet', () => {
    it('then show a title', () => {
      render(<App />)

      expect(screen.getByRole('heading', { name: 'Yendou' })).toBeInTheDocument()
    })
  })
})
