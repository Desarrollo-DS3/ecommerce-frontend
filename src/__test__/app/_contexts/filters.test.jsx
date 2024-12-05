import React from 'react'
import { render, screen } from '@testing-library/react'
import { FiltersProvider } from '@/app/_contexts/filters'
import { FiltersContext } from '@/app/_contexts/filters'

describe('FiltersProvider', () => {
  test('debería proporcionar el contexto de filtros', () => {
    render(
      <FiltersProvider>
        <FiltersContext.Consumer>
          {({ filters }) => (
            <div>
              <span>{filters.includedString}</span>
              <span>{filters.categoryId}</span>
            </div>
          )}
        </FiltersContext.Consumer>
      </FiltersProvider>
    )

    const includedStringElement = screen.getAllByText('')
    expect(includedStringElement.length).toBeGreaterThan(0)

    const categoryIdElement = screen.getByText('-1')
    expect(categoryIdElement).toBeInTheDocument()
  })
})
