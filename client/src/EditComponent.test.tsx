import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { EditComponent } from './EditComponent'

vi.mock('felleskomponenter/RichTextEditor.tsx', () => ({
  default: () => <div data-testid="rich-text-editor" />,
}))

describe('EditComponent', () => {
  it('viser redigeringsskjema med tittel, lagre- og slett-knapp', () => {
    render(
      <MemoryRouter>
        <EditComponent onSubmit={vi.fn()} onDelete={vi.fn()} />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Rediger Sak', level: 2 })).toBeInTheDocument()
    expect(screen.getByLabelText('Tittel')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Lagre sak/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Slett/i })).toBeInTheDocument()
  })
})
