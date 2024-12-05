import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@/app/_components/ui/Pagination'

jest.mock('react-svg', () => ({
  ReactSVG: ({ src, alt }) => <svg data-testid={alt} />
}))

describe('Pagination', () => {
  test('debería renderizar correctamente el texto de la página actual', () => {
    render(<Pagination currentPage={2} totalPages={5} changePage={jest.fn()} />)
    expect(screen.getByText('Página 2 de 5')).toBeInTheDocument()
  })

  test('debería deshabilitar el botón de anterior en la primera página', () => {
    render(<Pagination currentPage={1} totalPages={5} changePage={jest.fn()} />)
    const prevButton = screen.getByTestId('arrow-left')
    expect(prevButton.closest('button')).toBeDisabled()
  })

  test('debería deshabilitar el botón de siguiente en la última página', () => {
    render(<Pagination currentPage={5} totalPages={5} changePage={jest.fn()} />)
    const nextButton = screen.getByTestId('arrow-right')
    expect(nextButton.closest('button')).toBeDisabled()
  })

  test('debería llamar a changePage al hacer clic en el botón de siguiente', () => {
    const mockChangePage = jest.fn()
    render(
      <Pagination currentPage={2} totalPages={5} changePage={mockChangePage} />
    )

    const nextButton = screen.getByTestId('arrow-right')
    fireEvent.click(nextButton.closest('button'))
    expect(mockChangePage).toHaveBeenCalledWith(3)
  })

  test('debería llamar a changePage al hacer clic en el botón de anterior', () => {
    const mockChangePage = jest.fn()
    render(
      <Pagination currentPage={2} totalPages={5} changePage={mockChangePage} />
    )

    const prevButton = screen.getByTestId('arrow-left')
    fireEvent.click(prevButton.closest('button'))
    expect(mockChangePage).toHaveBeenCalledWith(1)
  })
})
