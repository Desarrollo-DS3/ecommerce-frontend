// [src/__test__/app/_utils/transformers/authTransformers.test.js]
import {
  transformLoginResponse,
  transformRegisterUserResponse,
  transformRegisterWarehouseAssistantResponse,
  transformLoadAuxiliariesResponse
} from '@/app/_utils/transformers/authTransformers'

describe('authTransformers', () => {
  describe('transformLoginResponse', () => {
    test('should transform response with token and user', () => {
      const responseData = { token: 'abcd1234', user: { id: 1, name: 'Juan' } }
      expect(transformLoginResponse(responseData)).toEqual({
        token: 'abcd1234',
        user: { id: 1, name: 'Juan' }
      })
    })

    test('should return null for missing token and user', () => {
      expect(transformLoginResponse({})).toEqual({
        token: null,
        user: null
      })
    })
  })

  describe('transformRegisterUserResponse', () => {
    test('should transform response with success, user, and message', () => {
      const responseData = {
        user: { id: 2, name: 'Santiago' },
        message: 'Registro exitoso.'
      }
      expect(transformRegisterUserResponse(responseData)).toEqual({
        success: true,
        user: { id: 2, name: 'Santiago' },
        message: 'Registro exitoso.'
      })
    })

    test('should use default message if none is provided', () => {
      const responseData = { user: { id: 3, name: 'Carlos' } }
      expect(transformRegisterUserResponse(responseData)).toEqual({
        success: true,
        user: { id: 3, name: 'Carlos' },
        message: 'Usuario registrado con éxito.'
      })
    })
  })

  describe('transformRegisterWarehouseAssistantResponse', () => {
    test('should transform response with success, assistant, and message', () => {
      const responseData = {
        assistant: { id: 4, name: 'Maria' },
        message: 'Asistente registrado.'
      }
      expect(transformRegisterWarehouseAssistantResponse(responseData)).toEqual(
        {
          success: true,
          assistant: { id: 4, name: 'Maria' },
          message: 'Asistente registrado.'
        }
      )
    })

    test('should use default message if none is provided', () => {
      const responseData = { assistant: { id: 5, name: 'Ana' } }
      expect(transformRegisterWarehouseAssistantResponse(responseData)).toEqual(
        {
          success: true,
          assistant: { id: 5, name: 'Ana' },
          message: 'Asistente de almacén registrado con éxito.'
        }
      )
    })
  })

  describe('transformLoadAuxiliariesResponse', () => {
    test('should transform auxiliary data into formatted objects', () => {
      const auxiliaryData = [
        {
          id: 1,
          first_name: 'Luis',
          last_name: 'Lopez',
          email: 'luis.lopez@example.com'
        },
        {
          id: 2,
          first_name: 'Pedro',
          last_name: 'Perez',
          email: 'pedro.perez@example.com'
        }
      ]
      expect(transformLoadAuxiliariesResponse(auxiliaryData)).toEqual([
        {
          id: 1,
          firstName: 'Luis',
          lastName: 'Lopez',
          email: 'luis.lopez@example.com'
        },
        {
          id: 2,
          firstName: 'Pedro',
          lastName: 'Perez',
          email: 'pedro.perez@example.com'
        }
      ])
    })

    test('should return an empty array if no data is provided', () => {
      expect(transformLoadAuxiliariesResponse([])).toEqual([])
    })
  })
})
