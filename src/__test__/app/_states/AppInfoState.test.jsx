import { render, screen, fireEvent } from '@testing-library/react'
import { useAppInfoState } from '@/app/_states/AppInfoState'

describe('useAppInfoState', () => {
  test('debería tener valores predeterminados para companyName y appVersion', () => {
    render(<div>{useAppInfoState.getState().companyName}</div>)
    render(<div>{useAppInfoState.getState().appVersion}</div>)

    expect(screen.getByText('Eamazon')).toBeInTheDocument()
    expect(screen.getByText('1.0.0')).toBeInTheDocument()
  })

  test('debería actualizar companyName y appVersion cuando se usan los setters', () => {
    const { setCompanyName, setAppVersion } = useAppInfoState.getState()

    setCompanyName('NewCompany')
    setAppVersion('2.0.0')

    expect(useAppInfoState.getState().companyName).toBe('NewCompany')
    expect(useAppInfoState.getState().appVersion).toBe('2.0.0')
  })
})
