'use client'

import { useState } from 'react'
import { ReactSVG } from 'react-svg'
import { registerUser } from '@/app/_api/auth'
import {
  validateEmail,
  validatePassword,
  validateName
} from '@/app/_utils/validations/personValidations'
import ic from '@/app/_config/assets.json'
import LoadingOverlay from '@/app/_components/ui/LoadingOverlay'

export default function WarehouseAssistantRegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: 'warehouse_assistant'
  })

  const [errors, setErrors] = useState({})
  const [showErrors, setShowErrors] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const resetForm = () => {
    setFormData({
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      role: 'warehouse_assistant'
    })
    setErrors({})
    setShowErrors(false)
    setServerError('')
  }

  const validateForm = () => {
    const newErrors = {}

    const emailError = validateEmail(formData.email)
    if (emailError) newErrors.email = emailError

    const passwordError = validatePassword(formData.password)
    if (passwordError) newErrors.password = passwordError

    const firstNameError = validateName(formData.first_name)
    if (firstNameError) newErrors.first_name = firstNameError

    const lastNameError = validateName(formData.last_name)
    if (lastNameError) newErrors.last_name = lastNameError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)
    setIsLoading(true)
    if (validateForm()) {
      try {
        await registerUser(formData)
        setRegistrationSuccess(true)
        setServerError('')
        resetForm()
      } catch (error) {
        setServerError(error.message)
      }
    }
    setIsLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (isLoading) return <LoadingOverlay />

  return (
    <div className='flex items-center justify-center h-full bg-gray-100'>
      <div className='w-2/4 p-8 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center mb-6'>
          Registrar Asistente de Almacén
        </h2>
        {registrationSuccess && (
          <p className='text-green-600 text-center mb-4'>
            Registro de asistente de almacén exitoso
          </p>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block font-semibold mb-1'>
                Correo <span className='text-red-500'>*</span>
              </label>
              <input
                id='email'
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

            <div>
              <label htmlFor='first_name' className='block font-semibold mb-1'>
                Nombres <span className='text-red-500'>*</span>
              </label>
              <input
                id='first_name'
                type='text'
                name='first_name'
                value={formData.first_name}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
              />
              {showErrors && errors.first_name && (
                <p className='text-red-500 text-xs mt-1'>{errors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor='last_name' className='block font-semibold mb-1'>
                Apellidos <span className='text-red-500'>*</span>
              </label>
              <input
                id='last_name'
                type='text'
                name='last_name'
                value={formData.last_name}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
              />
              {showErrors && errors.last_name && (
                <p className='text-red-500 text-xs mt-1'>{errors.last_name}</p>
              )}
            </div>

            <div>
              <label htmlFor='password' className='block font-semibold mb-1'>
                Contraseña <span className='text-red-500'>*</span>
              </label>
              <div className='relative flex border'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='px-3 mx-2 flex items-center text-gray-600'
                >
                  <ReactSVG
                    className={`w-4 fill-current fit-content ${
                      showPassword ? 'text-gray-600' : 'text-orange-600'
                    }`}
                    about='eye-hide'
                    src={ic.ui.eyeHide}
                  />
                </button>
              </div>
              {showErrors && errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
              )}
            </div>

            {serverError && (
              <p className='text-red-500 text-center'>{serverError}</p>
            )}

            <button
              type='submit'
              className='w-full py-2 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition'
            >
              Registrar Asistente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
