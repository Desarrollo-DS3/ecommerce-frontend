import {
  transformLoginResponse,
  transformRegisterUserResponse,
  transformRegisterWarehouseAssistantResponse,
  transformLoadAuxiliariesResponse
} from '@/app/_utils/transformers/authTransformers'

describe('authTransformers', () => {
  describe('transformLoginResponse', () => {
    test('should transform response with token, user, and role', () => {
      const responseData = {
        access_token: {
          access: 'Bearer abcd1234',
          user: { id: 1, name: 'Juan', role: 'admin' }
        }
      }
      expect(transformLoginResponse(responseData)).toEqual({
        token: 'Bearer abcd1234',
        user: { id: 1, name: 'Juan', role: 'admin' },
        role: 'admin'
      })
    })

    test('should handle missing or null data gracefully', () => {
      expect(transformLoginResponse({})).toEqual({
        token: null,
        user: null,
        role: null
      })

      expect(transformLoginResponse(null)).toEqual({
        token: null,
        user: null,
        role: null
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
