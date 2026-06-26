import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { CreateComponent } from './CreateComponent'

vi.mock('felleskomponenter/RichTextEditor.tsx', () => ({
  default: () => <div data-testid="rich-text-editor" />,
}))

describe('CreateComponent', () => {
  it('viser opprettskjema med tittel og opprett-knapp', () => {
    render(
      <MemoryRouter>
        <CreateComponent onSubmit={vi.fn()} />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Opprett Sak', level: 2 })).toBeInTheDocument()
    expect(screen.getByLabelText('Tittel')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Opprett sak/i })).toBeInTheDocument()
  })
})
