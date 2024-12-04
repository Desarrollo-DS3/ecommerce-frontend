const maxCategoryNameLength = 50
const maxCategoryDescriptionLength = 90

export const validateCategoryName = (value) => {
  if (!value || value.trim().length === 0) {
    return 'El nombre de la categoría no puede estar vacío.'
  }
  if (value.length > maxCategoryNameLength) {
    return `El nombre de la categoría no puede tener más de ${maxCategoryNameLength} caracteres.`
  }
  return ''
}

export const validateCategoryDescription = (value) => {
  if (!value || value.trim().length === 0) {
    return 'La descripción de la categoría no puede estar vacía.'
  }
  if (value.length > maxCategoryDescriptionLength) {
    return `La descripción de la categoría no puede tener más de ${maxCategoryDescriptionLength} caracteres.`
  }
  return ''
}
