import { MemoryRouter } from 'react-router-dom'

import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'

import { NyhetsOversikt } from '../pages/NyhetsOversikt.tsx'

describe('NyhetsOversikt', () => {
  it('viser overskrift, søkefelt og opprett-knapp', () => {
    render(
      <MemoryRouter>
        <NyhetsOversikt />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Aktuelt', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Opprett sak/i })).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: 'Søk' })).toBeInTheDocument()
  })
})
