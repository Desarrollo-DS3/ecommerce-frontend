import { api } from '@/app/_utils/api'
import {
  transformLoginResponse,
  transformRegisterUserResponse,
  transformRegisterWarehouseAssistantResponse,
  transformLoadAuxiliariesResponse
} from '@/app/_utils/transformers/authTransformers'

export const login = async (data) => {
  try {
    const response = await api.post('/auth/login', data)
    console.log('[auth.js] login response: ', response)
    return transformLoginResponse(response.data)
  } catch (error) {
    console.error('[auth.js] Error en login:', error)
    throw new Error('Error al iniciar sesión. Por favor, intenta nuevamente.')
  }
}

export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register/user', data)
    return transformRegisterUserResponse(response.data)
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      const errorMessage = JSON.parse(error.response.data.detail)
      if (
        errorMessage.email &&
        errorMessage.email.includes('user with this email already exists.')
      ) {
        throw new Error(
          'Este correo ya está registrado. Por favor, utiliza otro correo.'
        )
      }
    }
    throw new Error('Error al registrar. Intenta nuevamente.')
  }
}

export const registerWarehouseAssistant = async (data) => {
  const response = await api.post('/auth/register/warehouse-assistant', data)
  return transformRegisterWarehouseAssistantResponse(response.data)
}

export const loadAuxiliaries = async () => {
  const module = await import('@/../public/mocks/auxiliaries.json')
  return transformLoadAuxiliariesResponse(module.auxiliaries)
}
