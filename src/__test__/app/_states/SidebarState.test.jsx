import { useSidebarState } from '@/app/_states/SidebarState'

describe('useSidebarState', () => {
  test('debería tener el sidebar cerrado por defecto', () => {
    const { isOpen } = useSidebarState.getState()
    expect(isOpen).toBe(false)
  })

  test('debería abrir el sidebar cuando se llama a setIsOpen con true', () => {
    const { setIsOpen } = useSidebarState.getState()
    setIsOpen(true)
    const { isOpen } = useSidebarState.getState()
    expect(isOpen).toBe(true)
  })

  test('debería cerrar el sidebar cuando se llama a setIsOpen con false', () => {
    const { setIsOpen } = useSidebarState.getState()
    setIsOpen(false)
    const { isOpen } = useSidebarState.getState()
    expect(isOpen).toBe(false)
  })
})
