import { render, screen, fireEvent } from '@testing-library/react'
import WarehouseAssistantRegisterPage from '@/app/admin/auxiliaries/page'

test('allows typing in form inputs', () => {
  render(<WarehouseAssistantRegisterPage />)

  const emailInput = screen.getByLabelText(/correo/i)
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  expect(emailInput.value).toBe('test@example.com')

  const firstNameInput = screen.getByLabelText(/nombres/i)
  fireEvent.change(firstNameInput, { target: { value: 'Juan' } })
  expect(firstNameInput.value).toBe('Juan')

  const lastNameInput = screen.getByLabelText(/apellidos/i)
  fireEvent.change(lastNameInput, { target: { value: 'Perez' } })
  expect(lastNameInput.value).toBe('Perez')

  const passwordInput = screen.getByLabelText(/contraseña/i)
  fireEvent.change(passwordInput, { target: { value: 'securePass123' } })
  expect(passwordInput.value).toBe('securePass123')
})
