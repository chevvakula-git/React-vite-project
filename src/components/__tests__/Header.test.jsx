import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Header from '../../components/Header'

describe('Header', () => {
  test('renders brand and basic actions', () => {
    render(<Header />)
    expect(screen.getByText('VidTube')).toBeInTheDocument()
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
  })

  test('search input is present and accepts typing (desktop and mobile)', () => {
    render(<Header />)
    // Desktop input exists in DOM (though hidden on small viewport), mobile visible by default
    const inputs = screen.getAllByRole('textbox', { name: /search/i })
    expect(inputs.length).toBeGreaterThan(0)

    const mobileInput = inputs[inputs.length - 1]
    fireEvent.change(mobileInput, { target: { value: 'react' } })
    expect(mobileInput).toHaveValue('react')
  })

  test('shows suggestions when focused and can pick one', () => {
    render(<Header />)
    const mobileInput = screen.getByRole('textbox', { name: /search/i })
    fireEvent.focus(mobileInput)

    // Suggestions list appears
    const suggestionButton = screen.getAllByRole('button', { name: /search/i })[0]
    expect(suggestionButton).toBeInTheDocument()

    // Pick the first suggestion from listbox
    const listbox = screen.getByRole('listbox', { name: /search suggestions/i })
    const firstOption = listbox.querySelector('button')
    expect(firstOption).toBeTruthy()
    fireEvent.mouseDown(firstOption) // prevent blur behavior in component
    fireEvent.click(firstOption)
  })

  test('submits query when clicking search', () => {
    // Mock alert to avoid noisy output
    const originalAlert = window.alert
    window.alert = vi.fn()

    render(<Header />)
    const mobileInput = screen.getByRole('textbox', { name: /search/i })
    fireEvent.change(mobileInput, { target: { value: 'vite react setup' } })

    const submitButtons = screen.getAllByRole('button', { name: /search/i })
    const submit = submitButtons[submitButtons.length - 1]
    fireEvent.click(submit)

    expect(window.alert).toHaveBeenCalledWith('Search: vite react setup')
    window.alert = originalAlert
  })
})


