import {
  validateCategoryName,
  validateCategoryDescription
} from '@/app/_utils/validations/categoryValidations'

const maxCategoryNameLength = 50
const maxCategoryDescriptionLength = 90

describe('validateCategoryName', () => {
  test('should return an error if the name is empty or just spaces', () => {
    expect(validateCategoryName('')).toBe(
      'El nombre de la categoría no puede estar vacío.'
    )
    expect(validateCategoryName('   ')).toBe(
      'El nombre de la categoría no puede estar vacío.'
    )
  })

  test('should return an error if the name exceeds the max length', () => {
    const longName = 'a'.repeat(maxCategoryNameLength + 1)
    expect(validateCategoryName(longName)).toBe(
      `El nombre de la categoría no puede tener más de ${maxCategoryNameLength} caracteres.`
    )
  })

  test('should return an empty string if the name is valid', () => {
    expect(validateCategoryName('Nombre de Categoría')).toBe('')
    const validName = 'a'.repeat(maxCategoryNameLength)
    expect(validateCategoryName(validName)).toBe('')
  })
})

describe('validateCategoryDescription', () => {
  test('should return an error if the description is empty or just spaces', () => {
    expect(validateCategoryDescription('')).toBe(
      'La descripción de la categoría no puede estar vacía.'
    )
    expect(validateCategoryDescription('   ')).toBe(
      'La descripción de la categoría no puede estar vacía.'
    )
  })

  test('should return an error if the description exceeds the max length', () => {
    const longDescription = 'a'.repeat(maxCategoryDescriptionLength + 1)
    expect(validateCategoryDescription(longDescription)).toBe(
      `La descripción de la categoría no puede tener más de ${maxCategoryDescriptionLength} caracteres.`
    )
  })

  test('should return an empty string if the description is valid', () => {
    expect(validateCategoryDescription('Descripción de Categoría')).toBe('')
    const validDescription = 'a'.repeat(maxCategoryDescriptionLength)
    expect(validateCategoryDescription(validDescription)).toBe('')
  })
})
