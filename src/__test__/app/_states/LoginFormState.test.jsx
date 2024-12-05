import { render } from '@testing-library/react'
import { useLoginModalState } from '@/app/_states/LoginFormState'

describe('useLoginModalState', () => {
  test('debería tener el modal cerrado por defecto', () => {
    const { isModalOpen } = useLoginModalState.getState()
    expect(isModalOpen).toBe(false)
  })

  test('debería abrir el modal cuando se llama a turnOn', () => {
    const { turnOn } = useLoginModalState.getState()
    turnOn()
    const { isModalOpen } = useLoginModalState.getState()
    expect(isModalOpen).toBe(true)
  })

  test('debería cerrar el modal cuando se llama a turnOff', () => {
    const { turnOff } = useLoginModalState.getState()
    turnOff()
    const { isModalOpen } = useLoginModalState.getState()
    expect(isModalOpen).toBe(false)
  })
})
