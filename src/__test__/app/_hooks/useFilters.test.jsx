import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { FiltersProvider } from '@/app/_contexts/filters'
import { useFilters } from '@/app/_hooks/useFilters'

describe('useFilters', () => {
  test('debería retornar los filtros y permitir modificarlos', () => {
    const wrapper = ({ children }) => (
      <FiltersProvider>{children}</FiltersProvider>
    )

    const { result } = renderHook(() => useFilters(), { wrapper })

    // Verificar los valores iniciales
    expect(result.current.filters).toEqual({
      includedString: '',
      categoryId: -1
    })

    // Actualizar filtros
    act(() => {
      result.current.setFilters({ includedString: 'test', categoryId: 1 })
    })

    // Verificar que los filtros hayan cambiado
    expect(result.current.filters).toEqual({
      includedString: 'test',
      categoryId: 1
    })
  })
})
