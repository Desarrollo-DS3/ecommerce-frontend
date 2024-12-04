import {
  validateEmail,
  validatePassword,
  validateDocument,
  validatePhone,
  validateName,
  validateLastName
} from '@/app/_utils/validations/personValidations'

const maxEmailLength = 30
const minPasswordLength = 10
const maxPasswordLength = 18
const minDocumentLength = 8
const maxDocumentLength = 11
const phoneLength = 10
const maxNameLength = 50

describe('validateEmail', () => {
  test('should return an error if email exceeds max length', () => {
    const longEmail = 'a'.repeat(maxEmailLength + 1) + '@domain.com'
    expect(validateEmail(longEmail)).toBe(
      `El correo electrónico no puede tener más de ${maxEmailLength} caracteres.`
    )
  })

  test('should return an error if email format is invalid', () => {
    expect(validateEmail('invalid-email')).toBe('Formato de correo inválido')
    expect(validateEmail('user@domain')).toBe('Formato de correo inválido')
  })

  test('should return an empty string if email is valid', () => {
    expect(validateEmail('valid@email.com')).toBe('')
  })
})

describe('validatePassword', () => {
  test('should return an error if password length is less than the minimum', () => {
    expect(validatePassword('short')).toBe(
      `La contraseña debe tener entre ${minPasswordLength} y ${maxPasswordLength} caracteres.`
    )
  })

  test('should return an error if password length exceeds the maximum', () => {
    const longPassword = 'a'.repeat(maxPasswordLength + 1)
    expect(validatePassword(longPassword)).toBe(
      `La contraseña debe tener entre ${minPasswordLength} y ${maxPasswordLength} caracteres.`
    )
  })

  test('should return an empty string if password length is valid', () => {
    const validPassword = 'a'.repeat(minPasswordLength)
    expect(validatePassword(validPassword)).toBe('')
  })
})

describe('validateDocument', () => {
  test('should return an error if document contains non-numeric characters', () => {
    expect(validateDocument('123A')).toBe(
      'El documento de identidad solo puede contener números.'
    )
  })

  test('should return an error if document length is less than the minimum', () => {
    expect(validateDocument('1234567')).toBe(
      `El documento de identidad debe tener entre ${minDocumentLength} y ${maxDocumentLength} dígitos.`
    )
  })

  test('should return an error if document length exceeds the maximum', () => {
    const longDocument = '1'.repeat(maxDocumentLength + 1)
    expect(validateDocument(longDocument)).toBe(
      `El documento de identidad debe tener entre ${minDocumentLength} y ${maxDocumentLength} dígitos.`
    )
  })

  test('should return an empty string if document is valid', () => {
    expect(validateDocument('12345678')).toBe('')
    expect(validateDocument('12345678901')).toBe('')
  })
})

describe('validatePhone', () => {
  test('should return an error if phone contains non-numeric characters', () => {
    expect(validatePhone('12345A7890')).toBe(
      'El número de celular solo puede contener números.'
    )
  })

  test('should return an error if phone length is incorrect', () => {
    expect(validatePhone('123456789')).toBe(
      `El número de celular debe tener exactamente ${phoneLength} dígitos.`
    )
    expect(validatePhone('123456789012')).toBe(
      `El número de celular debe tener exactamente ${phoneLength} dígitos.`
    )
  })

  test('should return an empty string if phone is valid', () => {
    expect(validatePhone('1234567890')).toBe('')
  })
})

describe('validateName', () => {
  test('should return an error if name is empty or just spaces', () => {
    expect(validateName('')).toBe('El nombre no puede estar vacío.')
    expect(validateName('   ')).toBe('El nombre no puede estar vacío.')
  })

  test('should return an error if name exceeds max length', () => {
    const longName = 'a'.repeat(maxNameLength + 1)
    expect(validateName(longName)).toBe(
      `El nombre no puede tener más de ${maxNameLength} caracteres.`
    )
  })

  test('should return an empty string if name is valid', () => {
    expect(validateName('Juan')).toBe('')
    const validName = 'a'.repeat(maxNameLength)
    expect(validateName(validName)).toBe('')
  })
})

describe('validateLastName', () => {
  test('should return an error if last name is empty or just spaces', () => {
    expect(validateLastName('')).toBe('El apellido no puede estar vacío.')
    expect(validateLastName('   ')).toBe('El apellido no puede estar vacío.')
  })

  test('should return an error if last name exceeds max length', () => {
    const longLastName = 'a'.repeat(maxNameLength + 1)
    expect(validateLastName(longLastName)).toBe(
      `El apellido no puede tener más de ${maxNameLength} caracteres.`
    )
  })

  test('should return an empty string if last name is valid', () => {
    expect(validateLastName('Loaiza')).toBe('')
    const validLastName = 'a'.repeat(maxNameLength)
    expect(validateLastName(validLastName)).toBe('')
  })
})
