import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginModal from '@/app/_components/form/LoginModal'
import { useLoginModalState } from '@/app/_states/LoginFormState'
import { useAuth } from '@/app/_hooks/useAuth'
import {
  validateEmail,
  validatePassword
} from '@/app/_utils/validations/personValidations'

// Mock de dependencias externas
jest.mock('@/app/_states/LoginFormState', () => ({
  useLoginModalState: jest.fn()
}))

jest.mock('@/app/_hooks/useAuth', () => ({
  useAuth: jest.fn()
}))

jest.mock('@/app/_utils/validations/personValidations', () => ({
  validateEmail: jest.fn(),
  validatePassword: jest.fn()
}))

describe('LoginModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('debería renderizar el modal cuando isModalOpen es true', () => {
    useLoginModalState.mockReturnValue({
      isModalOpen: true,
      turnOff: jest.fn()
    })
    useAuth.mockReturnValue({ login: jest.fn() })

    render(<LoginModal />)

    const heading = screen.getByRole('heading', {
      name: 'Iniciar sesión',
      level: 2
    })
    expect(heading).toBeInTheDocument()
  })

  test('no debería renderizar el modal cuando isModalOpen es false', () => {
    useLoginModalState.mockReturnValue({
      isModalOpen: false,
      turnOff: jest.fn()
    })
    render(<LoginModal />)
    expect(screen.queryByText('Iniciar sesión')).not.toBeInTheDocument()
  })

  test('debería cerrar el modal al hacer clic en el botón de cerrar', () => {
    const turnOffMock = jest.fn()
    useLoginModalState.mockReturnValue({
      isModalOpen: true,
      turnOff: turnOffMock
    })
    useAuth.mockReturnValue({ login: jest.fn() })

    render(<LoginModal />)

    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)

    expect(turnOffMock).toHaveBeenCalled()
  })
})
