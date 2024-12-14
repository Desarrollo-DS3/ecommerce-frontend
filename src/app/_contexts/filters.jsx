'use client'
import { createContext, useEffect, useState } from 'react'

// 1. Crear contexto, este es el que se consume.
export const FiltersContext = createContext()

// 2. Crear Provider para envolver la app y que puedan usar el contexto
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    includedString: '',
    categoryId: -1
  })

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

// 2.1. Envolver el componente en el Provider, en este caso la App que está en `main.jsx`
// <FiltersProvider>
//   <App />
// </FiltersProvider>

// 3. Consumir el contexto
