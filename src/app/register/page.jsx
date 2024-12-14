'use client'

import { useState } from 'react'
import { useLoginModalState } from '@/app/_states/LoginFormState'
import {
  validateEmail,
  validatePassword,
  validateDocument,
  validatePhone,
  validateName,
  validateLastName
} from '@/app/_utils/validations/personValidations'
import withAuth from '@/app/_utils/withAuth'
import { registerUser } from '@/app/_api/auth'

function RegisterPage() {
  const [formData, setFormData] = useState({
    id: '',
    birthdate: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  })
  const { turnOn } = useLoginModalState()
  const [errors, setErrors] = useState({})
  const [showErrors, setShowErrors] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const validateForm = () => {
    const newErrors = {}

    const emailError = validateEmail(formData.email)
    if (emailError) newErrors.email = emailError

    const passwordError = validatePassword(formData.password)
    if (passwordError) newErrors.password = passwordError

    const documentError = validateDocument(formData.id)
    if (documentError) newErrors.id = documentError

    const phoneError = validatePhone(formData.phone)
    if (phoneError) newErrors.phone = phoneError

    const firstNameError = validateName(formData.firstName)
    if (firstNameError) newErrors.firstName = firstNameError

    const lastNameError = validateLastName(formData.lastName)
    if (lastNameError) newErrors.lastName = lastNameError

    if (!formData.birthdate) {
      newErrors.birthdate = 'La fecha de nacimiento es obligatoria.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleNumberInput = (e) => {
    const { name, value } = e.target
    const numericValue = value.replace(/\D/g, '')
    setFormData((prevData) => ({ ...prevData, [name]: numericValue }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)
    if (validateForm()) {
      try {
        const formattedData = {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          role: 'user'
        }
        await registerUser(formattedData)
        setRegistrationSuccess(true)
        setServerError('')
      } catch (error) {
        setServerError(error.message)
      }
    }
  }

  return (
    <div className='flex items-center justify-center h-full bg-gray-100'>
      <div className='w-2/4 p-8 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center mb-6'>Registrarse</h2>
        {registrationSuccess && (
          <button
            className='text-white bg-blue-400 text-center my-2 p-2 rounded-md w-full'
            onClick={turnOn}
          >
            Registro exitoso. Inicia sesión aquí.
          </button>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <p className='font-semibold mb-4 text-orange-500'>
                Datos personales
              </p>
              <div className='mb-4'>
                <label className='block font-semibold mb-1'>
                  Documento de identidad <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='id'
                  value={formData.id}
                  onChange={handleNumberInput}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                />
                {showErrors && errors.id && (
                  <p className='text-red-500 text-xs mt-1'>{errors.id}</p>
                )}
              </div>
              <div className='mb-4'>
                <label className='block font-semibold mb-1'>
                  Fecha de nacimiento <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='birthdate'
                  value={formData.birthdate}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                />
                {showErrors && errors.birthdate && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.birthdate}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label className='block font-semibold mb-1'>
                  Nombres <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                />
                {showErrors && errors.firstName && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label className='block font-semibold mb-1'>
                  Apellidos <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                />
                {showErrors && errors.lastName && (
                  <p className='text-red-500 text-xs mt-1'>{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <p className='font-semibold mb-4 text-orange-500'>
                Datos de cuenta
              </p>
              <div className='mb-4'>
                <label className='block font-semibold mb-1'>
                  Celular <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleNumberInput}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                />
                {showErrors && errors.phone && (
                  <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
                )}
              </div>
              <div className='mb-4'>
                <label className='block font-semibold mb-1'>
                  Correo <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                />
                {showErrors && errors.email && (
                  <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                )}
              </div>
              <div className='mb-4'>
                <label className='block font-semibold mb-1'>
                  Contraseña <span className='text-red-500'>*</span>
                </label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                />
                {showErrors && errors.password && (
                  <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
                )}
              </div>
            </div>
          </div>
          {serverError && (
            <p className='text-red-500 text-center'>{serverError}</p>
          )}
          <button
            type='submit'
            className='w-full py-2 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition'
          >
            Registrarse
          </button>
          {!registrationSuccess && (
            <p className='mt-4 text-center text-sm'>
              ¿Ya tienes una cuenta?{' '}
              <button onClick={turnOn} type='button' className='text-blue-500'>
                Inicia sesión
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default withAuth(RegisterPage, {
  requireAuth: false,
  unauthorizedRoles: ['*'],
  redirectTo: '/'
})
