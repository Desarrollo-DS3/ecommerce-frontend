import {
  validateBrandName,
  validateBrandDescription
} from '@/app/_utils/validations/brandValidations'

const maxBrandNameLength = 50
const maxBrandDescriptionLength = 120

describe('validateBrandName', () => {
  test('should return an error if the name is empty or just spaces', () => {
    expect(validateBrandName('')).toBe(
      'El nombre del marca no puede estar vacío.'
    )
    expect(validateBrandName('   ')).toBe(
      'El nombre del marca no puede estar vacío.'
    )
  })

  test('should return an error if the name exceeds the max length', () => {
    const longName = 'a'.repeat(maxBrandNameLength + 1)
    expect(validateBrandName(longName)).toBe(
      `El nombre del marca no puede tener más de ${maxBrandNameLength} caracteres.`
    )
  })

  test('should return an empty string if the name is valid', () => {
    expect(validateBrandName('Nombre de Marca')).toBe('')
    const validName = 'a'.repeat(maxBrandNameLength)
    expect(validateBrandName(validName)).toBe('')
  })
})

describe('validateBrandDescription', () => {
  test('should return an error if the description is empty or just spaces', () => {
    expect(validateBrandDescription('')).toBe(
      'La descripción del marca no puede estar vacía.'
    )
    expect(validateBrandDescription('   ')).toBe(
      'La descripción del marca no puede estar vacía.'
    )
  })

  test('should return an error if the description exceeds the max length', () => {
    const longDescription = 'a'.repeat(maxBrandDescriptionLength + 1)
    expect(validateBrandDescription(longDescription)).toBe(
      `La descripción del marca no puede tener más de ${maxBrandDescriptionLength} caracteres.`
    )
  })

  test('should return an empty string if the description is valid', () => {
    expect(validateBrandDescription('Descripción de Marca')).toBe('')
    const validDescription = 'a'.repeat(maxBrandDescriptionLength)
    expect(validateBrandDescription(validDescription)).toBe('')
  })
})
