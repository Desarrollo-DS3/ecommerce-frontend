'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useLoginModalState } from '@/app/_states/LoginFormState'
import { useAuth } from '@/app/_hooks/useAuth'
import {
  validateEmail,
  validatePassword
} from '@/app/_utils/validations/personValidations'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'

export default function LoginModal() {
  const { isModalOpen, turnOff } = useLoginModalState()
  const { login, isLoggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const closeModal = () => turnOff()

  const handleEmailChange = (e) => {
    const emailValue = e.target.value
    setEmail(emailValue)
    setEmailError(validateEmail(emailValue))
  }

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value
    setPassword(passwordValue)
    setPasswordError(validatePassword(passwordValue))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoginError('')

    if (emailError || passwordError || !email || !password) {
      setLoginError('Por favor, corrige los errores antes de continuar.')
      return
    }

    try {
      setLoading(true)
      await login(email, password, setLoginError)
    } catch (error) {
      setLoginError('Credenciales incorrectas. Intenta nuevamente.')
    }
    setLoading(false)
  }

  function resetForm() {
    setEmail('')
    setPassword('')
    setLoginError('')
  }

  useEffect(() => {
    if (isLoggedIn) {
      closeModal()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isModalOpen) {
      resetForm()
    }
  }, [isModalOpen])

  if (loading) return <LoadingOverlay />

  return (
    <>
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='relative w-[400px] p-8 bg-white shadow-md rounded-lg text-center'>
            <h2 className='text-2xl font-bold mb-6'>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4 text-left'>
                <label className='block font-semibold mb-1'>Correo</label>
                <input
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  required
                />
                {emailError && (
                  <p className='text-red-500 text-xs mt-1'>{emailError}</p>
                )}
              </div>

              <div className='mb-4 text-left'>
                <label className='block font-semibold mb-1'>Contraseña</label>
                <input
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  required
                />
                {passwordError && (
                  <p className='text-red-500 text-xs mt-1'>{passwordError}</p>
                )}
              </div>

              {loginError && (
                <p className='text-red-500 text-sm mb-4'>{loginError}</p>
              )}

              <button
                type='submit'
                className='w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition'
              >
                Iniciar sesión
              </button>
              <p className='mt-4 text-sm'>
                ¿No tienes cuenta?{' '}
                <Link
                  href='/register'
                  onClick={closeModal}
                  className='text-blue-500'
                >
                  Regístrate
                </Link>
              </p>
            </form>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-500 hover:text-red-700 text-3xl'
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}
