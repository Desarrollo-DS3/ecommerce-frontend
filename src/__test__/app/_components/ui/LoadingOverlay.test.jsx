import { render, screen } from '@testing-library/react'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'

describe('LoadingOverlay', () => {
  test('debería renderizar el overlay de carga correctamente', () => {
    render(<LoadingOverlay />)
    const overlay = screen.getByTestId('loading-overlay')
    expect(overlay).toBeInTheDocument()
  })

  test('debería mostrar el spinner de carga', () => {
    render(<LoadingOverlay />)
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toBeInTheDocument()
  })
})
