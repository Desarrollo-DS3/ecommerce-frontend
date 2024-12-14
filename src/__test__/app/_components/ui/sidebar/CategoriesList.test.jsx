import { render, screen } from '@testing-library/react'
import CategoriesList from '@/app/_components/ui/sidebar/CategoriesList'
import { useFilters } from '@/app/_hooks/useFilters'
import { useSidebarState } from '@/app/_states/SidebarState'
import { CategoriesProvider } from '@/app/_contexts/categories'
import { AuthContext } from '@/app/_contexts/auth'

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

  test('debería renderizar correctamente sin fallos', () => {
    const mockAuthContextValue = { token: 'mockToken', isInitializing: false }

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <CategoriesProvider>
          <CategoriesList />
        </CategoriesProvider>
      </AuthContext.Provider>
    )

    const heading = screen.getByText(/Categorías/i)
    expect(heading).toBeInTheDocument()
  })
})
