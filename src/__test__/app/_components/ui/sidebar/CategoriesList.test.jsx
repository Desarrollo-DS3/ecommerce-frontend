import { render, screen, fireEvent, act } from '@testing-library/react'
import CategoriesList from '@/app/_components/ui/sidebar/CategoriesList'
import { useFilters } from '@/app/_hooks/useFilters'
import { useSidebarState } from '@/app/_states/SidebarState'
import { CategoriesProvider } from '@/app/_contexts/categories'

jest.mock('@/app/_hooks/useFilters')
jest.mock('@/app/_states/SidebarState')

describe('CategoriesList', () => {
  beforeEach(() => {
    useFilters.mockReturnValue({
      filters: { category: 'all' },
      setFilters: jest.fn()
    })
    useSidebarState.mockReturnValue({ setIsOpen: jest.fn() })
  })

  test('debería renderizar la lista de categorías correctamente', async () => {
    render(
      <CategoriesProvider>
        <CategoriesList />
      </CategoriesProvider>
    )
    await act(async () => {})

    const categoriesList = screen.getByRole('list')
    expect(categoriesList).toBeInTheDocument()
  })
})
