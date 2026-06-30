import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { NyhetsOversikt } from '../pages/NyhetsOversikt.tsx'

describe('NyhetsOversikt', () => {
  it('viser overskrift, søkefelt og opprett-knapp', () => {
    render(
      <MemoryRouter>
        <NyhetsOversikt />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Nyheter', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Opprett nyhet/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Søk etter nyheter')).toBeInTheDocument()
  })
})
